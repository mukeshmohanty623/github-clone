// Compact counts the way GitHub shows them in the repo header: 1234 -> "1.23k".
// Reproduces the exact expression previously inlined in `page.tsx` / `Header.tsx`.
export function formatCompactCount(n: number): string {
  return n > 999 ? `${(n / 1000).toString().substring(0, 4)}k` : String(n);
}

// Pull the first "#123" reference out of a commit message (used for the PR link).
export function parsePrId(message: string | undefined): string {
  return message?.match(/#(\d+)/)?.[1] ?? "";
}
