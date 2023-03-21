-- CreateTable
CREATE TABLE `User` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `recipientName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Message_senderName_key`(`senderName`),
    UNIQUE INDEX `Message_recipientName_key`(`recipientName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderName_fkey` FOREIGN KEY (`senderName`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_recipientName_fkey` FOREIGN KEY (`recipientName`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
