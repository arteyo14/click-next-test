import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const config = useRuntimeConfig();
const jwtSecret = config.jwtSecret;

export default defineEventHandler(async (event) => {
  try {
    const { access_token, refresh_token } = await readBody(event);

    if (!refresh_token) {
      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: {
          message: "No Refresh Token Provided",
        },
      };
    }

    // ตรวจสอบว่า token นั้นถูกต้อง
    const decoded = jwt.verify(access_token, jwtSecret) as { user_id: string };
    const userId = Number(decoded.user_id);

    // ค้นหา refreshToken ในฐานข้อมูล
    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        refresh_token: refresh_token,
        user_id: userId,
      },
    });

    if (!storedToken) {
      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "Unauthorized" },
      };
    }

    // ตรวจสอบวันหมดอายุของ refreshToken
    if (new Date() > storedToken.expires_at) {
      await prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });

      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);

      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "Session has expired." },
      };
    }

    // สร้าง accessToken ใหม่
    const newAccessToken = jwt.sign({ user_id: userId }, jwtSecret, {
      expiresIn: "15m",
    });

    // ต่ออายุของ refreshToken โดยอัปเดตวันหมดอายุในฐานข้อมูล
    const newExpiresAt = new Date(Date.now() + 30 * 60 * 1000); // ต่ออายุอีก 30 นาที
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { expires_at: newExpiresAt },
    });

    setResponseStatus(event, HttpStatusCode.OK);

    return {
      status: true,
      code: HttpStatusCode.OK,
      data: {
        access_token: newAccessToken,
        refresh_token: refresh_token,
      },
    };
  } catch (error) {
    console.error("Error refreshing token:", error); // เพิ่ม log เพื่อช่วย debug
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal Server Error" },
    };
  }
});
