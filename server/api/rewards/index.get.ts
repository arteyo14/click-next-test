import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const rewards = await prisma.rewards.findMany({
      include: {
        Product: true, // โหลดข้อมูลของ Product ที่เชื่อมโยงกับ reward
      },
    });

    if (!rewards || rewards.length === 0) {
      setResponseStatus(event, HttpStatusCode.NOT_FOUND);
      return {
        status: false,
        code: HttpStatusCode.NOT_FOUND,
        error: { message: "Rewards not found" },
      };
    }

    const rewardsWithImageUrl = rewards.map((reward) => {
      const expiresAtBangkok = DateTime.fromJSDate(reward.expires_at)
        .setZone("Asia/Bangkok")
        .toISO();

      return {
        ...reward,
        expires_at: expiresAtBangkok, // ใช้เวลาที่แปลงแล้ว
        Product: undefined,
        product: {
          id: reward.Product.id,
          name: reward.Product.name,
          description: reward.Product.description,
          image_url: reward.Product.image_url,
          price: reward.Product.price,
          discounted_price: reward.Product.discounted_price,
        },
      };
    });

    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: rewardsWithImageUrl,
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
