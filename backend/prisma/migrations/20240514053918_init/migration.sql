-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "is_delete" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_delete" INTEGER NOT NULL DEFAULT 0;
