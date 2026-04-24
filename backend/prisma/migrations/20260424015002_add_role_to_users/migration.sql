-- CreateEnum
CREATE TYPE "RoleUsers" AS ENUM ('admin', 'ikb');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "RoleUsers" NOT NULL DEFAULT 'admin';
