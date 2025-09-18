"use client";
import LayoutBanner from "./banner";
import LayoutNavigation from "./navigation";
import { IProps } from "./type"



export default function Layout({ children }: IProps) {

  
  return (
    <>
      
      <LayoutNavigation />
      <LayoutBanner />
      <div>{children}</div>
      
      
    </>
  );
}
