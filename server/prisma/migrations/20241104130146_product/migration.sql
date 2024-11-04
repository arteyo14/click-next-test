/*
  Warnings:

  - You are about to drop the column `desicription` on the `rewards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `rewards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `rewards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `userRedeem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rewards" DROP COLUMN "desicription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userRedeem" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rewards_product_id_key" ON "rewards"("product_id");

-- AddForeignKey
ALTER TABLE "userRedeem" ADD CONSTRAINT "userRedeem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
