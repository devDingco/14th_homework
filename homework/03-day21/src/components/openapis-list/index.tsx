"use client"

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.css"

export default function OpenapisPage (){
    const [images, setImages] = useState<string[]>([])
    const [page, setPage] = useState(1)

    const fetchImages = async () => {      
        const UNSPLASH_ACCESS_KEY = "OtoumUusMZDmyc-W6HM2U4JE36sXxFc6Cy7K5iMeeF4"; 

        const response = await fetch(
        `https://api.unsplash.com/photos/random?query=wallpaper&count=15&client_id=${UNSPLASH_ACCESS_KEY}` // 수정됨
        );
        const data: Array<{ urls: { regular: string } }> = await response.json(); // 수정됨: Unsplash response 구조

        const newImages = data.map((img) => img.urls.regular); // 수정됨: 이미지 URL 가져오기
        setImages((prev) => [...prev, ...newImages]);                 
    }

    useEffect(() =>{
        fetchImages()
    }, [page]) 

    return (        
        <InfiniteScroll
            dataLength={images.length}
            next={() => setPage((prev) => prev + 1)}
            hasMore={true}
            loader={<p className={styles.loader}>Loading...</p>}
        >
            <div className={styles.imageGrid}>
            {images.map((src, idx) => (
                <img
                    key={idx}
                    src={src}
                    alt={`picsum-nature-${idx}`}
                    className={styles.imageItem}
                />
            ))}

            </div >       

        </InfiniteScroll>

    )
}
