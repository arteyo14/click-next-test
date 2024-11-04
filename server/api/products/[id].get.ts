import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  try {
    // ค้นหาข้อมูลสินค้า
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        image_url: true,
        name: true,
        price: true,
        discounted_price: true,
        description: true,
        created_at: true,
        updated_at: true,
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

    setResponseStatus(event, HttpStatusCode.OK);
    return {
      status: true,
      code: HttpStatusCode.OK,
      data: {
        ...product,
      },
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
