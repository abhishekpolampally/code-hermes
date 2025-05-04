-- CreateTable
CREATE TABLE "PullRequest" (
    "id" SERIAL NOT NULL,
    "prNumber" INTEGER NOT NULL,
    "repo" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "files" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id")
);
