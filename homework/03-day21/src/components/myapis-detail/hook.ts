"use client";

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/commons/libraries/supabase'
import type { MyBoardRow } from '@/components/myapis-write/types'

export default function useMyBoardsDetail() { 
    const router = useRouter()
    const { boardId } = useParams()
    const [row, setRow] = useState<MyBoardRow | null>(null)

    useEffect(() => {
        const load = async () => {
            if (!boardId) return
            const { data, error } = await supabase
                .from('myboard')
                .select('id,title,contents,images,address,address_detail,created_at')
                .eq('id', String(boardId))
                .single()
            if (error) {
                console.error(error)
                return
            }
            setRow(data as MyBoardRow)
        }
        load()
    }, [boardId])

    const address = row?.address ?? '주소 없음'

    const onClickMove = () => {
        router.push(`/openapis/${boardId}/edit`)
    }

    const onClickMoveList = () => {
        router.push('/openapis')
    }

    return{
        data: row,
        address,
        onClickMove,
        onClickMoveList,
    }
}

