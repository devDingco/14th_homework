"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

import styles from './styles.module.css'
import Image from 'next/image';
import {ChangeEvent} from 'react';
import useBoardWrite from './hook'
import { IBoardWriteProps } from './types';



export default function BoardsWrite(props:IBoardWriteProps) {
  const {
    onChangeInputs,
    onClickMoveList,
    // onChangeContents,
    onChangePassword,
    // onChangeTitle,
    // onChangeWriter,
    validation,
    onClickSubmit,
    onClickUpdate,
    isActive,
    errorContents,
    errorPassword,
    errorTitle,
    errorWriter,
    zipcode,
    address,
    isModalOpen,
    onToggleModal,
    handleComplete,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
  } = useBoardWrite(props)

  
  
  return (  <div className={styles.container}>
      <header>
          <h1>게시물{props.isEdit ? "수정" : "등록"}</h1>
      </header>
      <main>
          <section className={styles.메인__작성자비밀번호섹션}>
              <section className={styles.메인__작성자비밀번호섹션__작성자섹션}>
                  <h2>작성자<img
                          src={"/images/별표.png"}
                          alt="별표"
                        /></h2>
                  <input onChange={onChangeInputs} id={"writer"} disabled={!!props.data}  type="text" placeholder="작성자 명을 입력해주세요" defaultValue={props.data?.fetchBoard?.writer ?? ""}/>
                  <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorWriter}</div>
              </section>
              <section className={styles.메인__작성자비밀번호섹션__비밀번호섹션}>
                  <h2>비밀번호<img
                          src={"/images/별표.png"}
                          alt="별표"
                        /></h2>
                  <input onChange={onChangePassword} id={"password"} disabled={!!props.data} type="password" placeholder="비밀번호를 입력해주세요"/>
                  <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorPassword}</div>
              </section>
          </section>
          <hr/>
          <section className={styles.메인__제목섹션}>
              <h2>제목<img
                      src={"/images/별표.png"}
                      alt="별표"
                      width={8}
                      height={8}
                    /></h2>
              <input onChange={onChangeInputs} id={"title"} type="text" placeholder="제목 입력해주세요" defaultValue={props.data?.fetchBoard?.title ?? ""}/>
              <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorTitle}</div>
          </section>
          <hr/>
          <section className={styles.메인__내용섹션}>
              <h2>내용<img
                      src={"/images/별표.png"}
                      alt="별표"
                      width={8}
                      height={8}
                    /></h2>
              <input onChange={onChangeInputs} id={"contents"} type="text" placeholder="내용을 입력해주세요" defaultValue={props.data?.fetchBoard?.contents ?? ""}/>
              <div className={`${styles['color-red']} ${styles['Font-h2']}`}>{errorContents}</div>
          </section>
          <section className={styles.메인__주소섹션}>
              <article className={styles.메인__주소섹션__상단아티클}>
                  <h2>주소</h2>
                  <div className={styles.메인__주소섹션__상단아티클__내용}>
                      <input readOnly value={zipcode || props.data?.fetchBoard?.boardAddress?.zipcode || ""} type="text" disabled/>
                       <button onClick={onToggleModal} >우편번호 검색</button>
    
      {isModalOpen === true && (
        <Modal
          title="우편번호 & 주소찾기"
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal}
        >
          <DaumPostcodeEmbed onComplete={handleComplete}/>
        </Modal>
      )}
                  </div>
              </article>
              <input readOnly type="text" placeholder="주소를 입력해주세요" value={address || props.data?.fetchBoard?.boardAddress?.address || ""} />
              <input onChange={onChangeAddressDetail} type="text" placeholder="상세주소를 입력해주세요" defaultValue={props.data?.fetchBoard?.boardAddress?.addressDetail ?? ""}/>
          </section>
          <hr/>
          <section className={styles.메인__유튜브링크섹션}>
              <h2>유튜브링크</h2>
              <input onChange={onChangeYoutubeUrl} type="text" placeholder="링크를 입력해주세요" defaultValue={props.data?.fetchBoard?.youtubeUrl ?? ""}/>
          </section>
          <hr/>
          <section className={styles.메인__사진첨부섹션}>
              <h2>사진첨부</h2>
              <article className={styles.메인__사진첨부섹션__아티클}>
                  <button><Image
                          src={"/images/사진업로드.png"}
                          alt="사진업로드"
                          width={200}
                          height={200}
                        /></button>
                  <button><Image
                          src={"/images/사진업로드.png"}
                          alt="사진업로드"
                          width={200}
                          height={200}
                        /></button>
                  <button><Image
                          src={"/images/사진업로드.png"}
                          alt="사진업로드"
                          width={200}
                          height={200}
                        /></button>
              </article>
          </section>
          <section className={styles.메인__등록하기섹션}>
              <button onClick={onClickMoveList} className={styles.메인__등록하기섹션__취소버튼}>취소</button>
              <button className={isActive === true ? styles.메인__등록하기섹션__등록하기버튼__액티브 : styles.메인__등록하기섹션__등록하기버튼__낫액티브} onClick={() => {
    validation();
    props.isEdit ? onClickUpdate() : onClickSubmit();
  }}>{props.isEdit ? "수정하기" : "등록하기"}</button>
          </section>

      </main>
   </div>
      
  );
}
