/*
  Warnings:

  - The primary key for the `PullRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PullRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PullRequest" DROP CONSTRAINT "PullRequest_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("prNumber");
