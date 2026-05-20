import type { Metadata } from "next";
import { getRecentIssues } from "@/lib/issues";

export const metadata: Metadata = {
  title: "Subscribe — Offshore Africa Magazine",
  description: "Get every new edition of Offshore Africa Magazine delivered.",
};

export default function SubscribePage() {
  const recent = getRecentIssues(5);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <p className="uppercase tracking-[0.3em] text-coral text-xs">
          Subscribe
        </p>
        <h1 className="font-display text-4xl md:text-5xl mt-3">
          Never miss an issue.
        </h1>
        <p className="mt-4 text-ink/70">
          Enter your email and we'll send you the new edition of Offshore
          Africa Magazine the moment it goes to press.
        </p>

        <form
          className="mt-8 space-y-4"
          action="https://formspree.io/f/your-id"
          method="POST"
        >
          <div>
            <label className="block text-sm font-medium" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full px-4 py-3 rounded border border-ink/20 bg-white focus:outline-none focus:border-ocean"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full px-4 py-3 rounded border border-ink/20 bg-white focus:outline-none focus:border-ocean"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="organization">
              Organization <span className="text-ink/50">(optional)</span>
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              className="mt-1 w-full px-4 py-3 rounded border border-ink/20 bg-white focus:outline-none focus:border-ocean"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-coral text-ink font-semibold px-6 py-3 rounded hover:bg-coral/90 transition-colors"
          >
            Subscribe
          </button>
          <p className="text-xs text-ink/50">
            We never share your email. Unsubscribe at any time.
          </p>
        </form>
      </div>

      <aside className="bg-white border border-ink/10 rounded-lg p-8 self-start">
        <p className="uppercase tracking-[0.3em] text-coral text-xs">
          Recent editions
        </p>
        <h2 className="font-display text-2xl mt-2">
          Already published
        </h2>
        <p className="mt-2 text-sm text-ink/60">
          Join readers who've followed the last {recent.length} editions.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          {recent.map((issue) => (
            <li
              key={issue.slug}
              className="flex justify-between items-center pb-3 border-b border-ink/10 last:border-0"
            >
              <span className="font-medium">
                {issue.month} {issue.year}
              </span>
              <a
                href={issue.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean hover:text-coral text-xs uppercase tracking-widest"
              >
                Read
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
