"use client";

import React from "react";
import styles from "./styles.module.css";
import useBoardsWrite from "./hook";
import { IBoardWriteProps } from "./types";
import DaumPostcodeEmbed from 'react-daum-postcode'
import { Modal } from 'antd';
import YoutubeUrl from "./youtubeUrl";
import { Controller } from "react-hook-form";

export default function BoardsWrite(props: IBoardWriteProps) {
    
    if (props.isEdit && !props.data) return null;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid }, 
        onSubmit,
        onUpdate,
        onToggleModal,
        handleComplete,
        isModalOpen,
        onClickImage,
        onChangeFile,
        onClickDeleteImage,
        imageUrls,
        fileRef,
        onCancel,
     } = useBoardsWrite({ isEdit: props.isEdit, data: props.data })

    return (
    <div className={styles.layout}>
        <div className={styles.container}>
            <div className={styles.enrollSubjectText}>게시물 {props.isEdit ? "수정" : "등록"}</div>   
            {/*  form 태그 + handleSubmit으로 감싸기 */}
            <form onSubmit={handleSubmit(props.isEdit ? onUpdate : onSubmit)}>
                {/* 작성자 */}
                <div className={styles.enrollRowFlex}>
                    <div className={styles.flexHalf}>
                    <div className={styles.enrollFormTitle}>
                        <div>작성자</div>
                        <div className={styles.enrollRequiredIndicator}>*</div>
                    </div>
                    <input
                        className={styles.enrollInput}
                        type="text"
                        placeholder="작성자 명을 입력해 주세요."
                        {...register("writer")} 
                        disabled={props.isEdit}
                    />
                    <div className={styles.inputErrorMessage}>{errors.writer?.message}</div> 
                    </div>

                    {/* 비밀번호 */}
                    <div className={styles.flexHalf}>
                    <div className={styles.enrollFormTitle}>
                        <div>비밀번호</div>
                        <div className={styles.enrollRequiredIndicator}>*</div>
                    </div>
                    <input
                        className={styles.enrollInput}
                        type="password"
                        placeholder={props.isEdit ? "••••••••" : "비밀번호를 입력해 주세요."}
                        {...(!props.isEdit ? register("password") : {})} // 수정일 땐 RHF 연결 안함
                        disabled={props.isEdit} // 수정 시 입력 불가
                    />
                    <div className={styles.inputErrorMessage}>{errors.password?.message}</div> 
                    </div>
                </div>

                <hr className={styles.enrollBorder} />  

                {/* 제목 */}
                <div className={styles.flexHalf}>
                    <div className={styles.enrollFormTitle}>
                    <div>제목</div>
                    <div className={styles.enrollRequiredIndicator}>*</div>
                    </div>
                    <input
                    className={styles.enrollInput}
                    placeholder="제목을 입력해 주세요."
                    {...register("title")}
                    />
                    <div className={styles.inputErrorMessage}>{errors.title?.message}</div> 
                </div>

                <hr className={styles.enrollBorder} />

                {/* 내용 */}
                <div className={styles.flexHalf}>
                    <div className={styles.enrollFormTitle}>
                    <div>내용</div>
                    <div className={styles.enrollRequiredIndicator}>*</div>
                    </div>
                    <textarea
                    className={`${styles.enrollInput} ${styles.enrollTextarea}`}
                    placeholder="내용을 입력해 주세요."
                    {...register("contents")} 
                    />
                    <div className={styles.inputErrorMessage}>{errors.contents?.message}</div> 
                </div>

                <hr className={styles.enrollBorder} />

                {/* 주소 */}
                <div className={styles.enrollRowSection}>
                    <div className={styles.enrollFormTitle}>
                    <div>주소</div>
                    </div>
                    <div className={styles.enrollAddressFirstrow}>
                    <input
                        className={styles.zipcodeInput}
                        type="text"
                        placeholder="01234"
                        {...register("zipcode")}
                    />
                    <button type="button" onClick={onToggleModal} className={styles.zipcodeSearchButton}>
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
                    className={styles.enrollInput}
                    type="text"
                    placeholder="주소를 입력해 주세요."
                    {...register("address")} 
                    />
                    <input
                    className={styles.enrollInput}
                    type="text"
                    placeholder="상세주소"
                    {...register("addressDetail")} 
                    />
                </div>

                <hr className={styles.enrollBorder} />

                <div className={styles.flexHalf}>
                    <div className={styles.enrollFormTitle}>
                    <div>유튜브 링크</div>
                    </div>
                    
                    <Controller
                    name="youtubeUrl"
                    control={control}   // useForm에서 destructuring 필요
                    render={({ field }) => (
                        <YoutubeUrl
                        value={field.value || ""}
                        onChange={field.onChange}
                        className={styles.enrollInput}
                        />
                    )}
                    />
                </div>

                <hr className={styles.enrollBorder} />            

                {/* 사진 첨부 */}
                <div className={styles.flexHalf}>
                    <div className={styles.enrollFormTitle}>
                    <div>사진 첨부</div>
                    </div>
                    <div className={styles.pictureEnrollRow}>
                    {[...Array(3)].map((_, idx) => (
                        <div key={idx} className={styles.pictureEnrollWrapper}>
                            <div 
                                className={styles.pictureEnrollButton}
                                onClick={() => onClickImage(idx)}
                            >
                                {imageUrls[idx] ? (
                                    <div className={styles.previewWrapper}>
                                        <img                         
                                            className={styles.previewImage}
                                            src={`https://storage.googleapis.com/${imageUrls[idx]!}`} 
                                            alt={`미리보기 ${idx}`}
                                        />

                                        {/* 삭제 버튼 */}
                                        <img
                                            className={styles.deleteButton}
                                            src="/images/close.svg"
                                            alt="삭제버튼"
                                            onClick={(e) => {
                                                e.stopPropagation(); // 이미지 클릭 시 파일창 열리는 이벤트 막기
                                                onClickDeleteImage(idx);
                                            }}
                                        /> 
                                    </div>

                                ):(
                                    <>
                                        <img 
                                            className={styles.iconImage} 
                                            src="/images/add_icon.png" 
                                            alt="추가아이콘" 
                                        />
                                        <div className={styles.pictureEnrollButtonText}>
                                            클릭해서 사진 업로드
                                        </div>  
                                    </>

                                )}     
                            </div>

                            <input 
                                style={{ display: "none" }} 
                                type="file" 
                                onChange={(event) => onChangeFile(event, idx)} 
                                ref={(el) => {(fileRef.current[idx] = el)}}
                                accept="image/jpeg, image/png" // 선택 자체가 안되게 막기
                            />     
                        </div>
                    ))}   
                    </div>
                </div>

                <div className={styles.enrollButtonContainer}>
                    <button 
                        type="button" 
                        className={styles.enrollCancelButton}
                        onClick={onCancel} 
                    >취소</button>
                    <button
                        type="submit"
                        className={`${styles.enrollSubmitButton} ${isValid || props.isEdit ? styles.active : styles.disabled}`}                    
                        disabled={!isValid}
                    >
                        {props.isEdit ? "수정" : "등록"}하기
                    </button>
                </div>
            </form>  
        </div>
    </div>
    );


     {/* <input
            id="title"
            className={styles.enrollInput}
            placeholder="제목을 입력해 주세요."
            value={inputs.title} 
            onChange={onChangeInputs}
        />
        <div className={styles.inputErrorMessage}>{inputError}</div>

        // register로 연결
        value={inputs.title} onChange={onChangeInputs} => {...register("writer")} 
        {inputError} => {errors.writer?.message} */}
  
}
