import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Offshore Africa Magazine",
  description:
    "Offshore Africa Magazine — energy, infrastructure and industry across the African coast.",
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/issues", label: "Issues" },
  { href: "/subscribe", label: "Subscribe" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-ocean text-sand">
          <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
            <Link href="/" className="font-display text-xl tracking-wide">
              Offshore Africa
            </Link>
            <nav className="flex gap-6 text-sm uppercase tracking-widest">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-coral transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-ink text-sand/80 mt-16">
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm">
            <div>
              <div className="font-display text-lg text-sand">
                Offshore Africa
              </div>
              <p className="mt-2 max-w-md">
                Reporting on energy, infrastructure and industry across the
                African coast.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <span>&copy; {new Date().getFullYear()} Offshore Africa Magazine</span>
              <Link href="/subscribe" className="hover:text-coral">
                Subscribe to the print edition
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
