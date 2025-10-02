"use client"

import { useRef } from "react";
import useBoardsWrite from "./hooks";
import style from "./style.module.css";
import { Modal } from 'antd';
import DaumPostcodeEmbed from 'react-daum-postcode';
import {  MyInput, MyButton, MyTextarea} from "@commons/ui"

import { IBoardsWriteProps } from "./types";
import { ApolloClient } from "@apollo/client";

export default function BoardsWrite(props: IBoardsWriteProps) {
  const { isEdit } = props;
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleClickImage = (index: number) => {
    fileRefs.current[index]?.click();
  };

  const {

    onClickUpdate,

    isActive,
    onToggleModal,
    isModalOpen,
    onClickImage,
    fileRef,
    onChangeFile,
    imageUrl,
    onDeleteImage,
    onClickSubmit,
    handleSubmit,
    register,
    formState

    
    


  } = useBoardsWrite(isEdit)

  return (
    <div className={style.전체바탕}>
      <form onSubmit={handleSubmit(props.isEdit ? onClickUpdate : onClickSubmit)}>
        <div className={style.head}><span>게시물 {props.isEdit ? "수정" : "등록"}</span></div>
        <div className={style.main}>
          <div className={style.메인}>
            <div className={style.메인__1__1}>
              <div >작성자 <span className={style.필수}>*</span> </div>
              <MyInput type="text" register={register} name="writer" placeholder="작성자 명을 입력해 주세요." className={`${style.input} ${style.메인1__인풋}`} id="email" disabled={props.isEdit} defaultValue={props?.data?.fetchBoard?.writer ?? ""} />
              
              <div className={style.errorMassage}>{formState.errors.writer?.message}</div>
            </div>
            <div className={style.메인__1__1}>
              <div>비밀번호 <span className={style.필수}>*</span></div>
              <MyInput type="password" placeholder="비밀번호를 입력해 주세요." className={`${style.input} ${style.메인1__인풋}`} register={register} name="password" disabled={props.isEdit} defaultValue={props.isEdit ? "********" : ""} />
              <div className={style.errorMassage}>{formState.errors.password?.message}</div>
            </div>
          </div>
          <hr></hr>
          <div className={style.메인__1__1}>
            <div>제목 <span className={style.필수}>*</span></div>
            <MyInput className={style.input} type="text" placeholder="제목을 입력해 주세요." register={register} name="title" defaultValue={props.data?.fetchBoard?.title} />
            <div className={style.errorMassage}>{formState.errors.title?.message}</div>
          </div>
          <hr></hr>

          <div className={style.메인__1__1}>
            <div>내용 <span className={style.필수}>*</span></div>
            <MyTextarea className={style.textarea} placeholder="내용을 입력해 주세요." register={register} name="contents" defaultValue={props.data?.fetchBoard.contents} />
            <div className={style.errorMassage}>{formState.errors.contents?.message}</div>
          </div>


          <div className={style.메인__1__1}>
            <div className={style.메인__1__1} id="메인__주소__검색">
              <div>주소</div>
              <div className={style.메인__주소__주소검색}>
                <MyInput type="number" placeholder="01234" register={register} name="zipcode" className={`${style.input} ${style.주소검색인풋}`} />
                <button type="button" onClick={onToggleModal} className={style.주소검색버튼}>우편번호 검색</button>
              </div>
            </div>
            <div>
              <MyInput className={style.input} type="text" placeholder="주소를 입력해 주세요." register={register} name="address"   />
            </div>
            <div>
              <MyInput className={style.input} type="text" placeholder="상세주소" register={register} name="addressDetail"  />
            </div>
          </div>
          <hr></hr>

          <div className={style.메인__1__1}>
            <div>유튜브 링크</div>
            <MyInput className={style.input} type="text" placeholder="링크를 입력해주세요." register={register} name="youtubeUrl" defaultValue={props.data?.fetchBoard.youtubeUrl ?? ""} />
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
          <MyButton type="button" className={style.푸터취소버튼}>취소</MyButton>
          <MyButton type="submit" className={style.푸터등록버튼}   style={{ backgroundColor: isActive ? "blue" : "gray" }}>등록하기</MyButton>

        </div>
      </form>

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
