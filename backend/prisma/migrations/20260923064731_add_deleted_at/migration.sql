/*
  Warnings:

  - You are about to alter the column `created_at` on the `kpi_description` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `kpi_description` ADD COLUMN `deleted_at` DATETIME(3) NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `kpi_detail` ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `kpi_realization` ADD COLUMN `deleted_at` DATETIME(3) NULL;
