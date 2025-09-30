"use client"

import { ChangeEvent, useState } from "react"
import styles from "./styles.module.css"
import useSearchBoardPage from "./hook"
import { ISearchBoardPageProps } from "./types"



export default function SearchBoardPage(props: ISearchBoardPageProps) {
  
    const { onChangeKeyword, onClickSearch, keyword , onClickSubmit} = useSearchBoardPage(props)


    return (
        <div className={styles.searchLayout}>
            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <img 
                        className={styles.iconHolder} 
                        src="/images/search.svg" 
                        alt="검색아이콘"
                    />
                    <input 
                        type="text" 
                        placeholder="제목을 검색해 주세요." 
                        onChange={onChangeKeyword}
                        className={styles.searchInput}
                    />   
                </div>
                <button 
                    className={styles.searchButton} 
                    onClick={onClickSearch}
                >
                    검색
                </button>            
            </div>

            <button className={styles.submitWrapper} onClick={onClickSubmit}>
            <img 
                className={styles.iconHolder}                 
                src="/images/submit.svg" 
                alt="등록아이콘"
            />
            트립토크 등록
            </button>

        </div>
    )
}