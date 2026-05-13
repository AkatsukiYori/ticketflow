/*
  Warnings:

  - A unique constraint covering the columns `[document_id]` on the table `documentation_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ticket_id]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_ticket_id_fkey";

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "ticket_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "documentation_files_document_id_key" ON "documentation_files"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_ticket_id_key" ON "images"("ticket_id");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
