"use client";

import React from "react";
import styles from "./styles.module.css";
import { IBoardWriteProps } from "./types";
import useMyBoardWrite from "./hook";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function MyBoardWrite(props: IBoardWriteProps) {
   
    const {
        inputs,
        zipcode,
        address,
        addressDetail,
        selectedImageUrl,
        inputError,
        isActive,
        isModalOpen,
        onToggleModal,
        handleComplete,
        onChangeInputs,
        onChangeZipcode,
        onChangeAddress,
        onChangeAddressDetail,
        onClickPickRandomImage,
        onClickSubmit,
        onClickUpdate,
     } = useMyBoardWrite({ isEdit: props.isEdit, boardData: props.boardData })

    return (
        <div className={styles.layout}>
            <div className={styles.container} >
                <div className={styles.enrollSubjectText}>
                    나의 여정 {props.isEdit ? "수정" : "기록"}
                </div>

                <div className={styles.enrollContentArea}>
                    <div className={styles.flexHalf}>
                        {/* 사진 첨부 영역 */}                                        
                        <div className={styles.pictureEnrollButton} onClick={onClickPickRandomImage}>
                            {selectedImageUrl && (
                                <img className={styles.thumbnailImage} src={selectedImageUrl} alt="썸네일" />
                            )}
                            {!selectedImageUrl && (
                                <div className={styles.picturePlaceholder}>
                                    <img className={styles.placeholderIcon} src="/images/add_icon.png" alt="추가아이콘" />
                                    <div className={styles.pictureEnrollButtonText}>클릭해서 이미지 불러오기</div>
                                </div>
                            )}
                        </div>                            
                    </div>

                    {/* 인풋 영역 */}
                    <div className={styles.inputArea}>
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

                    </div>
                </div>
                    
                {/* 버튼 영역 */}
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