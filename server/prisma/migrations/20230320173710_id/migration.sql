/*
  Warnings:

  - You are about to drop the column `recipientName` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderName` on the `Message` table. All the data in the column will be lost.
  - Added the required column `recipientID` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderID` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_recipientName_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderName_fkey`;

-- DropIndex
DROP INDEX `Message_senderName_recipientName_idx` ON `Message`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `recipientName`,
    DROP COLUMN `senderName`,
    ADD COLUMN `recipientID` INTEGER NOT NULL,
    ADD COLUMN `senderID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderID_fkey` FOREIGN KEY (`senderID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_recipientID_fkey` FOREIGN KEY (`recipientID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
