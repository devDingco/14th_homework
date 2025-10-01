"use client"

import styles from "./styles.module.css"

import Image from "next/image"
import leftArrow from "@assets/left_arrow.svg"
import rightArrow from "@assets/right_arrow.svg"
import leftArrowDisabled from "@assets/leftArrowDisabled.svg"
import rightArrowDisabled from "@assets/rightArrowDisabled.svg"
import usePagination from "./hook"
import { IPaginationPageProps } from "./types"

const IMAGE_SRC = {
    leftArrow: { src: leftArrow, alt: "왼쪽화살표"},
    rightArrow: { src: rightArrow, alt: "오른쪽화살표"}, 
    leftArrowDisabled: { src: leftArrowDisabled, alt: "왼쪽화살표비활성"},
    rightArrowDisabled: { src: rightArrowDisabled, alt: "오른쪽화살표비활성"}   
}


export default function Pagination(props: IPaginationPageProps){
    const {
        startPage,
        lastPage,
        currentPage,
        onClickPrevPage,
        onClickNextPage,
        onClickPage,

    } = usePagination(props)
    
    return (
        <div className={styles.paginationContainer}>
            <button onClick={onClickPrevPage} disabled={startPage === 1}>
                <Image
                    src={startPage === 1 ? IMAGE_SRC.leftArrowDisabled.src : IMAGE_SRC.leftArrow.src}
                    alt={IMAGE_SRC.leftArrow.alt}
                    className={styles.arrowIcon}
                />
            </button>
            {new Array(5).fill(1).map(
                (_, index) => 
                    index + startPage <= lastPage && (
                        <button
                            key={index + startPage}
                            id={String(index + startPage)}
                            onClick={onClickPage}
                            className={
                                currentPage === index + startPage
                                    ? `${styles.paginationNumber} ${styles.active}`
                                    : styles.paginationNumber
                            }
                        >
                            {index + startPage}
                        </button>
                    )
                
            )}

            <button onClick={onClickNextPage} disabled={startPage + 10 > lastPage}>
                <Image
                    src={
                        startPage + 10 > lastPage
                          ? IMAGE_SRC.rightArrowDisabled.src
                          : IMAGE_SRC.rightArrow.src
                      }
                    alt={IMAGE_SRC.rightArrow.alt}
                    className={styles.arrowIcon}
                />
            </button>
        </div>
    )
}