"use client";

import { FETCH_USER_LOGGED_IN } from "@/graphql/queries/login";
import { useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function MyPagePage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      Modal.error({
        title: "해당 페이지에 접속 권한이 없습니다.",
        content: "로그인 후 이용해주세요.",
      });

      router.push("/login");
    }
  }, []);

  return <h1>마이페이지 입니다... 구현 예정 ... </h1>;
}
