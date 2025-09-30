'use client'
import styles from './styles.module.css'
import Image from 'next/image'
import addImage from '@assets/add_image.png'
import { IBoardWriteProps } from './types'
import useBoardForm from './hook'
import { Modal } from 'antd'
import DaumPostcodeEmbed from 'react-daum-postcode'
import { ChangeEvent, useRef } from 'react'
import { useMutation } from '@apollo/client'
import {
  UploadFileDocument,
  UploadFileMutation,
  UploadFileMutationVariables,
} from 'commons/graphql/graphql'
import { checkValidationFile } from 'commons/libraries/validation/image-validation'
import CloseIcon from '@mui/icons-material/Close'

const IMAGE_SRC = {
  addImage: {
    src: addImage,
    alt: '사진추가이미지',
  },
}

export default function BoardWritePage(props: IBoardWriteProps) {
  const {
    onChangeValue,
    onChangeAddress,
    onClickSignup,
    setImageByIndex,
    isButtonDisabled,
    boardValue,
    address,
    boardError,
    isModalOpen,
    onToggleModal,
    handleComplete,
    handleNavigate,
  } = useBoardForm({ isEdit: props.isEdit })

  const fileRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const onClickImagebyIdx = (idx: number) => {
    fileRefs[idx].current?.click()
  }

  const [uploadFile] = useMutation<UploadFileMutation, UploadFileMutationVariables>(
    UploadFileDocument
  )

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isValid = checkValidationFile(file)
    if (!isValid) return

    const { data } = await uploadFile({ variables: { file } })
    const url = data?.uploadFile?.url ?? ''

    setImageByIndex(idx, url)
  }

  const onClickDelete = (idx: number) => {
    setImageByIndex(idx, '')
  }

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
                value={boardValue.name}
                type="text"
                id="name"
                placeholder="작성자 명을 입력해 주세요."
                className={props.isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangeValue}
              />
              <div className={styles.error_msg}>{boardError.nameError}</div>
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
                id="password"
                placeholder="비밀번호를 입력해 주세요."
                className={props.isEdit ? styles.disabled_input : styles.enroll_input}
                onChange={onChangeValue}
                value={props.isEdit ? '*********' : boardValue.password}
              />
              <div className={styles.error_msg}>{boardError.passwordError}</div>
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
            value={boardValue.title}
            type="text"
            id="title"
            className={styles.enroll_input}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeValue}
          />
          <div className={styles.error_msg}>{boardError.titleError}</div>
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          {/* 내용 */}
          <div className={styles.enroll_form_title}>
            <div>내용</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <textarea
            id="content"
            value={boardValue.content}
            placeholder="내용을 입력해 주세요."
            className={`${styles.enroll_input} ${styles.enroll_textarea}`}
            onChange={onChangeValue}
          ></textarea>
          <div className={styles.error_msg}>{boardError.contentError}</div>
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
              value={address.zipcode}
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
            value={address.base}
          />
          <input
            placeholder="상세주소"
            className={styles.enroll_input}
            type="text"
            name="detail"
            onChange={onChangeAddress}
            value={address.detail}
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
            onChange={onChangeValue}
            value={boardValue.link}
            id="link"
          />
          <div className={styles.error_msg}>{boardError.linkError}</div>
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div>사진 첨부</div>
          <div className={styles.picture_enroll_row}>
            {[0, 1, 2].map((_, idx) => {
              const url = boardValue.images[idx]
              const hasUrl = !!url
              const src = hasUrl ? `https://storage.googleapis.com/${url}` : IMAGE_SRC.addImage.src
              return (
                <div key={idx} className={styles.uploadImageWrapper}>
                  {hasUrl && (
                    <button className={styles.closeButton} onClick={() => onClickDelete(idx)}>
                      <CloseIcon />
                    </button>
                  )}
                  <Image
                    src={src}
                    alt="이미지추가"
                    onClick={() => onClickImagebyIdx(idx)}
                    width={160}
                    height={0}
                    className={styles.uploadImage}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileRefs[idx]}
                    onChange={(e) => onChangeFile(e, idx)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.enroll_button_container}>
        <button className={styles.enroll_cancel_button} onClick={handleNavigate}>
          취소
        </button>
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
