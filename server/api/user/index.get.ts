import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        points: true,
        created_at: true,
        updated_at: true,
      },
    });

    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: users,
    };
  } catch (err) {
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal Server Error" },
    };
  }
});
