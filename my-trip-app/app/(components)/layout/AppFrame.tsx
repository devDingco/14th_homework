"use client";

import Header from "../header/header";
import Banner from "../banner/banner";
import { usePathname } from "next/navigation";

type AppFrameProps = { children: React.ReactNode };

export default function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");
  const isProductDetailRoute = pathname.startsWith("/product/");
  const isMypageRoute = pathname.startsWith("/mypage");

  if (isAuthRoute) {
    return <>{children}</>;
  }

  if (pathname === "/board") {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  if (isMypageRoute) {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  // 제품 상세 페이지(`/product/[id]`)에서는 배너를 노출하지 않습니다.
  if (isProductDetailRoute) {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return (
    <>
      <Header />
      <Banner />
      {children}
    </>
  );
}


