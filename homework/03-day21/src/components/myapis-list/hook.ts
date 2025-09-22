"use client"

import { supabase } from "@/commons/libraries/supabase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useOpenapisPage (){
    const [thumbs, setThumbs] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [boards, setBoards] = useState<Array<{ _id: string; title: string; images: string[] }>>([])

    useEffect(() => {
        
        const load = async () => {
            const { data, error } = await supabase
                .from('myboard')
                .select('id,title,images, address, created_at')
                .order('id', { ascending: false })
                .range((page - 1) * 12, page * 12 - 1)
            if (error) {
                console.error(error)
                return
            }
            const adapted = (data ?? []).map((r) => ({
                _id: r.id,
                title: r.title,
                images: Array.isArray(r.images) ? r.images : (r.images ? [r.images] : []),
                address: r.address || "", // address 추가
            }))
            setBoards((prev) => [...prev, ...adapted])
        }
        load()
    }, [page])

    const fetchThumbs = async (count: number) => {      
        const UNSPLASH_ACCESS_KEY = "OtoumUusMZDmyc-W6HM2U4JE36sXxFc6Cy7K5iMeeF4"; 
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=wallpaper&count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const json: Array<{ urls: { regular: string } }> = await response.json();
        return json.map((img) => img.urls.regular);
    }

    useEffect(() =>{
        const load = async () => {
            const need = (boards?.length ?? 0) - thumbs.length
            if (need > 0) {
                const more = await fetchThumbs(need)
                setThumbs((prev) => [...prev, ...more])
            }
        }
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boards]) 

    const router = useRouter()
    const onClickMyBoard = async (boardId: string) => {
        await router.push(`/openapis/${boardId}`)
    } 

    const onClickAdd = () => {
        router.push("/openapis/new")
    }

    return {
        onClickAdd,
        onClickMyBoard,
        boards,
        thumbs,
        setPage,
    }

}