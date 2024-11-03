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
    if (!username) validate.username = "โปรดระบุ";
    if (!password) validate.password = "โปรดระบุ";

    if (Object.keys(validate).length > 0) {
      setResponseStatus(event, HttpStatusCode.VALIDATE);
      return {
        status: false,
        code: HttpStatusCode.VALIDATE,
        error: validate,
      };
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      };
    }

    const isValidatePassword = await comparePassword(password, user.password);
    if (!isValidatePassword) {
      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      };
    }

    // ตรวจสอบและลบ Refresh Token ที่มีอยู่ก่อนสร้างใหม่
    await prisma.refreshToken.deleteMany({
      where: { user_id: user.id },
    });

    const accessToken = jwt.sign(
      { user_id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { user_id: user.id, username: user.username },
      jwtSecret,
      {
        expiresIn: "30m",
      }
    );

    await prisma.refreshToken.create({
      data: {
        user_id: user.id,
        refresh_token: refreshToken,
        expires_at: new Date(Date.now() + 30 * 60 * 1000),
      },
    });
    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    };
  } catch (error) {
    console.error("Authentication error:", error);
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal server error" },
    };
  }
});
