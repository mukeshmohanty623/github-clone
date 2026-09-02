import { Octokit, RequestError } from "octokit";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { REPO_CACHE_TTL, repoTag } from "@/lib/cache";

// Single shared Octokit instance for all server-side GitHub calls.
//
// `auth` is `undefined` when GITHUB_TOKEN is unset — Octokit then omits the
// Authorization header and issues unauthenticated requests (60 req/hr). Set
// GITHUB_TOKEN in `.env`: the file-tree builder in `get-tree-with-commits.ts`
// makes one request per tree entry and will exhaust the unauthenticated quota
// almost immediately.
//
// Note: no `per_page` is set anywhere. The presentation layer depends on
// GitHub's default page size of 30 (e.g. `branches.length`, `releases.length - 1`,
// `contributors.length - 14`). Use `octokit.paginate(...)` if true totals are
// ever needed.
export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export { RequestError };

// Returns `null` on 404 so callers can render the "not found" state instead of
// throwing. A thrown error is never cached; `null` is.
async function fetchRepoRaw(owner: string, repo: string) {
  try {
    const { data } = await octokit.rest.repos.get({ owner, repo });
    return data;
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) return null;
    throw error;
  }
}

// `cache` (react) dedupes within a single request — `generateMetadata` and the
// page render share one call. `unstable_cache` (next) persists the result across
// requests for `REPO_CACHE_TTL`, keyed + tagged per repo.
export const getRepo = cache((owner: string, repo: string) =>
  unstable_cache(
    () => fetchRepoRaw(owner, repo),
    ["repo-get", owner.toLowerCase(), repo.toLowerCase()],
    { revalidate: REPO_CACHE_TTL, tags: [repoTag(owner, repo)] },
  )(),
);
