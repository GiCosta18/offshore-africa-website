import type { Metadata } from "next";
import { getAllIssues, formatFileSize } from "@/lib/issues";

export const metadata: Metadata = {
  title: "Issues Archive — Offshore Africa Magazine",
  description: "Browse and download every edition of Offshore Africa Magazine.",
};

export default function IssuesPage() {
  const issues = getAllIssues();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <p className="uppercase tracking-[0.3em] text-coral text-xs">
          Archive
        </p>
        <h1 className="font-display text-4xl md:text-5xl mt-3">
          All Issues
        </h1>
        <p className="mt-4 text-ink/70 max-w-2xl">
          Every edition of Offshore Africa Magazine, newest first. Read each
          issue online or download the full PDF.
        </p>
        <p className="mt-2 text-sm text-ink/50">
          {issues.length} {issues.length === 1 ? "issue" : "issues"} available
        </p>
      </header>

      {issues.length === 0 ? (
        <div className="text-center py-20 text-ink/60">
          No issues found in <code>public/magazines/</code>.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <article
              key={issue.slug}
              className="group bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-coral transition-colors flex flex-col"
            >
              <div className="relative aspect-[3/4] bg-ocean/5 flex items-center justify-center border-b border-ink/10 overflow-hidden">
                {issue.isNew && (
                  <span className="absolute top-3 right-3 z-10 bg-coral text-ink text-xs font-bold uppercase tracking-widest px-2 py-1 rounded shadow">
                    New
                  </span>
                )}
                {issue.coverHref ? (
                  <img
                    src={issue.coverHref}
                    alt={`${issue.title} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center px-4">
                    <div className="font-display text-xl text-ocean">
                      Offshore Africa
                    </div>
                    <div className="mt-2 text-coral uppercase tracking-widest text-xs">
                      {issue.month} {issue.year}
                    </div>
                    {issue.issueNumber !== null && (
                      <div className="mt-1 text-ink/50 text-xs">
                        Issue #{issue.issueNumber}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-semibold">
                  {issue.month} {issue.year}
                </div>
                <div className="text-sm text-ink/60 mt-1">
                  {formatFileSize(issue.fileSizeBytes)} PDF
                </div>
                <div className="mt-4 flex gap-2 pt-4 border-t border-ink/10 mt-auto">
                  <a
                    href={issue.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-ocean text-sand text-sm py-2 px-3 rounded hover:bg-ocean/90 transition-colors"
                  >
                    View Online
                  </a>
                  <a
                    href={issue.href}
                    download
                    className="flex-1 text-center border border-ocean text-ocean text-sm py-2 px-3 rounded hover:bg-ocean/5 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
