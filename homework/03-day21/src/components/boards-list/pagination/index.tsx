"use client"

import { gql, useQuery } from "@apollo/client"
import { useState } from "react"
import styles from "./styles.module.css"

import Image from "next/image"
import leftArrow from "@assets/left_arrow.svg"
import rightArrow from "@assets/right_arrow.svg"
import usePagination from "./hook"

const IMAGE_SRC = {
    leftArrow: { src: leftArrow, alt: "왼쪽화살표"},
    rightArrow: { src: rightArrow, alt: "오른쪽화살표"},    
}

interface PaginationProps {
    startPage: number
    lastPage: number
    onClickPage: (page: number) => void
    onClickPrevPage: () => void
    onClickNextPage: () => void
  }

export default function Pagination(props){
    const {
        startPage,
        lastPage,
        onClickPrevPage,
        onClickNextPage,
        onClickPage,

    } = usePagination(props)
    
    return (
        <div className={styles.paginationContainer}>
            <button onClick={onClickPrevPage}>
                <Image
                    src={IMAGE_SRC.leftArrow.src}
                    alt={IMAGE_SRC.leftArrow.alt}
                    className={`${styles.arrowIcon} ${startPage === 1 ? styles.disabled : ""}`}
                />
            </button>
            {new Array(10).fill(1).map(
                (_, index) => 
                    index + startPage <= props.lastPage && (
                        <button 
                        key={index + startPage} 
                        id={String(index + startPage)} 
                        onClick={() => onClickPage(page)}
                        className={styles.paginationNumber}
                    >
                        {index + startPage}
                    </button>
                    )                
            )}
            <button onClick={onClickNextPage}>
                <Image
                    src={IMAGE_SRC.rightArrow.src}
                    alt={IMAGE_SRC.rightArrow.alt}
                    className={`${styles.arrowIcon} ${startPage + 10 > lastPage ? styles.disabled : ""}`}
                />
            </button>
        </div>
    )
}