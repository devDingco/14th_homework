// src/components/boards-detail/index.tsx
"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { SmallInput, LongInput, SuperLongInput } from "./form-input";
import Divider from "./line";
import { useRouter } from "next/navigation";
import { IBoardsNewProps } from "./types";
import { useBoardsForm } from "./hook";
import { Modal, Input } from "antd";
import DaumPostcode from "react-daum-postcode";

export default function BoardsNew(props: IBoardsNewProps) {
  const router = useRouter();

  const {
    writerInput,
    passwordInput,
    titleInput,
    contentInput,
    writerError,
    passwordError,
    titleError,
    contentError,
    isFormValid,
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSubmit,
    onClickUpdate,
    // 주소 관련 상태와 핸들러들
    zipCode,
    address,
    addressDetail,
    onChangeZipCode,
    onChangeAddress,
    onChangeAddressDetail,
    // 유튜브 URL 상태와 핸들러
    youtubeUrl,
    onChangeYoutubeUrl,
    // 모달 관련 (hook에서 반환)
    modalMessage,
    setModalMessage,
    modalRedirect,
    setModalRedirect,
  } = useBoardsForm();

  // 로컬 상태들
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [updatePassword, setUpdatePassword] = useState("");

  // 우편번호 검색 모달 열기
  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };

  // 주소 선택 시 기존 값 변경
  const handleAddressSelect = (data: any) => {
    onChangeZipCode(data.zonecode); // 우편번호 변경
    onChangeAddress(data.address); // 기본주소 변경
    setIsAddressModalOpen(false);
  };

  // 메시지 모달 확인(OK) 처리 — 리다이렉트가 있으면 이동
  const handleMessageOk = () => {
    const redirect = modalRedirect;
    setModalMessage(null);
    setModalRedirect(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  return (
    <div className={styles.App}>
      <header>
        <div className={styles.전체}>
          <div className={styles.헤더}></div>
          <div className={styles.바디}>
            <div className={styles.게시글_폼_제목}>
              {props.isEdit ? "게시글 수정" : "게시글 등록"}
            </div>
            <div className={styles.게시글_폼}>
              <div className={styles.게시글_폼_상세}>
                <div className={styles.게시글_인풋블록}>
                  <SmallInput
                    Input_Title="작성자"
                    Input_Placeholder="작성자 명을 입력해주세요."
                    Input_Star="*"
                    value={writerInput}
                    onChange={onChangeWriter}
                    errorMessage={writerError}
                    disabled={props.isEdit}
                  />
                  <SmallInput
                    Input_Title="비밀번호"
                    Input_Placeholder="비밀번호를 입력해주세요."
                    Input_Star="*"
                    value={passwordInput}
                    onChange={onChangePassword}
                    errorMessage={passwordError}
                    disabled={props.isEdit}
                  />
                </div>
                <Divider />

                <div className={styles.게시글_인풋블록}>
                  <LongInput
                    Input_Title="제목"
                    Input_Placeholder="제목을 입력해 주세요."
                    Input_Star="*"
                    value={titleInput}
                    onChange={onChangeTitle}
                    errorMessage={titleError}
                  />
                </div>
                <Divider />

                <div className={styles.게시글_인풋블록}>
                  <SuperLongInput
                    Input_Title="내용"
                    Input_Placeholder="내용을 입력해 주세요."
                    Input_Star="*"
                    value={contentInput}
                    onChange={onChangeContent}
                    errorMessage={contentError}
                  />
                </div>
                <Divider />

                {/* 주소 입력 섹션 */}
                <div className={styles.게시글_인풋블록쌓기}>
                  <div className={styles.주소인풋이랑버튼}>
                    주소
                    <div className={styles.인풋이랑버튼}>
                      {/* 우편번호 입력 필드 - 초기값 바인딩 */}
                      <input
                        className={styles.우편번호인풋}
                        placeholder="01234"
                        value={zipCode}
                        readOnly
                      />
                      {/* 우편번호 검색 버튼 - 클릭 시 기존 값 변경 */}
                      <button
                        className={styles.우편번호검색}
                        onClick={handleAddressSearch}
                      >
                        우편번호 검색
                      </button>
                    </div>
                  </div>
                  {/* 기본 주소 입력 필드 - 초기값 바인딩 */}
                  <LongInput
                    Input_Placeholder="주소를 입력해 주세요."
                    value={address}
                    readOnly
                  />
                  {/* 상세 주소 입력 필드 - 초기값 바인딩 */}
                  <LongInput
                    Input_Placeholder="상세주소"
                    onChange={onChangeAddressDetail}
                    value={addressDetail}
                  />
                </div>
                <Divider />

                {/* 유튜브 URL 입력 섹션 */}
                <div className={styles.게시글_인풋블록}>
                  <LongInput
                    Input_Title="유튜브링크"
                    Input_Placeholder="링크를 입력해주세요."
                    onChange={onChangeYoutubeUrl}
                    value={youtubeUrl}
                  />
                </div>
                <Divider />

                {/* 사진 첨부 */}
                <div className={styles.게시글_인풋블록쌓기}>
                  <span>사진첨부</span>
                  <div className={styles.사진첨부_그룹}>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.게시글_폼_버튼}>
                <button onClick={() => router.push(`/boards/`)}>취소</button>
                <button
                  style={{ backgroundColor: isFormValid ? "#2974E5" : "gray" }}
                  className={styles.등록}
                  onClick={() => {
                    if (props.isEdit) {
                      setIsPasswordModalOpen(true); // 수정 시 비밀번호 모달 열기
                    } else {
                      onClickSubmit(); // 등록
                    }
                  }}
                >
                  {props.isEdit ? "수정" : "등록"}하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 일반 메시지 모달 (등록/수정 성공·실패 메시지) */}
      <Modal
        open={!!modalMessage}
        onOk={handleMessageOk}
        onCancel={() => setModalMessage(null)}
        okText="확인"
      >
        <div>{modalMessage}</div>
      </Modal>

      {/* 수정 비밀번호 입력 모달 */}
      <Modal
        title="비밀번호 확인"
        open={isPasswordModalOpen}
        onOk={() => {
          // 비밀번호 모달에서 확인 누르면 hook의 onClickUpdate 호출
          onClickUpdate(updatePassword);
          setIsPasswordModalOpen(false);
          setUpdatePassword("");
        }}
        onCancel={() => {
          setIsPasswordModalOpen(false);
          setUpdatePassword("");
        }}
      >
        <Input.Password
          placeholder="비밀번호를 입력하세요"
          value={updatePassword}
          onChange={(e) => setUpdatePassword(e.target.value)}
        />
      </Modal>

      {/* 우편번호 검색 모달 */}
      <Modal
        title="우편번호 검색"
        open={isAddressModalOpen}
        onCancel={() => setIsAddressModalOpen(false)}
        footer={null}
      >
        <DaumPostcode onComplete={handleAddressSelect} />
      </Modal>
    </div>
  );
}
