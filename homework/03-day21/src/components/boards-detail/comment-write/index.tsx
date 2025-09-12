"use client"

import styles from "./style.module.css"
import useBoardCommentWrite from "./hook";
import Image from "next/image";
import { Rate } from "antd";

export default function BoardCommentWrite() {
    const {
        writer,
        password,
        contents,
        rating,
        inputError,
        isActive,
        onChangeWriter,
        onChangePassword,
        onChangeContent,
        onClickSubmit,
        onChangeRating,
    } = useBoardCommentWrite()

    return (
        <div className={styles.container}>
            <hr className={styles.enrollBorder} />
            
            {/* 댓글영역 타이틀 */}
            <div className={styles.titleContainer}>
                <img src="/images/comment.png" alt="댓글아이콘"/>
                <div className={styles.enrollSubjectText}>댓글</div>
            </div>

            {/* 별점 */}
            <div className={styles.starGroup}>
                <Rate onChange={onChangeRating} value={rating} />
            </div>

            {/* <div className={styles.starGroup}>
                {[1, 2, 3, 4, 5].map((star)=>
                <img
                key={star}
                src={star <= rating ? StarActive : StarDisabled}
                alt={`${star}점 별`}
                onClick={() => onClickStar(star)}
                className={styles.starImage}
                />      
                )}                    
            </div> */}

            {/* 댓글입력창 */}
            <div className={styles.enrollContainer}>
                <div className={styles.enrollRowFlex}>
                    <div className={styles.flexHalf}>
                        <div className={styles.enrollFormTitle}>
                            <div>작성자</div>
                            <div className={styles.enrollRequiredIndicator}> *</div>
                        </div>
                        <input
                            className={styles.enrollInput}
                            type="text"
                            placeholder="작성자 명을 입력해 주세요."
                            value={writer} // 훅에서 온 상태값
                            onChange={onChangeWriter}
                        />
                        <div className={styles.inputErrorMessage}>{inputError}</div>
                    </div>
                
                    <div className={styles.flexHalf}>
                        <div className={styles.enrollFormTitle}>
                            <div>비밀번호</div>
                            <div className={styles.enrollRequiredIndicator}>*</div>
                        </div>
                        <input
                            className={styles.enrollInput}
                            type="password"
                            placeholder="비밀번호를 입력해 주세요."
                            value={password} // 훅에서 온 상태값
                            onChange={onChangePassword}
                        />
                        <div className={styles.inputErrorMessage}>{inputError}</div>
                    </div>
                </div>
                
                <div className={styles.flexHalf}>
                    <textarea
                        className={`${styles.enrollInput} ${styles.enrollTextarea}`}
                        placeholder="댓글을 입력해 주세요."
                        value={contents} // 훅에서 온 상태값
                        onChange={onChangeContent}
                    />
                    <div className={styles.inputErrorMessage}>{inputError}</div>
                </div>
                
                {/* 댓글 버튼 */}
                <div className={styles.enrollButtonContainer}>
                    <button className={styles.enrollCancelButton}>취소</button>
                    <button
                     className={`${styles.enrollSubmitButton} ${isActive ? styles.active : styles.disabled}`}
                     onClick={onClickSubmit} // 수정 모드 필요 없으니 Submit만
                     disabled={!isActive}
                    >
                    댓글등록
                    </button>
                </div>  
                
            </div>
        </div>


       
    );
}