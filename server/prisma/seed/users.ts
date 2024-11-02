import { hashPassword } from "~/utils/password";

export const userSeed = async () => {
  const { prisma } = useNitroApp();

  await prisma.user.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE user_id_seq RESTART WITH 1`;

  let password = "@rteyo_14";

  password = await hashPassword(password);

  await prisma.user.create({
    data: {
      username: "admin",
      password,
      points: 100.0,
    },
  });
};
