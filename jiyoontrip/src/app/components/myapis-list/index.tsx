"use client";

import styles from "./styles.module.css";
import { MouseEvent, useEffect, useState } from "react";
import { supabase } from "@/app/commons/libraries/supabaseClient";
import { useRouter } from "next/navigation";
export default function MyApisList() {
  //   useEffect(() => {
  //     const checkConnection = async () => {
  //       const { data, error } = await supabase.from("jiyoon").select("*").limit(1);

  //       if (error) {
  //         console.error("❌ Supabase 연결 실패:", error.message);
  //       } else {
  //         console.log("✅ Supabase 연결 성공:", data);
  //       }
  //     };

  //     checkConnection();
  //   }, []);
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);

  const fetchRows = async () => {
    const { data, error } = await supabase
      .from("jiyoon")
      .select("*")
      .order("id", { ascending: false });
    if (!error && data) {
      setRows(data);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const onClickDelete = async (event: MouseEvent, id: string) => {
    event.stopPropagation();
    const { error } = await supabase.from("jiyoon").delete().eq("id", id);
    if (error) {
      alert("삭제실패");
    } else {
      alert("삭제성공");
      fetchRows();
    }
  };

  const onClickDetail = (event: MouseEvent<HTMLElement>) => {
    router.push(`/myapis/${event?.currentTarget.id}`);
  };

  return (
    <>
      <div>
        <div className={styles.rowTitle}>
          <span>번호</span>
          <span>제목</span>
          <span>내용</span>
        </div>
        {rows.map((el, index) => (
          <div className={styles.list} key={el.id} id={el.id} onClick={onClickDetail}>
            <span>{index + 1}</span>
            <span>{el.title}</span>
            <span>{el.contents}</span>
            <button onClick={(event) => onClickDelete(event, el.id)}>삭제</button>
          </div>
        ))}
      </div>
    </>
  );
}
