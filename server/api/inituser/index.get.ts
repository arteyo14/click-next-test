import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const config = useRuntimeConfig();
const jwtSecret = config.jwtSecret;

export default defineEventHandler(async (event) => {
  try {
    const token = event.headers.get("authorization")?.split(" ")[1];

    if (!token || token === "") {
      setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "Unauthorized" },
      };
    }

    // ตรวจสอบ token และ decode ข้อมูล
    const decoded = jwt.verify(token, jwtSecret) as { user_id: number };
    const userId = Number(decoded.user_id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        points: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      setResponseStatus(event, HttpStatusCode.NOT_FOUND);
      return {
        status: false,
        code: HttpStatusCode.NOT_FOUND,
        error: { message: "ไม่พบผู้้ใช้งาน" },
      };
    }

    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: user,
    };
  } catch (error) {
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    console.log(error);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal server error", detail: error },
    };
  }
});
