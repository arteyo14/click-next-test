import { PrismaClient } from "@prisma/client";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // ตรวจสอบการเชื่อมต่อกับ Prisma
    await prisma.$connect();

    // ดึงข้อมูล products จากฐานข้อมูล
    const products = await prisma.products.findMany();

    // ส่งสถานะและข้อมูลตอบกลับ
    setResponseStatus(event, HttpStatusCode.OK);

    return {
      status: true,
      code: HttpStatusCode.OK,
      data: products,
    };
  } catch (error) {
    // พิมพ์ error เพื่อความสะดวกในการ debug
    console.error("Error fetching products:", error);

    // ตั้งค่า HTTP status code สำหรับการตอบกลับ
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR);
    return {
      status: false,
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: { message: "Internal Server Error" },
    };
  } finally {
    // ปิดการเชื่อมต่อ Prisma เพื่อประหยัดทรัพยากร
    await prisma.$disconnect();
  }
});
