/*
  Warnings:

  - You are about to drop the `Return` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Return" DROP CONSTRAINT "Return_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Return" DROP CONSTRAINT "Return_productId_fkey";

-- DropForeignKey
ALTER TABLE "Return" DROP CONSTRAINT "Return_userId_fkey";

-- DropTable
DROP TABLE "Return";

-- DropEnum
DROP TYPE "ReturnReason";

-- DropEnum
DROP TYPE "ReturnStatus";
