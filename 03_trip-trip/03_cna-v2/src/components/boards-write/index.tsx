'use client'
import styles from './styles.module.css'
import Image from 'next/image'
import addImage from '@assets/add_image.png'
import { IBoardWriteProps } from './types'
import useBoardForm from './hook'
import { Modal } from 'antd'
import DaumPostcodeEmbed from 'react-daum-postcode'

const IMAGE_SRC = {
  addImage: {
    src: addImage,
    alt: '사진추가이미지',
  },
}

export default function BoardWritePage(props: IBoardWriteProps) {
  const {
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onChangeAddress,
    onChangeLink,
    onClickSignup,
    isButtonDisabled,
    data,
    name,
    password,
    title,
    content,
    address,
    link,
    nameError,
    passwordError,
    titleError,
    contentError,
    linkError,
    isModalOpen,
    onToggleModal,
    handleComplete,
  } = useBoardForm({ isEdit: props.isEdit })

  return (
    <div className={styles.layout}>
      {/* title */}
      <div className={styles.enroll_subject}>
        <div className={styles.enroll_subject_text}>
          {props.isEdit ? '게시물 수정' : '게시물 등록'}
        </div>
      </div>
      <div className={styles.enroll_row_container}>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_row_flex}>
            {/* 작성자 */}
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>작성자 </div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                disabled={props.isEdit}
                defaultValue={props.isEdit ? data?.fetchBoard?.writer ?? '' : name}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                className={props.isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangeName}
              />
              <div className={styles.error_msg}>{nameError}</div>
            </div>
            {/* 비밀번호 */}
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>비밀번호</div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                disabled={props.isEdit}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={props.isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangePassword}
                defaultValue={props.isEdit ? '*********' : password}
              />
              <div className={styles.error_msg}>{passwordError}</div>
            </div>
          </div>
        </div>

        <div className={styles.enroll_border}></div>

        {/* 제목 */}
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>제목</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <input
            defaultValue={props.isEdit ? data?.fetchBoard?.title : title}
            type="text"
            className={styles.enroll_input}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles.error_msg}>{titleError}</div>
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          {/* 내용 */}
          <div className={styles.enroll_form_title}>
            <div>내용</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <textarea
            defaultValue={props.isEdit ? data?.fetchBoard?.contents : content}
            placeholder="내용을 입력해 주세요."
            className={`${styles.enroll_input} ${styles.enroll_textarea}`}
            onChange={onChangeContent}
          ></textarea>
          <div className={styles.error_msg}>{contentError}</div>
        </div>

        {/* 주소 */}
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>주소</div>
          </div>
          <div className={styles.enroll_address_firstrow}>
            <input
              type="number"
              className={styles.zipcode_input}
              placeholder="12345"
              name="zipcode"
              readOnly
              onChange={onChangeAddress}
              value={
                props.isEdit
                  ? (address.zipcode || data?.fetchBoard?.boardAddress?.zipcode) ?? ''
                  : ''
              }
            />
            <button className={styles.zipcode_search_button} onClick={onToggleModal}>
              우편번호 검색
            </button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles.enroll_input}
            type="text"
            name="base"
            readOnly
            onChange={onChangeAddress}
            value={
              props.isEdit ? (address.base || data?.fetchBoard?.boardAddress?.address) ?? '' : ''
            }
          />
          <input
            placeholder="상세주소"
            className={styles.enroll_input}
            type="text"
            name="detail"
            onChange={onChangeAddress}
            value={
              props.isEdit
                ? (address.detail || data?.fetchBoard?.boardAddress?.addressDetail) ?? ''
                : ''
            }
          />
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles.enroll_input}
            placeholder="링크를 입력해 주세요."
            onChange={onChangeLink}
            defaultValue={link}
          />
          <div className={styles.error_msg}>{linkError}</div>
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div>사진 첨부</div>
          <div className={styles.picture_enroll_row}>
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className={styles.enroll_button_container}>
        <button className={styles.enroll_cancel_button}>취소</button>
        <button
          className={
            !props.isEdit && isButtonDisabled
              ? `${styles.enroll_submit_button} ${styles.disabled}`
              : styles.enroll_submit_button
          }
          onClick={onClickSignup}
          disabled={!props.isEdit && isButtonDisabled}
        >
          {props.isEdit ? '수정' : '등록'}하기
        </button>
      </div>
      {isModalOpen && (
        <Modal title="모달 제목" open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </div>
  )
}
