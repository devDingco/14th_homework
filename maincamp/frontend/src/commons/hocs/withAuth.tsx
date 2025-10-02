"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";
import { Modal } from "antd";

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

    const handleUnauthClick = (content: string) => {
      Modal.confirm({
        title: "로그인 후 이용할 수 있습니다.",
        content: content || "해당 기능은 로그인 후 이용할 수 있습니다.",
        okText: "로그인하기",
        cancelText: "창닫기",
        onOk() {
          router.push("/login");
        },
        onCancel() {},
      });
    };

    return <Component {...props} isAuth={isAuth} handleUnauthClick={handleUnauthClick} />;
  };
