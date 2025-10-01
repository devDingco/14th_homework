"use client"

import { supabase } from "@/commons/liblary";
import { useParams } from "next/navigation";
import { writer } from "node:repl";
import { useEffect, useState } from "react";

export default function MyApisDetail() {
    const { boardId } = useParams();
    console.log(boardId)
    const [date, setDate] = useState([]);
    const [edit, setEdit] = useState(false);

    const [inputs, setInputs] = useState({
        writer:"",
        title: "",
        content: ""
    })


    // useEffect(() => {
    //     (async () => {
    //       // 하드코딩된 id 테스트
    //       const { data, error } = await supabase
    //         .from("board")
    //         .select("*")
    //         .eq("id", boardId);

    //       console.log("supabase data:", data, "error:", error);
    //     })();
    //   });

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("board")
                .select("*")
                .eq("id", boardId);

            console.log("supabase data:", data, error);
            setDate(data ?? []);
        })();
    }, [boardId]);

    const onClickInputs = (event) => {
        setInputs({
            ...inputs, [event.target.id]: event.target.value
        })
       
    }

    const onClickEdit = async () => {
      // if we are saving
      if (edit) {
        console.log("등록할값 {}",inputs);

        const { data: updatedData, error } = await supabase
          .from("board")
          .update({
            writer: inputs.writer,
            title: inputs.title,
            content: inputs.content,
          })
          .eq("id", boardId)
          .select();
        console.log("update result:", updatedData, error);
      } else {
        // entering edit mode: prefill inputs with current values
        setInputs({
          writer: date[0]?.writer || "",
          title: date[0]?.title || "",
          content: date[0]?.content || "",
        });
      }
      setEdit((prev) => !prev);
    };

    return (

        <div>
            {!edit ?
                <div>
                    <div>{date[0]?.writer}</div>
                    <div>{date[0]?.title}</div>
                    <div>{date[0]?.content}</div>
                    <button onClick={onClickEdit}>수정하기</button>
                </div>
                :
                <div>
                    <input type="text" id="writer" value={inputs.writer} onChange={onClickInputs}></input>
                    <input type="text" id="title" value={inputs.title} onChange={onClickInputs} ></input>
                    <input type="text" id="content" value={inputs.content} onChange={onClickInputs}></input>
                    <button onClick={onClickEdit}>수정 저장</button>
                </div>
            }

        </div>
    )
}