"use client"

import { useRef } from "react";
import useBoardsWrite from "./hooks";
import style from "./style.module.css";
import { Modal } from 'antd';
import DaumPostcodeEmbed from 'react-daum-postcode';


import { IBoardsWriteProps } from "./types";
import { ApolloClient } from "@apollo/client";

export default function BoardsWrite(props: IBoardsWriteProps) {
  const { isEdit } = props;
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleClickImage = (index: number) => {
    fileRefs.current[index]?.click();
  };

  const {
    onChangeInputs,
    // onChangeEmail,
    // onChangeTitle,
    onChangePassword,
    // onChangeContent, 
    onClickUpdate,
    onClickSignUp,
    emailError,
    passwordError,
    titleError,
    contentError,
    isActive,
    onToggleModal,
    isModalOpen,
    zonecode,
    address,
    detailAddress,
    onChangeDetailaddress,
    onChangeYoutube,
    onClickImage,
    fileRef,
    onChangeFile,
    imageUrl,
    onDeleteImage


  } = useBoardsWrite(isEdit)

  return (
    <div className={style.전체바탕}>
     
      <div className={style.head}><span>게시물 {props.isEdit ? "수정" : "등록"}</span></div>
      <div className={style.main}>
        <div className={style.메인}>
          <div className={style.메인__1__1}>
            <div >작성자 <span className={style.필수}>*</span> </div>
            <input type="text" placeholder="작성자 명을 입력해 주세요." className={`${style.input} ${style.메인1__인풋}`} id="email" onChange={onChangeInputs} disabled={props.isEdit} defaultValue={props?.data?.fetchBoard?.writer ?? ""} />
            <div className={style.errorMassage}>{emailError}</div>
          </div>
          <div className={style.메인__1__1}>
            <div>비밀번호 <span className={style.필수}>*</span></div>
            <input type="password" placeholder="비밀번호를 입력해 주세요." className={`${style.input} ${style.메인1__인풋}`} onChange={onChangePassword} disabled={props.isEdit} defaultValue={props?.data?.fetchBoard?.writer ?? ""} />
            <div className={style.errorMassage}>{passwordError}</div>
          </div>
        </div>
        <hr></hr>
        <div className={style.메인__1__1}>
          <div>제목 <span className={style.필수}>*</span></div>
          <input className={style.input} type="text" placeholder="제목을 입력해 주세요." id="title" onChange={onChangeInputs} defaultValue={props.data?.fetchBoard?.title} />
          <div className={style.errorMassage}>{titleError}</div>
        </div>
        <hr></hr>

        <div className={style.메인__1__1}>
          <div>내용 <span className={style.필수}>*</span></div>
          <textarea className={style.textarea} placeholder="내용을 입력해 주세요." id="content" onChange={onChangeInputs} defaultValue={props.data?.fetchBoard.contents} />
          <div className={style.errorMassage}>{contentError}</div>
        </div>


        <div className={style.메인__1__1}>
          <div className={style.메인__1__1} id="메인__주소__검색">
            <div>주소</div>
            <div className={style.메인__주소__주소검색}>
              <input type="number" placeholder="01234" className={`${style.input} ${style.주소검색인풋}`} value={zonecode !== "" ? zonecode : props?.data?.fetchBoard?.boardAddress?.zipcode || ""} />
              <button onClick={onToggleModal} className={style.주소검색버튼}>우편번호 검색</button>
            </div>
          </div>
          <div>
            <input className={style.input} type="text" placeholder="주소를 입력해 주세요." value={address !== "" ? address : props?.data?.fetchBoard?.boardAddress?.address || ""} />
          </div>
          <div>
            <input className={style.input} type="text" placeholder="상세주소" onChange={onChangeDetailaddress} value={detailAddress !== "" ? detailAddress : props?.data?.fetchBoard?.boardAddress?.addressDetail || ""} />
          </div>
        </div>
        <hr></hr>

        <div className={style.메인__1__1}>
          <div>유튜브 링크</div>
          <input className={style.input} type="text" placeholder="링크를 입력해주세요." onChange={onChangeYoutube} defaultValue={props.data?.fetchBoard.youtubeUrl ?? ""} />
        </div>
        <hr></hr>
        <div>{props.data?.fetchBoard.images}</div>
        <div className={style.메인__1__1}>
          <div>사진 첨부</div>
          <div className={style.사진첨부목록}>
            {Array.from({ length: 6 }).map((_, index) => {
              const currentImage = imageUrl[index] || "";
              return (
                <div
                  key={index}
                  className={style.사진첨부리스트}
                  style={{ position: "relative" }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={(el) => (fileRefs.current[index] = el)}
                    onChange={(e) => onChangeFile(e, index)}
                  />
                  {currentImage && (
                    <>
                      <img
                        src={`https://storage.googleapis.com/${currentImage}`}
                        alt={`uploaded ${index}`}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteImage(index);
                        }}
                        style={{
                          position: "absolute",
                          right: "4px",
                          bottom: "4px",
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </>
                  )}
                  <div onClick={() => handleClickImage(index)}>클릭해서 사진 업로드</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={style.footer}>
        <button className={style.푸터취소버튼}>취소</button>
        <button className={style.푸터등록버튼} onClick={props.isEdit ? onClickUpdate : onClickSignUp} disabled={!props.isEdit && !isActive} style={{ backgroundColor: isActive ? "blue" : "gray" }}>등록하기</button>

      </div>

      {isModalOpen && (
        <Modal
          title="모달제목"
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal}>

          <DaumPostcodeEmbed onComplete={onToggleModal} />
        </Modal>
      )}

    </div>


  )
}
