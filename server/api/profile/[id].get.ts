import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        username: true,
        points: true,
        created_at: true,
        updated_at: true,
      },
      where: { id: Number(id) },
    });

    if (!user) {
      setResponseStatus(event, HttpStatusCode.NOT_FOUND);

      return {
        status: false,
        code: HttpStatusCode.NOT_FOUND,
        error: { message: "ไม่พบผู้ใช้งาน" },
      };
    }

    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: { ...user },
    };
  } catch (error) {
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);

    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal server error" },
    };
  }
});
