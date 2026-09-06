/*
  Warnings:

  - The values [MOVIE,TV] on the enum `TitleKind` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TitleKind_new" AS ENUM ('movie', 'tv');
ALTER TABLE "Title" ALTER COLUMN "kind" TYPE "TitleKind_new" USING ("kind"::text::"TitleKind_new");
ALTER TYPE "TitleKind" RENAME TO "TitleKind_old";
ALTER TYPE "TitleKind_new" RENAME TO "TitleKind";
DROP TYPE "public"."TitleKind_old";
COMMIT;
