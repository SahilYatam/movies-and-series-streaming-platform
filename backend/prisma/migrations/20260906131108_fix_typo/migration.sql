/*
  Warnings:

  - You are about to drop the column `overiew` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `overiew` on the `Season` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "overiew",
ADD COLUMN     "overview" TEXT;

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "overiew",
ADD COLUMN     "overview" TEXT;
