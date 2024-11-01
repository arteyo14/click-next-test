import { PrismaClient } from "@prisma/client";

export default defineNitroPlugin((nitroApp) => {
  const prisma = new PrismaClient();

  nitroApp.prisma = prisma;

  nitroApp.hooks.hook("close", async () => {
    await prisma.$disconnect();
  });
});
