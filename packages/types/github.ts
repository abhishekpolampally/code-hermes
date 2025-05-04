import { components } from "@octokit/openapi-types";

export type GitHubPRFile = components["schemas"]["diff-entry"];

export interface ReviewComment {
  filename: string;
  line_number: number;
  comment: string;
}
