import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const rewardSeeding = async () => {
  await prisma.$executeRaw`ALTER SEQUENCE rewards_id_seq RESTART WITH 1`;

  const products = await prisma.products.findMany({ select: { id: true } });

  if (products.length === 0) {
    throw new Error(
      "No products found. Please seed products before seeding rewards."
    );
  }

  const rewardsData = products.map((product) => ({
    product_id: product.id,
    points_required: Math.floor(Math.random() * 50) * 10 + 50,
    description: `Reward for product ${product.id}`,
    expires_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  }));

  await prisma.rewards.createMany({
    data: rewardsData,
  });
};
