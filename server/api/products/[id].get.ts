import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const { user_id } = await readBody(event); // รับ user_id จาก body

  try {
    // ค้นหาข้อมูลสินค้า
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        price: true,
      },
    });

    if (!product) {
      setResponseStatus(event, HttpStatusCode.NOT_FOUND);
      return {
        status: false,
        code: HttpStatusCode.NOT_FOUND,
        error: { message: "ไม่พบรายการที่ต้องการ" },
      };
    }

    // ตรวจสอบว่า user_id เคย redeem reward นี้หรือยัง
    const redeemed = await prisma.userRedeem.findFirst({
      where: {
        user_id: Number(user_id),
        reward_id: Number(id),
      },
    });

    // ถ้าเคย redeem, set was_redeemed เป็น true, ไม่เคยเป็น false
    const was_redeemed = redeemed ? true : false;

    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: {
        ...product,
        was_redeemed,
      },
    };
  } catch (err) {
    console.error("Error fetching product redemption status:", err);
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal Server Error" },
    };
  }
});
