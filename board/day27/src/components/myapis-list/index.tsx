
"use client"
import { supabase } from "@/commons/liblary";
import { DeleteOutlined } from "@ant-design/icons";
import { Component, useEffect, useState } from "react";

export default function MyApisListPage() {
    const [writer, setWriter] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [boards, setBoards] = useState<any[]>([]);

    // 화면 리스트 띄우기
    useEffect(() => {
        (async () => {
            const { data } = await supabase.from("board").select("*").is("deleted_at", null);
            setBoards(data ?? [])
        })()
    }, [])

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeContent = (event) => {
        setContent(event.target.value)
    }

    const onClickSubmit = async (event) => {
        const result = await supabase.from("board").insert({
            writer: writer,
            title: title,
            content: content
        })
        console.log(result)
        const { data } = await supabase.from("board").select("*").is("deleted_at", null);
        setBoards(data ?? [])

        setWriter("");
        setTitle("");
        setContent("");
    }

    const onClickDelete = async (event) => {
        console.log("id나와라: " + event.currentTarget.id)
        // supabase.from("board").delete("id", event.currentTarget.id)
        const { data, error } = await supabase.from("board").update({ deleted_at: new Date().toISOString() }).eq("id", event.currentTarget.id).select();
        console.log(data)
        console.log(error)
        // const { data } = await supabase.from("board").select("*").is("deleted_at", null);
        // setBoards(data ?? [])
    }


    return (

        <>
            <div>
                <div>
                    <div>
                        <input type="text" onChange={onChangeWriter} value={writer} />
                        <input type="text" onChange={onChangeTitle} value={title} />
                        <input type="text" onChange={onChangeContent} value={content} />

                    </div>
                    <button onClick={onClickSubmit}>
                        등록하기
                    </button>
                </div>
                <div>
                    <div>
                        <div >번호</div>
                        <div>제목</div>
                        <div>작성자</div>
                        <div>날짜</div>
                    </div>

                    {boards?.map((el, index) => {
                        return (
                            <a key={el.id} href={`myapis-detail/${el.id}`}  >
                                <span>{index + 1}</span>
                                <span>{el.title}</span>
                                <span>{el.writer}</span>
                                <span>{el.content}</span>
                                <span>{el.created_at.slice(0, 10).replaceAll("-", ".")}</span>
                                <span id={el.id} onClick={onClickDelete}>
                                    <DeleteOutlined />
                                </span>
                            </a>
                        )
                    })}
                </div>
            </div>

        </>
    )
}