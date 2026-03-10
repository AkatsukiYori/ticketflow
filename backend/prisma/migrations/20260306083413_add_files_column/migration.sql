/*
  Warnings:

  - You are about to drop the column `status_date` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `file_path` to the `documentation_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetypes` to the `documentation_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `documentation_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_path` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetypes` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "documentation_category_id_key";

-- DropIndex
DROP INDEX "documentation_files_document_id_key";

-- DropIndex
DROP INDEX "images_ticket_id_key";

-- DropIndex
DROP INDEX "log_ticket_id_key";

-- AlterTable
ALTER TABLE "documentation_files" ADD COLUMN     "file_path" TEXT NOT NULL,
ADD COLUMN     "mimetypes" TEXT NOT NULL,
ADD COLUMN     "size" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "file_path" TEXT NOT NULL,
ADD COLUMN     "mimetypes" TEXT NOT NULL,
ADD COLUMN     "size" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "status_date";
