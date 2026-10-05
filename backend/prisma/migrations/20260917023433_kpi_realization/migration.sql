/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `department` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `documentation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `documentation` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `category_id` on the `documentation` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `documentation_files` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `documentation_files` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `document_id` on the `documentation_files` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `images` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `ticket_id` on the `images` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `kpi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `periode` on the `kpi` table. All the data in the column will be lost.
  - You are about to drop the column `realization` on the `kpi` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `kpi` table. All the data in the column will be lost.
  - You are about to drop the column `total_score` on the `kpi` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `kpi` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `kpi_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `kpi_detail` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `ticket_id` on the `kpi_detail` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `user_id` on the `kpi_detail` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `log` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `ticket_id` on the `log` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `user_id` on the `log` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `members` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `push_notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `push_notification` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `ticket_id` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `score` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedTinyInt`.
  - The primary key for the `ticket_feedback` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ticket_feedback` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `ticket_id` on the `ticket_feedback` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `user_id` on the `ticket_feedback` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `assign_to` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `category_id` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `department_id` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `member_id` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - Added the required column `updated_at` to the `kpi` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `kpi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `formula` on table `kpi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `kpi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `kpi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year_target` on table `kpi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kpi_id` on table `kpi_detail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `documentation` DROP FOREIGN KEY `documentation_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `documentation_files` DROP FOREIGN KEY `documentation_files_document_id_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `kpi_detail` DROP FOREIGN KEY `kpi_detail_kpi_id_fkey`;

-- DropForeignKey
ALTER TABLE `kpi_detail` DROP FOREIGN KEY `kpi_detail_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `kpi_detail` DROP FOREIGN KEY `kpi_detail_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `log_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `log_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `rating` DROP FOREIGN KEY `rating_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticket_feedback` DROP FOREIGN KEY `ticket_feedback_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticket_feedback` DROP FOREIGN KEY `ticket_feedback_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_assign_to_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_member_id_fkey`;

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `department` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `documentation` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `category_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `documentation_files` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `document_id` INTEGER UNSIGNED NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `images` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `ticket_id` INTEGER UNSIGNED NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `kpi` DROP PRIMARY KEY,
    DROP COLUMN `periode`,
    DROP COLUMN `realization`,
    DROP COLUMN `score`,
    DROP COLUMN `total_score`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `formula` VARCHAR(255) NOT NULL,
    MODIFY `name` TEXT NOT NULL,
    MODIFY `weight` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    MODIFY `year_target` DECIMAL(8, 0) NOT NULL DEFAULT 0.00,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `kpi_detail` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `kpi_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `ticket_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `user_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `log` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `ticket_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `user_id` INTEGER UNSIGNED NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `members` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `push_notification` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `rating` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `ticket_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `score` TINYINT UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ticket_feedback` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `ticket_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `user_id` INTEGER UNSIGNED NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tickets` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `assign_to` INTEGER UNSIGNED NULL,
    MODIFY `category_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `department_id` INTEGER UNSIGNED NULL,
    MODIFY `member_id` INTEGER UNSIGNED NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `kpi_realization` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `kpi_id` INTEGER UNSIGNED NOT NULL,
    `year` SMALLINT UNSIGNED NOT NULL,
    `month` TINYINT UNSIGNED NOT NULL,
    `target` DECIMAL(12, 0) NOT NULL DEFAULT 0.00,
    `realization` DECIMAL(12, 0) NOT NULL DEFAULT 0.00,
    `score` DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
    `total_score` DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `kpi_realization_kpi_id_fkey`(`kpi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `documentation_files_document_id_fkey` ON `documentation_files`(`document_id`);

-- CreateIndex
CREATE INDEX `images_ticket_id_fkey` ON `images`(`ticket_id`);

-- CreateIndex
CREATE INDEX `kpi_detail_ticket_id_fkey` ON `kpi_detail`(`ticket_id`);

-- CreateIndex
CREATE INDEX `rating_ticket_id_fkey` ON `rating`(`ticket_id`);

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_assign_to_fkey` FOREIGN KEY (`assign_to`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket_feedback` ADD CONSTRAINT `ticket_feedback_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket_feedback` ADD CONSTRAINT `ticket_feedback_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `log_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentation` ADD CONSTRAINT `documentation_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentation_files` ADD CONSTRAINT `documentation_files_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `documentation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kpi_detail` ADD CONSTRAINT `kpi_detail_kpi_id_fkey` FOREIGN KEY (`kpi_id`) REFERENCES `kpi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kpi_detail` ADD CONSTRAINT `kpi_detail_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kpi_detail` ADD CONSTRAINT `kpi_detail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kpi_realization` ADD CONSTRAINT `kpi_realization_kpi_id_fkey` FOREIGN KEY (`kpi_id`) REFERENCES `kpi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
