import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { refresh_token } = await readBody(event);

    if (!refresh_token) {
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: {
          message: "No Refresh Token Provided",
        },
      };
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: refresh_token,
    });

    if (storedToken) {
      return {
        status: true,
        code: HttpStatusCode.OK,
        data: {},
      };
    } else {
      return {
        status: false,
        code: HttpStatusCode.UNAUTHORIZED,
        error: { message: "Session expired or already logged out" },
      };
    }
  } catch (_) {
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal Server Error" },
    };
  }
});
