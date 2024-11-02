import HttpStatusCode from "~/core/shared/http/HttpStatusCode";
import { comparePassword } from "~/utils/password";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const config = useRuntimeConfig();
const jwtSecret = config.jwtSecret;

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  const validate: { [key: string]: string } = {};

  try {
    // ตรวจสอบการใส่ข้อมูลของ username และ password
    if (!username) {
      validate.username = "โปรดระบุ";
    }

    if (!password) {
      validate.password = "โปรดระบุ";
    }

    if (Object.keys(validate).length > 0) {
      return {
        status: false,
        code: HttpStatusCode.VALIDATE,
        error: validate,
      };
    }

    // ค้นหาผู้ใช้จากฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      };
    }

    // ตรวจสอบรหัสผ่าน
    const isValidatePassword = await comparePassword(password, user.password);
    if (!isValidatePassword) {
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      };
    }

    // สร้าง Access Token
    const accessToken = jwt.sign(
      {
        user_id: user.id,
        username: user.username,
      },
      jwtSecret,
      { expiresIn: "15m" }
    );

    // สร้าง Refresh Token
    const refreshToken = jwt.sign(
      {
        user_id: user.id,
      },
      jwtSecret,
      { expiresIn: "30m" }
    );

    // บันทึก Refresh Token ลงในฐานข้อมูล
    await prisma.refreshToken.create({
      data: {
        user_id: user.id,
        refresh_token: refreshToken,
        expires_at: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    // ส่งค่า Access Token และ Refresh Token กลับไปยัง client
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal server error" },
    };
  }
});
