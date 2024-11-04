import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);

    const rewards = await prisma.rewards.findMany({
      where: { id: Number(id) },
      include: {
        Product: {
          select: {
            id: true,
            name: true,
            description: true,
            image_url: true,
            price: true,
            discounted_price: true,
          },
        },
      },
    });

    if (!rewards) {
      setResponseStatus(event, HttpStatusCode.NOT_FOUND);
      return {
        status: false,
        code: HttpStatusCode.NOT_FOUND,
        error: { message: "ไม่พบข้อมูลรางวัล" },
      };
    }

    // ส่งคืนข้อมูล reward พร้อมกับรายละเอียดของ product
    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: rewards,
    };
  } catch (error) {
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal Server Error" },
    };
  }
});
