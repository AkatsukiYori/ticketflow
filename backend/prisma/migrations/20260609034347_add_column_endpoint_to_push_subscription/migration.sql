/*
  Warnings:

  - A unique constraint covering the columns `[endpoint]` on the table `push_notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `push_notification` ADD COLUMN `endpoint` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `push_notification_endpoint_key` ON `push_notification`(`endpoint`);
