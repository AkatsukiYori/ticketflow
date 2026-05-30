-- AlterTable
ALTER TABLE `log` ADD COLUMN `auto_closed` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `closed_by` VARCHAR(50) NULL;
