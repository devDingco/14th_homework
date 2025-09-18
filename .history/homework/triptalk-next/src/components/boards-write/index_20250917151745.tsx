'use client'; // 이 컴포넌트를 클라이언트에서 실행하도록 설정

import styles from './BoardsNew.module.css'; // CSS 모듈 스타일 import

import Image from 'next/image'; // Next.js 최적화된 이미지 컴포넌트

import useBoardsWrite from './hooks';
import { IBoardsWriteProps } from './types';
import AddressModal from '../address-modal';
import AllModal from '@/components/all-modal';

// 게시글 작성/수정 컴포넌트 (props를 통해 수정 모드인지 판단)
export default function BoardsWrite(props: IBoardsWriteProps) {
  const {
    data,
    zipcode,
    address,
    addressDetail,
    setZipcode,
    setAddress,
    setAddressDetail,
    onClickSignUp,
    onClickUpdate,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onChangeYoutubeUrl,
    nameError,
    passwordError,
    titleError,
    contentError,
    isActive,
    modalOpen,
    modalMessage,
    closeModal,
    onChangeInputs,
  } = useBoardsWrite(props);

  // JSX 렌더링 부분 - 실제로 화면에 보여지는 UI
  return (
    <div className="container">
      {/* 페이지 제목 */}
      <h2 className={styles.h2}>게시물 등록</h2>
      {/* 작성자와 비밀번호 입력 섹션 */}
      <div className={styles.작성자비밀번호컨테이너}>
        {/* 작성자 입력 필드 */}
        <div className={styles.작성자컨테이너}>
          <div>작성자</div>
          <input
            id="writer"
            type="text"
            placeholder="작성자 명을 입력해주세요."
            onChange={onChangeInputs}
            // onChange={onChangeName} // 입력값 변경 시 실행
            defaultValue={data?.fetchBoard.writer ?? ''} // 수정 모드일 때 기존값 표시
            disabled={props.isEdit} // 수정 모드에서는 작성자 변경 불가
          ></input>
          <div className={styles.에러메시지}>{nameError}</div>{' '}
          {/* 작성자 에러메시지 */}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className={styles.비밀번호컨테이너}>
          <div>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={onChangePassword} // 입력값 변경 시 실행
            // defaultValue={props.data?.fetchBoard.password}  // 보안상 비밀번호는 표시하지 않음
            disabled={props.isEdit} // 수정 모드에서는 비밀번호 입력 불가
          ></input>
          <div className={styles.에러메시지}>{passwordError}</div>{' '}
          {/* 비밀번호 에러메시지 */}
        </div>
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      {/* 제목 입력 섹션 */}
      <div className={styles.제목컨테이너}>
        <div>제목</div>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력해 주세요."
          // onChange={onChangeTitle} // 제목 입력값 변경 시 실행
          onChange={onChangeInputs}
          defaultValue={data?.fetchBoard.title} // 수정 모드일 때 기존 제목 표시
        ></input>
        <div className={styles.에러메시지}>{titleError}</div>{' '}
        {/* 제목 에러메시지 */}
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      {/* 내용 입력 섹션 */}
      <div className={styles.내용컨테이너}>
        <div>내용</div>
        <textarea
          id="content"
          placeholder="내용을 입력해 주세요."
          // onChange={onChangeContent} // 내용 입력값 변경 시 실행
          onChange={onChangeInputs}
          defaultValue={data?.fetchBoard.contents} // 수정 모드일 때 기존 내용 표시
        ></textarea>
        <div className={styles.에러메시지}>{contentError}</div>
        {/* 내용 에러메시지 */}
      </div>
      <div>
        <div className={styles.주소컨테이너}>
          <div>주소</div>

          {/* 우편번호 검색 */}
          <div className={styles.우편번호}>
            <input
              type="text"
              placeholder="01234"
              value={zipcode || data?.fetchBoard.boardAddress?.zipcode || ''}
              readOnly
            ></input>
            <AddressModal
              onAddressSelected={(zipcodeValue, addressValue) => {
                setZipcode(zipcodeValue);
                setAddress(addressValue);
              }}
            />
          </div>

          {/* 주소 입력 필드들 */}
          <div className={styles.상세주소컨테이너}>
            <input
              type="text"
              placeholder="주소를 입력해 주세요."
              value={address || data?.fetchBoard.boardAddress?.address || ''}
              readOnly
            ></input>{' '}
            {/* 기본 주소 */}
            <input
              type="text"
              placeholder="상세주소"
              defaultValue={data?.fetchBoard.boardAddress?.addressDetail || ''}
              onChange={(e) => setAddressDetail(e.target.value)}
            ></input>{' '}
            {/* 상세 주소 */}
          </div>
        </div>
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      {/* 유튜브 링크 입력 섹션 */}
      <div>
        <div className={styles.유튜브컨테이너}>
          <div>유튜브 링크</div>
          <input
            type="text"
            placeholder="링크를 입력해 주세요"
            onChange={onChangeYoutubeUrl} // 유튜브 URL 입력값
            defaultValue={data?.fetchBoard.youtubeUrl} // 수정 모드일 때 기존 내용 표시
          ></input>{' '}
          {/* 유튜브 URL 입력 */}
        </div>
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      {/* 사진 첨부 섹션 (현재 기능 미구현) */}
      <div className={styles.사진첨부컨테이너}>
        <div>사진첨부</div>
        <div className={styles.사진첨부}>
          {/* 사진 업로드 버튼들 (최대 3개) */}
          <button>
            <Image src="/icons/add.png" alt="업로드" width={40} height={40} />
            <br />
            클릭해서 사진 업로드
          </button>
          <button>
            <Image src="/icons/add.png" alt="업로드" width={40} height={40} />
            <br />
            클릭해서 사진 업로드
          </button>
          <button>
            <Image src="/icons/add.png" alt="업로드" width={40} height={40} />
            <br />
            클릭해서 사진 업로드
          </button>
        </div>
      </div>
      {/* 하단 버튼 섹션 */}
      <div className={styles.취소등록버튼}>
        {/* 취소 버튼 */}
        <button className={styles.취소버튼}>취소</button>

        {/* 등록/수정 버튼 */}
        {/* 버튼 활성화 상태에 따라 배경색 변경 (활성화: 파란색, 비활성화: 회색) */}
        {/* 수정 모드인지에 따라 다른 함수 실행 */}
        <button
          className={styles.등록하기버튼}
          style={{ backgroundColor: isActive === true ? '#2974E5' : '#C7C7C7' }}
          onClick={props.isEdit ? onClickUpdate : onClickSignUp}
        >
          {/* 수정 모드인지에 따라 버튼 텍스트 변경 */}
          {props.isEdit ? '수정' : '등록'}하기
        </button>
      </div>
      <AllModal open={modalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
}
