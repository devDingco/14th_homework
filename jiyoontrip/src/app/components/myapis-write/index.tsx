"use client";

import { supabase } from "@/app/commons/libraries/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function MyApisWrite({ isEdit }) {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (isEdit && postId) {
        const { data, error } = await supabase
          .from("jiyoon")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) {
          alert("실패");
        } else if (data) {
          setTitle(data.title);
          setContents(data.contents);
        }
      }
    };
    fetchPost();
  }, [isEdit, postId]);

  const onClickSubmit = async () => {
    try {
      if (title !== "" && contents !== "") {
        const { data, error } = await supabase
          .from("jiyoon")
          .insert([
            {
              title,
              contents,
              created_at: new Date().toISOString(),
            },
          ])
          .select();
        if (error) {
          alert(error);
        } else {
          alert("성공");
          const newId = data[0].id;
          router.push(`/myapis/${newId}`);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  const onClickEdit = async () => {
    await supabase.from("jiyoon").update({ title, contents }).eq("id", postId).select();
    router.push(`/myapis/${postId}`);
  };

  return (
    <>
      <div>
        제목:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        내용:
        <input
          type="text"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button onClick={isEdit ? onClickEdit : onClickSubmit}>
          {isEdit ? "수정" : "제출"}
        </button>
      </div>
    </>
  );
}
