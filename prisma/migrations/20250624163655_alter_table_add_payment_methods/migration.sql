/*
  Warnings:

  - Added the required column `paymentMethod` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionPaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'OTHER');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paymentMethod" "TransactionPaymentMethod" NOT NULL;
