import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const config = useRuntimeConfig();
const jwtSecret = config.public.jwtSecret;

export default defineEventHandler(async (event) => {
  try {
    const { refresh_token } = await readBody(event);
    // ตรวจสอบว่า refresh_token มีค่าหรือไม่
    if (!refresh_token) {
      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "No Refresh Token Provided" },
      };
    }

    // ตรวจสอบและถอดรหัส user_id จาก refresh_token
    const decoded = jwt.verify(refresh_token, jwtSecret) as { user_id: string };
    const userId = decoded.user_id;

    // ตรวจสอบว่าพบ refresh_token ในฐานข้อมูลหรือไม่
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
        error: { message: "Session expired" },
      };
    }

    // ลบ refresh_token ออกจากฐานข้อมูล
    const deleteResult = await prisma.refreshToken.deleteMany({
      where: { refresh_token: refresh_token },
    });

    if (deleteResult.count === 0) {
      setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
      return {
        status: false,
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        error: { message: "Failed to delete the refresh token" },
      };
    }

    return {
      status: true,
      code: HttpStatusCode.OK,
      data: {},
    };
  } catch (error) {
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal server error", details: error },
    };
  }
});
