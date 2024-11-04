import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";
import { saveBase64Image } from "~/utils/image";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);

    const rewards = await prisma.rewards.findUnique({
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

    const expiresAtBangkok = DateTime.fromJSDate(rewards.expires_at)
      .setZone("Asia/Bangkok")
      .toISO();
    // ส่งคืนข้อมูล reward พร้อมกับรายละเอียดของ product
    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: {
        ...rewards,
        expires_at: expiresAtBangkok,
        Product: undefined, // ซ่อนข้อมูล Product ใน rewards
        product: {
          id: rewards.Product.id,
          name: rewards.Product.name,
          description: rewards.Product.description,
          image_url: rewards.Product.image_url,
          price: rewards.Product.price,
          discounted_price: rewards.Product.discounted_price,
        },
      },
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
