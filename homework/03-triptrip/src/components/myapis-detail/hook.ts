"use client";

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/commons/libraries/supabase'
import type { MyBoardRow } from '@/components/myapis-write/types'

export default function useMyBoardsDetail() { 
    const router = useRouter()
    const { boardId } = useParams()
    const [row, setRow] = useState<MyBoardRow | null>(null)
    const [tags, setTags] = useState<string[]>([]); // ← 태그 상태 추가

    useEffect(() => {
        const load = async () => {
            if (!boardId) return
            const { data, error } = await supabase
                .from('myboard')
                .select('id,title,contents,images,address,address_detail,created_at,tags')
                .eq('id', String(boardId))
                .single()
            if (error) {
                console.error(error)
                return
            }
            setRow(data as MyBoardRow)

            // tags를 문자열 배열로 변환
            if (data?.tags) {
                try {
                    const parsedTags = Array.isArray(data.tags) 
                        ? data.tags 
                        : JSON.parse(data.tags)
                    setTags(parsedTags)
                } catch {
                    setTags([]);
                }
            }
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
        tags,    
    }
}

