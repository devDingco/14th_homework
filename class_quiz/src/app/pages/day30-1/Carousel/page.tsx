"use client"

import { useState } from "react"

export default function Carousel(){
    const [page,setPage]=useState(0)
    const pages = [ 
        "/images/banner1.png",
        "/images/banner2.png",
        "/images/banner3.png"
    ]
    const changeNext = () => {
        if(page < pages.length-1){
            setPage(page+1)
        }
    }
    const changePrev = () => {
        if(page > 0){
            setPage(page-1)
        }
    }

    return(
        <>
        
        <img src={pages[page]}/>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <button onClick={changePrev}>이전</button>
        <button onClick={changeNext}>다음</button>

        </div>
        </>
        
        
    )
}