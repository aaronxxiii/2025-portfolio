import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import MainContent from "./main-content";
import SideContent from "@/components/core/side-content";
import TerminalMode from "@/components/core/terminal-mode";

const IndexPage: React.FC<PageProps> = () => {
  const [terminalMode, setTerminalMode] = React.useState(false);

  return (
    <div className="min-h-screen bg-background p-0 md:p-8">
      <div className="max-w-5xl mx-auto border border-border bg-card shadow-2xl overflow-hidden rounded-none md:rounded-xl">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-red)' }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-yellow)' }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-green)' }} />
          <span className="ml-4 text-muted-foreground text-sm">
            {terminalMode ? "~/ terminal" : "~/ aaron.dev"}
          </span>
          <button
            onClick={() => setTerminalMode((prev) => !prev)}
            className="ml-auto px-2 py-0.5 text-xs font-mono rounded bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
            aria-label={terminalMode ? "Exit terminal mode" : "Enter terminal mode"}
          >
            {terminalMode ? "exit" : ">_"}
          </button>
        </div>
        {/* Terminal content */}
        {terminalMode ? (
          <TerminalMode onExit={() => setTerminalMode(false)} />
        ) : (
          <div className="p-6 md:p-10">
            <SideContent />
            <main className="mt-10">
              <MainContent />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => {
  const siteUrl = "https://aarondotdev.com";
  const title = "Aaron Jay Malabanan | Full Stack Developer";
  const description =
    "Full Stack Developer with 4+ years of experience building web applications from front to back. Specializing in React, Next.js, TypeScript, and Laravel.";
  const image = `${siteUrl}/og-image.png`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aaron Jay Malabanan",
    url: siteUrl,
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "BK Keyforce",
    },
    sameAs: [
      "https://github.com/aarondotdev",
      "https://www.linkedin.com/in/aaronmlbnn/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "Node.js",
      "GraphQL",
      "Full Stack Development",
    ],
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Aaron Jay Malabanan" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Aaron Jay Malabanan" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta
        name="keywords"
        content="Full Stack Developer, React Developer, Next.js, TypeScript, Laravel, Node.js, Web Developer, Aaron Jay Malabanan"
      />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
};
