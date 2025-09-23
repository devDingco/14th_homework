"use client";

import { supabase } from "@/commons/libraries/supabaseClient";

export default function SupabasePage() {
  // 등록하기
  const onClickSubmit = async () => {
    const { data, error } = await supabase.from("homeworkBoard").insert([
      {
        writer: "철수",
        title: "안녕하세요",
        content: "반갑습니다!!",
        password: 1234,
      },
    ]);

    if (error) {
      console.error("등록 에러:", error.message);
    } else {
      console.log("등록 성공:", data);
    }
  };

  // 조회하기
  const onClickFetch = async () => {
    const { data, error } = await supabase.from("homeworkBoard").select("*");

    if (error) {
      console.error("조회 에러:", error.message);
    } else {
      console.log("조회 결과:", data);
    }
  };

  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
}
