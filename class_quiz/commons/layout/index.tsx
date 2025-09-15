"use client";

import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";
import LayoutSidebar from "./sidebar";



const HIDDEN_NAVIGATION = [
  "/pages/day30-1/one",
  "/pages/day30-1/two"
];
const HIDDEN_SIDEBAR = [
  "/pages/day30-1/two"
]
const HIDDEN_BANNER = [
  "/pages/day30-1/two"
]


export default function Layout({ children }) {
  const pathname = usePathname();
  const params = useParams()
  const isDynamicPage = params?.id !== undefined
  const isHiddenNavigation = HIDDEN_NAVIGATION.includes(pathname);
  const isHiddenSidebar = HIDDEN_SIDEBAR.includes(pathname);
  const isHiddenBanner = HIDDEN_BANNER.includes(pathname);



  return (
    <>
      < LayoutHeader />
      {!isHiddenBanner && !isDynamicPage && <LayoutBanner />}
      {!isHiddenNavigation && !isDynamicPage && <LayoutNavigation />}
      <div style={{ height: "500px", display: "flex" }}>
      {!isHiddenSidebar && !isDynamicPage && <LayoutSidebar/>}
       
        <div style={{ width: "70%" }}>{children}</div>
      </div>
      {!isDynamicPage && <LayoutFooter />}
    </>
  );
}
