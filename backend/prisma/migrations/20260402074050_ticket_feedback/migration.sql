-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "estimate" TIMESTAMP(3),
ADD COLUMN     "feedback_user" TEXT;

-- CreateTable
CREATE TABLE "ticket_feedback" (
    "id" SERIAL NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_feedback" ADD CONSTRAINT "ticket_feedback_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_feedback" ADD CONSTRAINT "ticket_feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
