"use client"

import { useState } from "react";

export default function usePagination(props){
    const [startPage, setStartPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);

     // 페이지네이션 핸들러
     const onClickPage = (event) => {
        const page = Number(event.target.id)
        setCurrentPage(page);    
        props.refetch({ page });   
    }

    
    const onClickPrevPage = () => {
        if(startPage === 1) return;
    
        setStartPage(startPage -10)
        setCurrentPage(startPage - 10)
        props.refetch({page: startPage - 10}) // early-exit     
    }
    
    const onClickNextPage = () => {
        if(startPage + 10  <= props.lastPage){
            setStartPage(startPage + 10)
            setCurrentPage(startPage + 10)
            props.refetch({page: startPage + 10})
        }
    }
    return{
        startPage,
        currentPage,
        lastPage: props.lastPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage
    }
    
}


