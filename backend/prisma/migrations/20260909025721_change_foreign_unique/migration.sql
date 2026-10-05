/*
  Warnings:

  - You are about to drop the `KPI` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `KPI` DROP FOREIGN KEY `KPI_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `KPI` DROP FOREIGN KEY `KPI_user_id_fkey`;

-- DropTable
DROP TABLE `KPI`;

-- CreateTable
CREATE TABLE `kpi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `kpi_ticket_id_key`(`ticket_id`),
    UNIQUE INDEX `kpi_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kpi` ADD CONSTRAINT `kpi_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kpi` ADD CONSTRAINT `kpi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
