-- CreateTable
CREATE TABLE "RepositoryInstallation" (
    "id" SERIAL NOT NULL,
    "repo" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "installationId" INTEGER NOT NULL,

    CONSTRAINT "RepositoryInstallation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryInstallation_repo_owner_key" ON "RepositoryInstallation"("repo", "owner");
