"use client";

import { ReactNode } from "react";
import Banner from "./banner";
import BoardsListBanner from "@/components/boards-list/banner";

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Banner />
      <BoardsListBanner />
      <main>{children}</main>
    </>
  );
}
