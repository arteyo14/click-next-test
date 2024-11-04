import { productSeed } from "./seed/products";
import { rewardSeeding } from "./seed/reward";
import { userSeed } from "./seed/users";

export const main = async () => {
  await userSeed();
  await productSeed();
  await rewardSeeding();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
