-- AlterTable
ALTER TABLE "log" ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
