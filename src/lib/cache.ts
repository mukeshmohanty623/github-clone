// How long assembled repo data stays cached before a background refetch.
// Single knob — tune freely; everything below reads from here.
export const REPO_CACHE_TTL = 300; // seconds

// Cache tag for one repo's data, so it can be invalidated on demand later
// (e.g. a webhook calling `revalidateTag`). Lowercased because GitHub treats
// owner/repo case-insensitively.
export const repoTag = (org: string, repo: string) =>
  `repo:${org.toLowerCase()}/${repo.toLowerCase()}`;
