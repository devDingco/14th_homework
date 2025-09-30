"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

export const withAuth =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) return setIsAuth(false);
      if (token) return setIsAuth(true);
    }, []);

    return <Component {...props} isAuth={isAuth} />;
  };
