import fs from "node:fs";
import path from "node:path";

export type Issue = {
  slug: string;
  filename: string;
  href: string;
  coverHref: string | null;
  title: string;
  month: string;
  monthIndex: number;
  year: number;
  issueNumber: number | null;
  sortKey: number;
  fileSizeBytes: number;
  isNew: boolean;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_INDEX: Record<string, number> = MONTHS.reduce((acc, m, i) => {
  acc[m.toUpperCase()] = i;
  return acc;
}, {} as Record<string, number>);

function parseIssue(
  filename: string,
  fileSizeBytes: number,
  coverExists: boolean,
): Issue | null {
  const base = filename.replace(/\.pdf$/i, "").toUpperCase();
  const tokens = base.split(/[\s_-]+/).filter(Boolean);

  let month: string | null = null;
  let monthIndex = -1;
  let year: number | null = null;
  let issueNumber: number | null = null;

  for (const tok of tokens) {
    if (month === null && tok in MONTH_INDEX) {
      monthIndex = MONTH_INDEX[tok];
      month = MONTHS[monthIndex];
      continue;
    }
    const num = Number(tok);
    if (Number.isInteger(num)) {
      if (num >= 1900 && num <= 2100 && year === null) {
        year = num;
      } else if (num > 0 && num < 1000 && issueNumber === null) {
        issueNumber = num;
      }
    }
  }

  if (month === null || year === null) return null;

  const slug = `${month.toLowerCase()}-${year}`;
  const title = `Offshore Africa — ${month} ${year}`;
  const href = `/magazines/${encodeURIComponent(filename)}`;
  const coverHref = coverExists
    ? `/covers/${encodeURIComponent(`${filename}.png`)}`
    : null;
  const sortKey = year * 12 + monthIndex;

  return {
    slug,
    filename,
    href,
    coverHref,
    title,
    month,
    monthIndex,
    year,
    issueNumber,
    sortKey,
    fileSizeBytes,
    isNew: false,
  };
}

let cachedIssues: Issue[] | null = null;

export function getAllIssues(): Issue[] {
  if (cachedIssues) return cachedIssues;

  const dir = path.join(process.cwd(), "public", "magazines");
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const coversDir = path.join(process.cwd(), "public", "covers");
  const issues: Issue[] = [];
  for (const name of entries) {
    if (!name.toLowerCase().endsWith(".pdf")) continue;
    const stat = fs.statSync(path.join(dir, name));
    const coverExists = fs.existsSync(path.join(coversDir, `${name}.png`));
    const parsed = parseIssue(name, stat.size, coverExists);
    if (parsed) issues.push(parsed);
  }

  issues.sort((a, b) => b.sortKey - a.sortKey);

  for (let i = 0; i < Math.min(3, issues.length); i++) {
    issues[i].isNew = true;
  }

  cachedIssues = issues;
  return issues;
}

export function getLatestIssue(): Issue | null {
  return getAllIssues()[0] ?? null;
}

export function getRecentIssues(count: number): Issue[] {
  return getAllIssues().slice(0, count);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
