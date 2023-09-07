/*
  Warnings:

  - You are about to drop the column `boadrId` on the `Columns` table. All the data in the column will be lost.
  - Added the required column `boardId` to the `Columns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_boadrId_fkey";

-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "boadrId",
ADD COLUMN     "boardId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
