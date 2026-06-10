/*
  Warnings:

  - A unique constraint covering the columns `[endpointHash]` on the table `push_notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endpointHash` to the `push_notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `push_notification_endpoint_key` ON `push_notification`;

-- AlterTable
ALTER TABLE `push_notification` ADD COLUMN `endpointHash` VARCHAR(191) NOT NULL,
    MODIFY `endpoint` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `push_notification_endpointHash_key` ON `push_notification`(`endpointHash`);
