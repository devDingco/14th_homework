"use client";

import React from 'react';
import styles from "./styles.module.css";
import useMyBoardsDetail from './hook';
import { Tooltip } from 'antd';


export default function MyBoardsDetail () { 
    const {
        data,
        address,
        onClickMove,
        onClickMoveList,
     } = useMyBoardsDetail()

    return(
        <div className={styles.layout}>
            <div className={styles.container}>
                {/* 제목 자리 */}
                <div className={styles.detailSubjectText}>
                    {data?.title ?? "제목을 불러오는 중..."}
                </div>

                <div className={styles.detailMetadataContainer}>
                    <div className={styles.detailRowFlex}>
                        <div className={styles.detailMetadataDate}>{new Date(data?.created_at).toLocaleDateString("ko-KR")}</div>
                    </div>
                    <hr className={styles.detailBorder}/>
                    <div className={styles.detailMetadataIconContainer}>
                        <img src="/images/link_icon.png" alt="링크아이콘" />

                        {/* 주소 아이콘→ hover 시 툴팁 */}
                        <Tooltip 
                            placement="bottomRight" 
                            title={address} 
                            arrow={false}
                            overlayClassName="addressTooltip">
                            <img src="/images/location_icon.png" alt="위치아이콘" />
                        </Tooltip>
                    </div>

                </div>

                {data?.images ? (
                    <img 
                        className={styles.detailContentContainer} 
                        src={data.images} 
                        alt={data.title} 
                    />
                ) : (
                    <img 
                        className={styles.detailContentContainer} 
                        src="/images/post_image.png" 
                        alt="기본 이미지"
                    />
                )}

                {/* {(
                    data?.fetchBoard?.images && data.fetchBoard.images.length > 0
                ) ? (
                    <img className={styles.detailContentContainer} src={data.fetchBoard.images[0] as string} alt={data.fetchBoard.title} />
                ) : (
                    <img className={styles.detailContentContainer} src="/images/post_image.png" alt="기본 이미지"/>
                )} */}

                {/* 내용 자리 */}        
                <div className={styles.detailContentText}>
                    {data?.contents ?? "내용을 불러오는 중..."}

                </div>

                <div className={styles.detailButtonContainer}>
                    <button className={styles.detailButton}>
                        <img src="/images/list_icon.png" alt="목록아이콘"/>
                        <div onClick={onClickMoveList}>목록으로</div>
                    </button>
                    <button className={styles.detailButton}>
                        <img src="/images/edit_icon.png" alt="수정아이콘"/>
                        <div onClick={onClickMove}>수정하기</div>
                    </button>
                </div>                 
            </div>
        </div>
    )
}
