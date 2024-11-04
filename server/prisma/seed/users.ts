import { PrismaClient } from "@prisma/client";
import { hashPassword } from "~/utils/password";

const prisma = new PrismaClient();
export const userSeed = async () => {
  await prisma.refreshToken.deleteMany();

  await prisma.user.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE user_id_seq RESTART WITH 1`;

  let password = "P@ssw0rd";

  password = await hashPassword(password);

  await prisma.user.createMany({
    data: [
      {
        username: "admin",
        password,
        points: 100.0,
      },
      { username: "user1", password, points: 100.0 },
      { username: "user2", password, points: 100.0 },
    ],
  });
};
