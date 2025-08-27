"use client";

import Header from "../header/header";
import Banner from "../banner/banner";
import { usePathname } from "next/navigation";

type AppFrameProps = { children: React.ReactNode };

export default function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

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

  return (
    <>
      <Header />
      <Banner width={1280} height={516} />
      {children}
    </>
  );
}


