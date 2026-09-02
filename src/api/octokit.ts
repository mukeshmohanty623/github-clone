import { Octokit, RequestError } from "octokit";
import { cache } from "react";

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

// Request-scoped memoization so `generateMetadata` and the page component share
// a single `repos.get` call. Returns `null` on 404 so callers can render the
// "not found" state instead of throwing.
export const getRepo = cache(async (owner: string, repo: string) => {
  try {
    const { data } = await octokit.rest.repos.get({ owner, repo });
    return data;
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) return null;
    throw error;
  }
});
