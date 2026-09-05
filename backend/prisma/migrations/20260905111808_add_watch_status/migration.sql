/*
  Warnings:

  - You are about to drop the column `like` on the `Title` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('planning', 'watching', 'completed');

-- AlterTable
ALTER TABLE "Title" DROP COLUMN "like";

-- AlterTable
ALTER TABLE "Watchlist" ADD COLUMN     "status" "WatchStatus";
