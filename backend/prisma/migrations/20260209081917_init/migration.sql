-- CreateEnum
CREATE TYPE "Location" AS ENUM ('pontianak', 'jakarta');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('high', 'low');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('pending', 'on_progress', 'completed', 'reject');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(150) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "location" "Location" NOT NULL DEFAULT 'pontianak',
    "isActive" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "assign_to" INTEGER,
    "category_id" INTEGER NOT NULL,
    "ticket_no" VARCHAR(100) NOT NULL,
    "ticket_title" VARCHAR(100) NOT NULL,
    "problem" TEXT NOT NULL,
    "report_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "department" VARCHAR(100) NOT NULL,
    "location" VARCHAR(50) NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'low',
    "note" TEXT,
    "status" "TicketStatus" NOT NULL DEFAULT 'pending',
    "status_reason" VARCHAR(100),
    "status_date" TIMESTAMP(3),
    "closed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "action_type" VARCHAR(100) NOT NULL,
    "log_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentation" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentation_files" (
    "id" SERIAL NOT NULL,
    "document_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documentation_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_assign_to_key" ON "tickets"("assign_to");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_category_id_key" ON "tickets"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_ticket_id_key" ON "images"("ticket_id");

-- CreateIndex
CREATE UNIQUE INDEX "log_ticket_id_key" ON "log"("ticket_id");

-- CreateIndex
CREATE UNIQUE INDEX "documentation_category_id_key" ON "documentation"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "documentation_files_document_id_key" ON "documentation_files"("document_id");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assign_to_fkey" FOREIGN KEY ("assign_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentation" ADD CONSTRAINT "documentation_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentation_files" ADD CONSTRAINT "documentation_files_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
