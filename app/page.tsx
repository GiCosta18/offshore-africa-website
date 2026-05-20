import Link from "next/link";
import { getLatestIssue, getRecentIssues, formatFileSize } from "@/lib/issues";

export default function HomePage() {
  const latest = getLatestIssue();
  const recent = getRecentIssues(4).slice(1, 4);

  return (
    <div>
      <section className="bg-ocean text-sand">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-coral text-xs">
              Latest issue
            </p>
            <h1 className="font-display text-5xl md:text-6xl mt-4 leading-tight">
              {latest ? latest.title : "Offshore Africa Magazine"}
            </h1>
            <p className="mt-6 text-sand/80 text-lg max-w-md">
              In-depth reporting on energy, infrastructure and industry across
              the African coast — read the latest edition online or download
              the full PDF.
            </p>
            {latest && (
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={latest.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-coral text-ink px-6 py-3 rounded font-semibold hover:bg-coral/90 transition-colors"
                >
                  Read Online
                </a>
                <a
                  href={latest.href}
                  download
                  className="border border-sand/40 px-6 py-3 rounded hover:bg-sand/10 transition-colors"
                >
                  Download PDF ({formatFileSize(latest.fileSizeBytes)})
                </a>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            {latest?.coverHref ? (
              <img
                src={latest.coverHref}
                alt={`${latest.title} cover`}
                className="w-full aspect-[3/4] object-cover rounded-lg shadow-2xl border border-sand/20"
              />
            ) : (
              <div className="aspect-[3/4] bg-sand/10 border border-sand/20 rounded-lg flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="font-display text-3xl text-sand">
                    Offshore Africa
                  </div>
                  <div className="mt-3 text-coral uppercase tracking-widest text-sm">
                    {latest ? `${latest.month} ${latest.year}` : "Coming Soon"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="uppercase tracking-[0.3em] text-coral text-xs">
              Recent editions
            </p>
            <h2 className="font-display text-3xl mt-2">More from the archive</h2>
          </div>
          <Link href="/issues" className="text-ocean underline hover:text-coral">
            View all issues &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((issue) => (
            <Link
              key={issue.slug}
              href={issue.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-coral transition-colors"
            >
              <div className="aspect-[3/4] bg-ocean/5 flex items-center justify-center border-b border-ink/10 overflow-hidden">
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
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="font-semibold group-hover:text-coral">
                  {issue.month} {issue.year}
                </div>
                <div className="text-sm text-ink/60 mt-1">
                  {formatFileSize(issue.fileSizeBytes)} PDF
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
