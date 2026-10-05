/*
  Warnings:

  - Made the column `endpoint` on table `push_notification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `push_notification` MODIFY `endpoint` VARCHAR(191) NOT NULL;
