import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import MainContent from "./main-content";
import SideContent from "@/components/core/side-content";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="flex justify-between flex-col md:flex-row max-w-[1280px] mx-auto !scroll-smooth">
      <SideContent />
      <main className="m-0 p-0 leading-relaxed px-6 md:px-24">
        <MainContent />
      </main>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Aaron Jay Malabanan</title>;
