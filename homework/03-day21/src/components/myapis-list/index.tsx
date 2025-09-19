"use client"

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.css"
import { supabase } from "@/commons/libraries/supabase";
import { useRouter } from "next/navigation";

export default function OpenapisPage (){
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

    return (   
        <div>  
            <button className={styles.addButton} onClick={onClickAdd}>
                <img className={styles.addIconImage} src="/images/add_white.svg" alt="추가아이콘"/>
            </button>   

            <InfiniteScroll
                dataLength={boards.length}
                next={() => setPage((prev) => prev + 1)}
                hasMore={true}
                loader={<p className={styles.loader}>Loading...</p>}
            >
                <div className={styles.imageGrid}>
                {boards.map((board, idx: number) => {
                    const thumbnail = board.images?.[0] || thumbs[idx] || "/images/post_image.png"
                    return (
                        <div 
                            key={board._id} 
                            className={styles.imageItemWrapper}
                            onClick={() => onClickMyBoard(board._id)}
                        >
                            <img
                                src={thumbnail}
                                alt={board.title}
                                className={styles.imageItem}
                            /> 

                             {/* 호버 오버레이 */}
                            <div className={styles.imageOverlay}>
                                <div className={styles.overlayTop}>
                                    <img src="/images/location_w.svg" alt="위치아이콘" className={styles.locationIcon} />
                                    <span>{board.address || "..."}</span>
                                </div>
                                <div className={styles.overlayBottom}>
                                    <span>{board.title}</span>
                                </div>
                            </div>                      
                        </div>
                    )
                })}

                </div >       

            </InfiniteScroll>

        </div>

    )
}
