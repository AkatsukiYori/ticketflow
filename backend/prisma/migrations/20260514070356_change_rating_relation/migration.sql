/*
  Warnings:

  - A unique constraint covering the columns `[ticket_id]` on the table `rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rating_ticket_id_key" ON "rating"("ticket_id");
