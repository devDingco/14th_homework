"use client"

import { gql } from "@apollo/client"
import BoardCommentWrite from "../comment-write"
import styles from "./style.module.css"
import { Rate } from "antd"
import { IFetchBoardComments } from "./types"
import { useState } from "react"


interface IProps {
    el: IFetchBoardComments["fetchBoardComments"][0]
}

export default function BoardCommentListItem({ el }: IProps) {
    const [isEdit, setIsEdit] = useState(false)

    const onClickEdit = () => {
        setIsEdit(true)
    }

    return isEdit ? (
        // ✅ 수정 모드일 때 → 댓글 작성 컴포넌트 불러오기
        <BoardCommentWrite isEdit={true} el={el} onCompleted={() => setIsEdit(false)} />
    ) : (
        <div 
            key={el._id} 
            id={el._id}
            className={styles.container}
        >
            <div className={styles.detailMetadataContainer}>
                <div className={styles.detailRowFlex}>
                    <div className={styles.detailMetadataProfile}>
                        <img src="/images/userprofile_default.png" alt="프로필"/>
                        <div>{el.writer}</div>
                    </div>

                    <div className={styles.starGroup}>
                        <Rate value={el.rating} disabled />

                    </div>

                    </div>
                    
                    <div className={styles.detailMetadataIconContainer}>
                        <img 
                            src="/images/edit.png"
                            alt="수정아이콘" 
                            onClick={onClickEdit}
                            className={styles.editIcon}
                        />
                        <img 
                            src="/images/close.png" 
                            alt="삭제아이콘" 
                            className={styles.deleteIcon}
                            />
                </div>
            </div>

            <p className={styles.commentContent}>{el.contents}</p>
            <p className={styles.commentDate}>{new Date(el.createdAt).toLocaleDateString("ko-KR")}</p>

            <hr className={styles.detailBorder}/>

        </div>
    )
       
    
}