-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "modul" TEXT,
ADD COLUMN     "reopened_at" TIMESTAMP(3),
ADD COLUMN     "sub_modul" TEXT;
