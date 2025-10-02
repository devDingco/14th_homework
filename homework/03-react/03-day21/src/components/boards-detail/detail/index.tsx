"use client";

import React from 'react';
import styles from "./styles.module.css";
import useBoardsDetail from './hook';
import YoutubePreview from './YoutubePreview';

import { Tooltip } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'


export default function BoardsDetail () { 
    const {
        data,
        onClickMove,
        onClickMoveList,
        address,
    } = useBoardsDetail()

    return(
        <div className={styles.layout}>
            <div className={styles.container}>
                {/* 제목 자리 */}
                <div className={styles.detailSubjectText}>
                    {data?.fetchBoard?.title ?? "제목을 불러오는 중..."}
                </div>

                <div className={styles.detailMetadataContainer}>
                    <div className={styles.detailRowFlex}>
                        <div className={styles.detailMetadataProfile}>
                            <img src="/images/userprofile_default.png" alt="프로필"/>
                            {/* 작성자 자리 */}
                            <div>{data?.fetchBoard?.writer ?? "작성자 불러오는 중..."}</div>
                        </div>
                        <div className={styles.detailMetadataDate}>{new Date(data?.fetchBoard?.createdAt).toLocaleDateString("ko-KR")}</div>
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

                <img className={styles.detailContentContainer}/>
                    {(data?.fetchBoard?.images as string[] | undefined)?.map((url, idx) =>
                        url ? (
                            <img 
                                key={idx}
                                src={`https://storage.googleapis.com/${url}`}
                                alt={`첨부이미지 ${idx}`}
                                className={styles.detailContentImage} 
                            />
                        ) : null                        
                    )}
                    
                {/* 내용 자리 */}        
                <div className={styles.detailContentText}>
                    {data?.fetchBoard?.contents ?? "내용을 불러오는 중..."}

                </div>

                {/* {data?.fetchBoard?.youtubeUrl ? (
                <iframe
                    width="640"
                    height="390"
                    src={`https://www.youtube.com/embed/${data.fetchBoard.youtubeUrl.split("v=")[1]}`}
                    frameBorder="0"
                    allowFullScreen
                />
                ) : (
                    null // ✅ 아무것도 안 보이게
                )} */}

                <YoutubePreview url={data?.fetchBoard?.youtubeUrl} />


                <div className={styles.detailContentGoodOrBad}>
                    <div className={styles.detailBadContainer}>
                        {/* <img src="/images/bad.png" alt="싫어요"/> */}
                        <LikeOutlined />
                        <div>24</div>
                    </div>
                    <div className={styles.detailGoodContainer}>
                        {/* <img src="/images/good.png" alt="좋아요"/> */}
                        <DislikeOutlined color="#F66A6A" />
                        <div>12</div>
                    </div>
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
