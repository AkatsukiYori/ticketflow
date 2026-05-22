/*
  Warnings:

  - You are about to alter the column `ticket_title` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE `tickets` MODIFY `ticket_title` VARCHAR(20) NOT NULL,
    MODIFY `problem` VARCHAR(500) NOT NULL;
