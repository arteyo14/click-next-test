/*
  Warnings:

  - Added the required column `discounted_price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "discounted_price" DOUBLE PRECISION NOT NULL;
