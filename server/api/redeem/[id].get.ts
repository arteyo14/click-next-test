import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);

    const userRedeem = prisma.userRedeem.findMany({
      where: {
        user_id: Number(id),
      },
    });

    if (!userRedeem) {
      setResponseStatus(event, HttpStatusCode.NOT_FOUND);
      return {
        status: false,
        code: HttpStatusCode.NOT_FOUND,
        error: { message: "User not found" },
      };
    }

    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: userRedeem ?? [],
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
