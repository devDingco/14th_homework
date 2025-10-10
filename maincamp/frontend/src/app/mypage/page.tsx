"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default withAuth(function MyPagePage({ isAuth }: { isAuth?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (isAuth === false) {
      console.log(isAuth);
      Modal.error({
        title: "해당 페이지에 접속 권한이 없습니다.",
        content: "로그인 후 이용해주세요.",
      });
      router.push("/login");
    }
  }, [isAuth, router]);

  if (isAuth === false) return null;

  return <h1>마이페이지 입니다... 구현 예정 ... </h1>;
});
