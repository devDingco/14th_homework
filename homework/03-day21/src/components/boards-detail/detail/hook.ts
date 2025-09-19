"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { MyBoardRow } from "@/components/myapis-write/types";
import { supabase } from '@/commons/libraries/supabase';


export default function useBoardsDetail() { 
    const router = useRouter()
    const { boardId } = useParams()
    const [data, setData] = useState<MyBoardRow | null>(null);

    useEffect(() => {
        const load = async () => {
            if (!boardId) return;
            const { data, error } = await supabase
                .from("myboard")
                .select("id,title,contents,images,address,address_detail,created_at")
                .eq("id", String(boardId))
                .single();

            if (error) {
                console.error(error);
                return;
            }
            setData(data as MyBoardRow);
        };
        load();
    }, [boardId]);

    // 기존 GraphQL
    // const address = data?.fetchBoard?.boardAddress?.address ?? "주소 없음"

    // Supabase row 기준
    const address = data?.address ?? "주소 없음"


const onClickMove = () => {
    router.push(`/boards/${boardId}/edit`)
}

const onClickMoveList = () => {
    router.push('/boards')
}

    return{
        data,
        onClickMove,
        onClickMoveList,
        address,
    }
}

