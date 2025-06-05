import React, { FC } from "react";
import SideContent from "./side-content";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="flex justify-between max-w-[1280px] w-full mx-auto ">
      <SideContent />
      {children}
    </div>
  );
};

export default Layout;
