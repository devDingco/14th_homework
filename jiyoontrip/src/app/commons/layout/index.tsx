"use client";

import { usePathname } from "next/navigation";
import BannerComponent from "./banner";
import NavigationComponent from "./navigation";

const HIDDEN_HEADERS = ["/boards/new", "/boards/[boardId]"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHiddenBanner =
    HIDDEN_HEADERS.includes(pathname) ||
    pathname.startsWith("/boards/") ||
    pathname.startsWith("/auth/");
  const isHiddenNav = pathname.startsWith("/auth/");
  return (
    <>
      {!isHiddenNav && <NavigationComponent />}
      {!isHiddenBanner && <BannerComponent />}
      {children}
    </>
  );
}
