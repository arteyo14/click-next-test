import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // ดึงข้อมูล products จากฐานข้อมูล
    const products = await prisma.products.findMany();

    // แปลง base64 เป็น path ของไฟล์ภาพ
    const productsWithImagePath = products.map((product) => {
      return {
        ...product,
        image_url: product.image_url, // ส่ง path ของรูปภาพแทน base64
      };
    });

    // ส่งสถานะและข้อมูลตอบกลับ
    setResponseStatus(event, HttpStatusCode.OK);

    return {
      status: true,
      code: HttpStatusCode.OK,
      data: productsWithImagePath,
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
