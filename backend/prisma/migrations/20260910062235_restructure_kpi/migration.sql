/*
  Warnings:

  - You are about to drop the column `ticket_id` on the `kpi` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `kpi` table. All the data in the column will be lost.
  - Added the required column `Realization` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formula` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periode` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_score` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificator` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_target` to the `kpi` table without a default value. This is not possible if the table is not empty.

*/

-- 1. Buat tabel detail dulu
CREATE TABLE `kpi_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kpi_id` INTEGER NULL,
    `ticket_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `kpi_detail_ticket_id_key`(`ticket_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `kpi_detail` (
    `ticket_id`,
    `user_id`,
    `created_at`
)
SELECT
    `ticket_id`,
    `user_id`,
    `created_at`
FROM `kpi`;


-- DropForeignKey
ALTER TABLE `kpi` DROP FOREIGN KEY `kpi_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `kpi` DROP FOREIGN KEY `kpi_user_id_fkey`;

-- DropIndex
DROP INDEX `kpi_ticket_id_key` ON `kpi`;

-- DropIndex
DROP INDEX `kpi_user_id_fkey` ON `kpi`;

-- AlterTable
ALTER TABLE `kpi` DROP COLUMN `ticket_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `realization` VARCHAR(20) NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `formula` VARCHAR(255) NULL,
    ADD COLUMN `name` TEXT NULL,
    ADD COLUMN `periode` VARCHAR(50) NULL,
    ADD COLUMN `score` VARCHAR(255) NULL,
    ADD COLUMN `total_score` VARCHAR(255) NULL,
    ADD COLUMN `verificator` VARCHAR(255) NULL,
    ADD COLUMN `weight` VARCHAR(10) NULL,
    ADD COLUMN `year_target` VARCHAR(20) NULL;

-- AddForeignKey
ALTER TABLE `kpi_detail` ADD CONSTRAINT `kpi_detail_kpi_id_fkey` FOREIGN KEY (`kpi_id`) REFERENCES `kpi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kpi_detail` ADD CONSTRAINT `kpi_detail_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kpi_detail` ADD CONSTRAINT `kpi_detail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
