"use client";

import React from 'react';
import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client"
import { useParams, useRouter } from 'next/navigation';

const FETCH_BOARD = gql `
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            user {
                _id
                email
                name
                picture
            }
            createdAt
            updatedAt
            deletedAt
        }
    
    }
`

const BoardsDetail = () => { 
    const router = useRouter()
    const { boardId } = useParams()
    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardId,
        },
    })

const onClickMove = () => {
    router.push(`/boards/${boardId}/edit`)
}

const onCickMoveList = () => {
    router.push('/boards')
}

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
                        <img src="/images/location_icon.png" alt="위치아이콘" />
                    </div>
                </div>

                <img className={styles.detailContentContainer} src="/images/post_image.png" alt="청산사진"/>

                {/* 내용 자리 */}        
                <div className={styles.detailContentText}>
                    {data?.fetchBoard?.contents ?? "내용을 불러오는 중..."}

                </div>

                <img className={styles.detailVideoPreview} src="/images/video.png" alt="비디오프리뷰"/>

                <div className={styles.detailContentGoodOrBad}>
                    <div className={styles.detailBadContainer}>
                        <img src="/images/bad.png" alt="싫어요"/>
                        <div>24</div>
                    </div>
                    <div className={styles.detailGoodContainer}>
                        <img src="/images/good.png" alt="좋아요"/>
                        <div>12</div>
                    </div>
                </div>

                <div className={styles.detailButtonContainer}>
                    <button className={styles.detailButton}>
                        <img src="/images/list_icon.png" alt="목록아이콘"/>
                        <div onClick={onCickMoveList}>목록으로</div>
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

export default BoardsDetail;
