/*
  Warnings:

  - Added the required column `desicription` to the `rewards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rewards" ADD COLUMN     "desicription" TEXT NOT NULL;
