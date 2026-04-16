-- CreateTable
CREATE TABLE "rating" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);
