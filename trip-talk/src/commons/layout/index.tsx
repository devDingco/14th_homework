"use client";
import { usePathname } from "next/navigation";
import Navigation from "./navigation";
import Banner from "./banner";

const HIDDEN_BANNER_PAGES = ["/boards/new", "/", "/first/signUp"];
const HIDDEN_NAVIGATION_PAGES = ["/"]; // 루트 페이지에서는 헤더 숨김
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHideBanner = HIDDEN_BANNER_PAGES.includes(pathname) || pathname.startsWith("/mypage") || pathname.startsWith("/accommodation");
  const shouldHideNavigation = HIDDEN_NAVIGATION_PAGES.includes(pathname);
  return (
    <div className="w-full h-full">
      {/* Navigation은 특정 페이지에서만 숨김 */}
      {!shouldHideNavigation && <Navigation />}
      {/* Banner는 특정 페이지에서만 표시 */}
      {!shouldHideBanner && <Banner />}
      <div className="flex flex-col">{children}</div> {/* 실제 페이지 내용 */}
    </div>
  );
}
