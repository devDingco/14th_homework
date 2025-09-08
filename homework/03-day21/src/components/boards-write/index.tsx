"use client";

import React from "react";
import styles from "./styles.module.css";
import useBoardsWrite from "./hook";
import { IBoardWriteProps } from "./types";


export default function BoardsWrite(props: IBoardWriteProps) {
    const {
        onChangeWriter,
        onChangePassword,
        onChangeTitle,
        onChangeContent,
        onClickSubmit,
        onClickUpdate,
        inputError,
        isActive,
        password,
     } = useBoardsWrite({ isEdit: props.isEdit, data: props.data })

    return (
    <div className={styles.layout}>
        <div className={styles.container}>
        <div className={styles.enrollSubjectText}>게시물 {props.isEdit ? "수정" : "등록"}</div>

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
                defaultValue={props.data?.fetchBoard?.writer ?? ""} 
                onChange={onChangeWriter}
                disabled={props.isEdit} // 수정페이지면 입력불가
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
                value={props.isEdit ? "••••••••" : password}
                onChange={onChangePassword}
                disabled={props.isEdit} // 수정페이지면 입력불가
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
            </div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>제목</div>
            <div className={styles.enrollRequiredIndicator}>*</div>
            </div>
            <input
            className={styles.enrollInput}
            placeholder="제목을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.title}
            onChange={onChangeTitle}
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>내용</div>
            <div className={styles.enrollRequiredIndicator}>*</div>
            </div>
            <textarea
            className={`${styles.enrollInput} ${styles.enrollTextarea}`}
            placeholder="내용을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.contents}
            onChange={onChangeContent}
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.enrollRowSection}>
            <div className={styles.enrollFormTitle}>
            <div>주소</div>
            </div>
            <div className={styles.enrollAddressFirstrow}>
            <input className={styles.zipcodeInput} type="number" placeholder="01234" />
            <button className={styles.zipcodeSearchButton}>우편번호 검색</button>
            </div>
            <input className={styles.enrollInput} type="text" placeholder="주소를 입력해 주세요." />
            <input className={styles.enrollInput} type="text" placeholder="상세주소" />
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>유튜브 링크</div>
            </div>
            <input className={styles.enrollInput} type="text" placeholder="링크를 입력해 주세요." />
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>사진 첨부</div>
            </div>
            <div className={styles.pictureEnrollRow}>
            {[...Array(3)].map((_, idx) => (
                <div key={idx} className={styles.pictureEnrollButton}>
                <img className={styles.iconImage} src="/images/add_icon.png" alt="추가아이콘" />
                <div className={styles.pictureEnrollButtonText}>클릭해서 사진 업로드</div>
                </div>
            ))}
            </div>
        </div>

        <div className={styles.enrollButtonContainer}>
            <button className={styles.enrollCancelButton}>취소</button>
            <button
            className={`${styles.enrollSubmitButton} ${isActive ? styles.active : styles.disabled}`}
            onClick={props.isEdit ? onClickUpdate : onClickSubmit}
            >
            {props.isEdit ? "수정" : "등록"}하기
            </button>
        </div>
        </div>
    </div>
    );
  
}
