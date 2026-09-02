# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`).

- `pnpm dev` — start dev server (Next.js with `--turbopack`) on http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (`next/core-web-vitals` + `next/typescript`)

There is no test suite in this repo.

**Builds do not fail on type or lint errors.** `next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`. A green `pnpm build` is not evidence of type safety — run `pnpm lint` and `pnpm exec tsc --noEmit` explicitly when that matters.

## Environment

`.env*` is gitignored. Two variables are read (see `grep -rn process.env src/`):

- `GITHUB_TOKEN` — auth for the Octokit client (`src/api/octokit.ts`). Optional for REST (unauthenticated falls back to 60 req/hr) but **required** for the file-tree table, which uses GitHub GraphQL (GraphQL rejects unauthenticated requests).
- `HOST` — only used for display text in the homepage typewriter (`src/app/page.tsx`).

## Architecture

Next.js 15 App Router, React 19, TypeScript, Tailwind 3, shadcn/ui (`new-york` style, Radix primitives in `src/components/ui/`). Path alias `@/*` → `src/*`. `cn()` lives in `src/lib/utils.ts`.

### Two routes

- `/` — `src/app/page.tsx`: marketing landing page. Renders a 3D globe (`three` / `@react-three/fiber` / `three-globe`, arc data in `src/sample-data/globe.json`) via `GithubGlobe.tsx`.
- `/[org]/[repo]` — `src/app/[org]/[repo]/page.tsx`: the actual GitHub repo-homepage clone. Large async Server Component.

### Data layer (`src/api/`)

All GitHub access goes through one Octokit instance (`octokit.ts`). Nothing returns a raw `Response` — wrappers return parsed data.

- `octokit.ts` — the singleton `Octokit({ auth: GITHUB_TOKEN })`, `RequestError` re-export, and `getRepo` (404 → `null`), wrapped in `react` `cache` (per-request) over `unstable_cache` (cross-request, `REPO_CACHE_TTL`).
- `github.ts` — thin typed wrappers, one per endpoint (`octokit.rest.*`), each returning `.data`. README / LICENSE / CODE_OF_CONDUCT.md / SECURITY.md are fetched with `mediaType: { format: "raw" }` (no base64 decode).
- `get-tree-with-commits.ts` — `getTreeWithLatestCommit(owner, repo, ref, entries)` resolves every root entry's latest commit in **one GraphQL request** (aliased `history(first: 1, path: …)` per entry, chunked at 100), then sorts folders-first / uppercase-first.
- `get-repo-view-model.ts` — `buildRepoViewModel` fans out ~11 calls via `Promise.all` and assembles one typed `RepoViewModel` shaped to the component props (all inline formatting moved to `src/lib/format.ts`). Exported `getRepoViewModel` wraps it in `unstable_cache` (one entry per repo, `REPO_CACHE_TTL`, per-repo tag). `{ notFound: true }` (404 or private) is cached; thrown errors are not.
- `src/lib/cache.ts` — `REPO_CACHE_TTL` (300s) + `repoTag(org, repo)`. `page.tsx` also sets `export const revalidate = 300` (Full Route Cache in prod; no effect in `next dev`).

Types (`src/types/github.ts`) are derived from Octokit's endpoint methods, not hand-written. Private repos and 404s render a plain `404 not found` div.

### Rendering

`RepoPageLayout` (`src/components/layouts/RepoPageLauyout.tsx` — note the filename typo) wraps every repo page: `NavBar` + `Header` in the header, shared footer. Page body = `MainHeader` (branch/tag switcher — takes `orgName`/`repoName` as props, does **not** read `window`), `CodeTreeTable`, and a `Tabs` block for README / Code of conduct / License / Security. Components keep their own exported prop types; the view model produces objects matching them.

### Markdown

`MarkdownRenderer.tsx` renders README and other docs **at runtime** with `@markdoc/markdoc`: `parse` → `transform` with an inline node→component config → `Markdoc.renderers.react`. Every node type (headings, links, tables, fences, inline code, raw html) maps to a local component defined in the same file. Code fences render through `CodeBlock.tsx` (client component: Prism highlighting + copy button). Raw HTML nodes go through `dangerouslySetInnerHTML`.

`next.config.ts` also wires `@markdoc/next.js` with `schemaPath: './src/markdoc'`, but **that directory does not exist** and no `.md`/`.mdoc` pages are used — the Markdoc *pages* integration is effectively inert; all markdown handling is the manual path above.

### Styling

Tailwind with shadcn CSS variables (neutral base), `darkMode: "class"`. Expect many hardcoded GitHub hex colors inline (e.g. `#0969DA` for links).

## Quirks to be aware of

- `totalCommits` in the code-tree header is a hardcoded `'30'` (no real count is fetched).
- Compact counts (`formatCompactCount` in `src/lib/format.ts`) do `(n/1000).toString().substring(0,4)`, so large values can render with a trailing dot (e.g. `248.k`). Preserved deliberately from the original.
- Cached data can be up to `REPO_CACHE_TTL` (300s) stale, including `404 not found` for a repo that was just created or un-privated.
- `getUser` / `getBranches` / `getTags` / `getLastCommitDetails` in the view model are not `.catch`-guarded, so a transient GitHub failure on any of them 500s the whole page (a retry succeeds since 500s aren't cached).
