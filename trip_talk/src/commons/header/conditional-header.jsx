"use client";

import { usePathname } from "next/navigation";
import Header from "@/commons/header/header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/signin" || pathname === "/signup";

  if (isLoginPage) {
    return null;
  }

  return <Header />;
}
