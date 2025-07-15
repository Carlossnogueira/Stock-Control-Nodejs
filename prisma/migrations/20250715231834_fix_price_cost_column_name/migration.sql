/*
  Warnings:

  - You are about to drop the column `price_coust` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price_cost` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price_coust",
ADD COLUMN     "price_cost" DECIMAL(10,2) NOT NULL;
