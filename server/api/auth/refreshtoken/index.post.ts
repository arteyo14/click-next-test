import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const config = useRuntimeConfig();
const jwtSecret = config.jwtSecret;

export default defineEventHandler(async (event) => {
  try {
    const { refresh_token } = await readBody(event);

    const decoded = jwt.verify(refresh_token, jwtSecret) as { user_id: string };
    const userId = decoded.user_id;

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

    // ตรวจสอบว่า refreshToken มีอยู่ในฐานข้อมูลและยังไม่หมดอายุ
    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        refresh_token: refresh_token,
        user_id: Number(userId),
      },
    });

    if (!storedToken) {
      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "Invalid TOKEN or expired session" },
      };
    }

    // ตรวจสอบวันหมดอายุของ refreshToken
    if (new Date() > storedToken.expires_at) {
      await prisma.refreshToken.delete({
        where: refresh_token,
      });

      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);

      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "Session was expired." },
      };
    }

    // ยืนยัน refreshToken ว่ายังถูกต้อง
    const payload = jwt.verify(refresh_token, jwtSecret) as { user_id: number };

    if (!payload) {
      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "Session was expired." },
      };
    }

    // สร้าง accessToken ใหม่
    const newAccessToken = jwt.sign({ user_id: payload.user_id }, jwtSecret, {
      expiresIn: "15m",
    });

    // ต่ออายุของ refreshToken โดยอัปเดตในฐานข้อมูล
    const newExpiresAt = new Date(Date.now() + 30 * 60 * 1000); // ต่ออายุอีก 30 นาที
    await prisma.refreshToken.update({
      where: refresh_token,
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
  } catch (_) {
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal Server Error" },
    };
  }
});
