/*
  Warnings:

  - A unique constraint covering the columns `[prNumber,repo,owner]` on the table `PullRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ReviewComment" (
    "id" TEXT NOT NULL,
    "prNumber" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "lineNumber" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewComment_prNumber_repo_owner_filePath_lineNumber_comme_key" ON "ReviewComment"("prNumber", "repo", "owner", "filePath", "lineNumber", "comment");

-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_prNumber_repo_owner_key" ON "PullRequest"("prNumber", "repo", "owner");

-- AddForeignKey
ALTER TABLE "ReviewComment" ADD CONSTRAINT "ReviewComment_prNumber_fkey" FOREIGN KEY ("prNumber") REFERENCES "PullRequest"("prNumber") ON DELETE CASCADE ON UPDATE CASCADE;
