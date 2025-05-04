import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";
import fs from "fs";

export async function getAuthenticatedOctokit(installationId: number) {
  const privateKey = fs.readFileSync(
    process.env.GITHUB_PRIVATE_KEY_PATH!,
    "utf-8"
  );

  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID!,
    privateKey,
    installationId,
    // clientId: process.env.GITHUB_CLIENT_ID!,
    // clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  });

  const { token } = await auth({ type: "installation" });

  return new Octokit({ auth: token });
}
