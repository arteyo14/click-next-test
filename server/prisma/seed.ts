import { userSeed } from "./seed/users";

export const main = async () => {
  userSeed();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
