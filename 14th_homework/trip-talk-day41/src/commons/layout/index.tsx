"use client";
import { usePathname } from "next/navigation";
import Navigation from "./navigation";
import Banner from "./banner";

const HIDDEN_HEADERS = ["/boards/new", "/", "/first/signUp"];
export default function Layout({ children }) {
  const pathname = usePathname();
  const isHiddenHeader = HIDDEN_HEADERS.includes(pathname);
  return (
    <div className="w-full h-full">
      {/* 전체 화면 기준 */}
      {!isHiddenHeader && <Navigation />}
      {!isHiddenHeader && <Banner />}
      <div className="flex flex-col">{children}</div> {/* 실제 페이지 내용 */}
    </div>
  );
}
