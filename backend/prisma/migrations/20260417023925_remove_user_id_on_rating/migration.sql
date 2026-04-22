/*
  Warnings:

  - You are about to drop the column `user_id` on the `rating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rating" DROP COLUMN "user_id";

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
