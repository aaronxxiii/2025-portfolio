import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import MainContent from "./main-content";
import SideContent from "@/components/core/side-content";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-red)' }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-yellow)' }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-green)' }} />
          <span className="ml-4 text-muted-foreground text-sm">bash</span>
        </div>
        {/* Terminal content */}
        <div className="p-6 md:p-10">
          <SideContent />
          <main className="mt-10">
            <MainContent />
          </main>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => {
  const siteUrl = "https://aarondotdev.com";
  const title = "Aaron Jay Malabanan | Front End Engineer";
  const description =
    "Front End Engineer specializing in building fast, accessible, and pixel-perfect user interfaces. Currently at Betrnk, crafting performant web experiences with React, Next.js, and TypeScript.";
  const image = `${siteUrl}/og-image.png`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aaron Jay Malabanan",
    url: siteUrl,
    jobTitle: "Front End Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Betrnk",
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
      "Front End Development",
      "Web Accessibility",
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
        content="Front End Engineer, React Developer, Next.js, TypeScript, Web Developer, UI Developer, Aaron Jay Malabanan"
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
