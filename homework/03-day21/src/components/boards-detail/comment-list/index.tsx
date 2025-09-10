"use client"

import useBoardCommentList from "./hook"
import styles from "./style.module.css"
import { IFetchBoardComments } from "./types"

export default function BoardCommentList() {

    const {
        data,
        rating,
        StarActive,
        StarDisabled,
        onClickStar,           
    } = useBoardCommentList()

    return (
        <div className={styles.layout}>
            {data?.fetchBoardComments?.map((el) => {
                return(
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
                                {[1, 2, 3, 4, 5].map((star)=>
                                <img
                                key={star}
                                src={star <= rating ? StarActive : StarDisabled}
                                alt={`${star}점 별`}
                                onClick={() => onClickStar(star)}
                                className={styles.starImage}
                                />      
                                )}                    
                            </div>

                            </div>
                            
                            <div className={styles.detailMetadataIconContainer}>
                                <img src="/images/edit.png" alt="수정아이콘" />
                                <img src="/images/close.png" alt="삭제아이콘" />
                        </div>
                    </div>

                    <p className={styles.commentContent}>{el.contents}</p>
                    <p className={styles.commentDate}>{new Date(el.createdAt).toLocaleDateString("ko-KR")}</p>

                    <hr className={styles.detailBorder}/>

                </div>
                )
            })}
        </div>
    )
}