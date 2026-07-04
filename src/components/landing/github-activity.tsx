"use client";
import { GithubCard } from "../github/components/github-card";

export function GithubActivitySection() {
  return (
    <section className="py-10 space-y-6">
      <h2 className="text-xl font-semibold">Github Activity</h2>
      <div className="w-fit">
        {/* Thank You chanhdai.com 🙏 */}
        <GithubCard />
      </div>
    </section>
  );
}
