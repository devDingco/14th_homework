"use client"

import useListPagination from './hook'
import styles from './styles.module.css'
import { useEffect } from 'react'

interface IListPagination {
    boardsCount : number | undefined,
    lastPage: number,
    boardsRefetch: Function | undefined
}

const ListPagination = (props: IListPagination) => {
    
    const { pageState, onClickPage, onClickNextPage, onClickPrevPage } = useListPagination({boardsRefetch: props.boardsRefetch, lastPage: props.lastPage})

    useEffect(()=>{
        console.log('선택: ', pageState.selected, 'startPage: ', pageState.startPage)
    },[pageState])

    return (
        <div className={`${styles.pagination} flex_row flex_justi_center`}>
            <img src="/svg/left_arrow.png" onClick={onClickPrevPage} style={{ cursor: "pointer" }}/>
                <ul className={`${styles.pageList} flex_row`}>
                    {new Array(10).fill("_").map((_, i) => 
                        i + pageState.startPage <= props.lastPage && (
                            pageState.selected === i + pageState.startPage
                            ? <li key={i+pageState.startPage} data-key={String(i+pageState.startPage)} onClick={onClickPage} className={`${styles.selected_li}`}><button className={`${styles.selected_btn} r_16_24`} style={{ color: "rgba(0, 0, 0, 1);" }}>{i + pageState.startPage}</button></li>
                            : <li key={i+pageState.startPage} data-key={String(i+pageState.startPage)} onClick={onClickPage}><button className='r_16_24' style={{ color: "rgba(119, 119, 119, 1);" }}>{i + pageState.startPage}</button></li>
                        )
                    )}
                </ul>
            <img src="/svg/right_arrow.png" onClick={onClickNextPage} style={{ cursor: "pointer" }}/>
        </div>
    )
}

export default ListPagination