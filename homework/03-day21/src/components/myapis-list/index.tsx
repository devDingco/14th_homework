"use client"

import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.css"
import useOpenapisPage from "@/components/myapis-list/hook";

export default function OpenapisPage (){

    const {
        onClickAdd,
        onClickMyBoard,
        boards,
        thumbs,
        setPage,
    } = useOpenapisPage()
    
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
