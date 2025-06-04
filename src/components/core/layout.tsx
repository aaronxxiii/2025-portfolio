import React, { FC } from "react";
import SideContent from "./side-content";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="flex h-screen !overflow-hidden max-w-[1024px] w-full mx-auto ">
      <SideContent />
      {children}
    </div>
  );
};

export default Layout;
