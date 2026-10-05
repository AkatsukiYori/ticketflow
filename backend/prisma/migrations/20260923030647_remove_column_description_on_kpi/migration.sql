/*
  Warnings:

  - You are about to drop the column `description` on the `kpi` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `kpi_description` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `kpi` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `kpi_description` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
