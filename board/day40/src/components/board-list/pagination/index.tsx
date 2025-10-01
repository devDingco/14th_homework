"use client"

import { gql, useQuery } from "@apollo/client"
import { useState } from "react"
import style from "./style.module.css"
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./queries"
import { start } from "repl"
import usePagination from "./hooks"



export default function Pagination(props){
    

    const {        startPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage,
        eventButton} = usePagination(props)



    return(
        <div className={style.paginationPage}>
            {/* {data?.fetchBoards.map((el) => (
                
                <div key={el._id}>
                    <span>{el._id}</span>
                    <span>{el.writer}</span>
                    <span>{el.title}</span>
                </div>
            ))} */}
            <button onClick={onClickPrevPage} className={style.prevButton}>이전</button>
            <div className={style.pagination}>
            {new Array(5).fill("아무거나").map((el, index)=> {
                if(index + startPage <= props.lastPage){
                    return(
                <button key={index + startPage} onClick={onClickPage} id={String(index + startPage)} className={`${style.paginationButton} ${eventButton === index + startPage ? style.eventButton : ""}`}  >{index + startPage}</button>
            )}else{
                    return``
                }
                 
})}
            </div>

            <button onClick={onClickNextPage} className={style.nextButton}>다음</button>
        </div>

    )
}