import { PrismaClient } from "@prisma/client";
import { imageToBase64 } from "~/utils/image";

const prisma = new PrismaClient();

export const productSeed = async () => {
  await prisma.rewards.deleteMany();
  await prisma.products.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE products_id_seq RESTART WITH 1`;

  // เพิ่มข้อมูลใหม่ในตาราง product พร้อมกับรูปภาพในรูปแบบ Base64
  await prisma.products.createMany({
    data: [
      {
        name: "Image 1",
        description: "This is image 1",
        image_url: "product-1.jpeg",
        price: 100.0,
        discounted_price: 80.0,
      },
      {
        name: "Pack 1",
        description: "This is pack 1",
        image_url: "product-2.jpg",
        price: 150.0,
        discounted_price: 120.0,
      },
      {
        name: "Product Shooting",
        description: "Good product shooting",
        image_url: "product-3.jpg",
        price: 200.0,
        discounted_price: 180.0,
      },
      {
        name: "Shoes",
        description: "Comfortable shoes",
        image_url: "product-4.png",
        price: 250.0,
        discounted_price: 220.0,
      },
      // สามารถเพิ่มข้อมูลอื่น ๆ ได้ตามต้องการ
    ],
  });
};
