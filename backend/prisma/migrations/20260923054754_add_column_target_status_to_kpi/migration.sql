/*
  Warnings:

  - You are about to alter the column `created_at` on the `kpi_description` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `kpi` ADD COLUMN `target_status` VARCHAR(20) NOT NULL DEFAULT 'qty';

-- AlterTable
ALTER TABLE `kpi_description` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
