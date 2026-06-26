-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('admin', 'ikb', 'ga') NOT NULL DEFAULT 'admin';
