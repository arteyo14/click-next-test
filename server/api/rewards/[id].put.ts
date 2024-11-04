import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);
    let { user_id, used_point, reward_id } = await readBody(event);

    user_id = Number(user_id);
    used_point = Number(used_point);

    const user = await prisma.user.findUnique({
      where: { id: Number(user_id) },
      select: { points: true },
    });

    if (!user || user.points < used_point) {
      return {
        status: false,
        code: HttpStatusCode.BAD_REQUEST,
        error: { message: "คะแนนไม่เพียงพอ" },
      };
    }

    // คำนวณส่วนลดตามอัตรา 10 คะแนน = ลด 1 หน่วย
    const discountAmount = used_point / 10;

    // ตรวจสอบว่าผู้ใช้ได้แลกสินค้าไว้ใน `userRedeem` แล้วหรือยัง
    const existingRedemption = await prisma.userRedeem.findFirst({
      where: {
        user_id: user_id,
        reward_id: Number(id),
      },
    });

    if (existingRedemption) {
      return {
        status: false,
        code: HttpStatusCode.BAD_REQUEST,
        error: { message: "คุณได้แลกสินค้าแล้ว" },
      };
    }

    await prisma.userRedeem.create({
      data: {
        user_id: user_id,
        reward_id: Number(reward_id),
        product_id: Number(id),
        redeemed_at: new Date(),
      },
    });

    await prisma.user.update({
      where: { id: user_id },
      data: { points: { decrement: Number(used_point) } },
    });

    await prisma.products.update({
      where: { id: Number(id) },
      data: { discounted_price: { decrement: discountAmount } },
    });

    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: {},
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
