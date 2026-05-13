-- DropForeignKey
ALTER TABLE "documentation_files" DROP CONSTRAINT "documentation_files_document_id_fkey";

-- AlterTable
ALTER TABLE "documentation_files" ALTER COLUMN "document_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "documentation_files" ADD CONSTRAINT "documentation_files_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documentation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
