-- DropForeignKey
ALTER TABLE `kpi` DROP FOREIGN KEY `kpi_user_id_fkey`;

-- DropIndex
DROP INDEX `kpi_user_id_key` ON `kpi`;

ALTER TABLE `kpi`
ADD CONSTRAINT `kpi_user_id_fkey`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`id`)
ON DELETE RESTRICT
ON UPDATE CASCADE;