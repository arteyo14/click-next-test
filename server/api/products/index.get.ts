import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const products = await prisma.products.findMany();

    // ส่งสถานะและข้อมูลตอบกลับ
    setResponseStatus(event, HttpStatusCode.OK);

    return {
      status: true,
      code: HttpStatusCode.OK,
      data: products,
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
