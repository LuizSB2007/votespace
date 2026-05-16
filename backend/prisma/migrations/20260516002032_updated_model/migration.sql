/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vote_userId_roomId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Vote_roomId_key" ON "Vote"("roomId");
