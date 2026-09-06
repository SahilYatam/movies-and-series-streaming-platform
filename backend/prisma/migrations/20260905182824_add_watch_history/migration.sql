/*
  Warnings:

  - You are about to drop the column `lastWatchedAT` on the `WatchHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchHistory" DROP COLUMN "lastWatchedAT",
ADD COLUMN     "lastWatchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "WatchHistory_userId_lastWatchedAt_idx" ON "WatchHistory"("userId", "lastWatchedAt");

-- CreateIndex
CREATE INDEX "WatchHistory_episodeId_idx" ON "WatchHistory"("episodeId");
