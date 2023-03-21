-- CreateIndex
CREATE INDEX `Message_senderName_recipientName_idx` ON `Message`(`senderName`, `recipientName`);
