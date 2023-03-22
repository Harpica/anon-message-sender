/*
  Warnings:

  - You are about to drop the column `repicientName` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Message` DROP COLUMN `repicientName`,
    ADD COLUMN `recipientName` VARCHAR(191) NULL;
