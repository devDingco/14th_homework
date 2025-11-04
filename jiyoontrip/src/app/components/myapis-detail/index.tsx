"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from "@/app/commons/libraries/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyApisDetail() {
  const [row, setRow] = useState<any>(null);
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    const fetchRow = async () => {
      const { data, error } = await supabase
        .from("jiyoon")
        .select("*")
        .eq("id", params.id)
        .single();
      if (!error && data) setRow(data);
    };
    fetchRow();
  }, [params.id]);
  const onClickEdit = () => {
    router.push(`/myapis/${params.id}/edit`);
  };

  return (
    <>
      <div>
        <h1>제목:{row?.title}</h1>
        <span>내용:{row?.contents}</span>
        <br />
        <button onClick={onClickEdit}>수정하기</button>
      </div>
    </>
  );
}
