-- CreateTable
CREATE TABLE `kpi_description` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `kpi_id` INTEGER UNSIGNED NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX `kpi_description_kpi_id_fkey`(`kpi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kpi_description` ADD CONSTRAINT `kpi_description_kpi_id_fkey` FOREIGN KEY (`kpi_id`) REFERENCES `kpi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
