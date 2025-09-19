"use client";

import React from "react";
import styles from "./styles.module.css";
import useBoardsWrite from "./hook";
import { IBoardWriteProps } from "./types";
import DaumPostcodeEmbed from 'react-daum-postcode'
import { Modal } from 'antd';
import YoutubeUrl from "./youtubeUrl";

export default function BoardsWrite(props: IBoardWriteProps) {
    
    if (props.isEdit && !props.data) return null;

    const {
        password,
        inputs,
        zipcode,
        address,
        addressDetail,
        youtubeUrl,
        inputError,
        isActive,
        isModalOpen,
        onToggleModal,
        handleComplete,
        onChangePassword,
        onChangeInputs,
        onChangeZipcode,
        onChangeAddress,
        onChangeAddressDetail,
        onChangeYoutubeUrl,
        onClickSubmit,
        onClickUpdate,
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
                id="writer"
                className={styles.enrollInput}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                value={inputs.writer}
                onChange={onChangeInputs}
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
                id="title"
                className={styles.enrollInput}
                placeholder="제목을 입력해 주세요."
                value={inputs.title} 
                onChange={onChangeInputs}
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
                id="contents"
                className={`${styles.enrollInput} ${styles.enrollTextarea}`}
                placeholder="내용을 입력해 주세요."
                value={inputs.contents}
                onChange={onChangeInputs}
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
        </div>

        <hr className={styles.enrollBorder} />

        {/* 우편번호 검색 */}
        <div className={styles.enrollRowSection}>
            <div className={styles.enrollFormTitle}>
            <div>주소</div>
            </div>
            <div className={styles.enrollAddressFirstrow}>
            <input 
                onChange={onChangeZipcode} 
                className={styles.zipcodeInput} 
                type="text" 
                placeholder="01234" 
                value={zipcode}
            />
            <button 
                onClick={onToggleModal} 
                className={styles.zipcodeSearchButton}
            >
                우편번호 검색
            </button>

            {isModalOpen && (
                <Modal
                title="주소 검색"        
                open={isModalOpen}
                onOk={onToggleModal}
                onCancel={onToggleModal}
                >
                <DaumPostcodeEmbed onComplete={handleComplete} />
                </Modal>
        
            )}     

            </div>
            <input 
                onChange={onChangeAddress} 
                className={styles.enrollInput} 
                type="text" 
                placeholder="주소를 입력해 주세요." 
                value={address}
            />
            <input 
                onChange={onChangeAddressDetail} 
                className={styles.enrollInput} 
                type="text"
                placeholder="상세주소"
                value={addressDetail}
            />
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
            <div>유튜브 링크</div>
            </div>
            <YoutubeUrl 
            value={youtubeUrl} 
            onChange={onChangeYoutubeUrl} 
            className={styles.enrollInput} 
            />
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
            disabled={!isActive}
            >
            {props.isEdit ? "수정" : "등록"}하기
            </button>
        </div>
        </div>
    </div>
    );
  
}
