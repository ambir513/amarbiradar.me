// Credit: https://chanhdai.com/components/github-contributions

"use client";
import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "./github-contributions";
import { getCachedContributions } from "../lib/get-cached-contributions";

const GITHUB_USERNAME = "ambir513";
const GITHUB_PROFILE_URL = "https://github.com/ambir513";

export function GithubCard() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={GITHUB_PROFILE_URL}
        className="lg:max-w-full md:max-w-md max-w-xs"
      />
    </Suspense>
  );
}
