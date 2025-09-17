"use client";

import { usePathname } from "next/navigation";
import BannerComponent from "./banner";
import NavigationComponent from "./navigation";

const HIDDEN_HEADERS = ["/boards/new", "/boards/[boardId]"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHiddenHeader =
    HIDDEN_HEADERS.includes(pathname) || pathname.startsWith("/boards/");
  return (
    <>
      <NavigationComponent />
      {!isHiddenHeader && <BannerComponent />}
      {children}
    </>
  );
}
