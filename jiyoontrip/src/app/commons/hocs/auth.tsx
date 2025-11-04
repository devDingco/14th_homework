"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withAuth = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return () => {
    const router = useRouter();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        alert("로그인 후 이용가능합니다!");
        router.push("/auth/signin");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
      <>
        <Component />
      </>
    );
  };
};
