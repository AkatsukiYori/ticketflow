/*
  Warnings:

  - You are about to drop the column `userId` on the `push_notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `push_notification` DROP FOREIGN KEY `push_notification_userId_fkey`;

-- DropIndex
DROP INDEX `push_notification_userId_fkey` ON `push_notification`;

-- AlterTable
ALTER TABLE `push_notification` DROP COLUMN `userId`;
