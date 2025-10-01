'use client'
import styles from './styles.module.css'
import Image from 'next/image'
import addImage from '@assets/add_image.png'
import { IBoardWriteProps } from './types'
import useBoardForm from './hook'
import { Modal } from 'antd'
import DaumPostcodeEmbed from 'react-daum-postcode'
import CloseIcon from '@mui/icons-material/Close'

const IMAGE_SRC = {
  addImage: {
    src: addImage,
    alt: '사진추가이미지',
  },
}

export default function BoardWritePage(props: IBoardWriteProps) {
  const {
    isEdit,
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    handleCancel,
    address,
    setAddress,
    isModalOpen,
    onToggleModal,
    handleComplete,
    images,
    fileRefs,
    onClickImagebyIdx,
    onChangeFile,
    onClickDelete,
  } = useBoardForm({ isEdit: props.isEdit })

  return (
    <form className={styles.layout} onSubmit={handleSubmit(onSubmit)}>
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
                {...register('writer')}
                disabled={props.isEdit}
                // value={boardValue.name}
                type="text"
                // id="name"
                placeholder="작성자 명을 입력해 주세요."
                className={props.isEdit ? styles.disabled_input : styles.enroll_input}
                // onChange={onChangeValue}
              />
              {errors.writer && <p className={styles.error_msg}>{errors.writer.message}</p>}
            </div>
            {/* 비밀번호 */}
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>비밀번호</div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                {...register('password')}
                disabled={props.isEdit}
                type="password"
                // id="password"
                placeholder="비밀번호를 입력해 주세요."
                className={props.isEdit ? styles.disabled_input : styles.enroll_input}
                // onChange={onChangeValue}
                // value={props.isEdit ? '*********' : boardValue.password}
              />
              {errors.password && <p className={styles.error_msg}>{errors.password.message}</p>}
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
            {...register('title')}
            // value={boardValue.title}
            type="text"
            // id="title"
            className={styles.enroll_input}
            placeholder="제목을 입력해 주세요."
            // onChange={onChangeValue}
          />
          {errors.title && <p className={styles.error_msg}>{errors.title.message}</p>}
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          {/* 내용 */}
          <div className={styles.enroll_form_title}>
            <div>내용</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <textarea
            {...register('contents')}
            // id="content"
            // value={boardValue.content}
            placeholder="내용을 입력해 주세요."
            className={`${styles.enroll_input} ${styles.enroll_textarea}`}
            // onChange={onChangeValue}
          ></textarea>
          {errors.contents && <p className={styles.error_msg}>{errors.contents.message}</p>}
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
            value={address.base}
          />
          <input
            placeholder="상세주소"
            className={styles.enroll_input}
            type="text"
            name="detail"
            value={address.detail}
            onChange={(e) => setAddress((prev) => ({ ...prev, detail: e.target.value }))}
          />
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>유튜브 링크</div>
          </div>
          <input
            {...register('youtubeUrl')}
            className={styles.enroll_input}
            placeholder="링크를 입력해 주세요."
            // onChange={onChangeValue}
            // value={boardValue.link}
            // id="link"
          />
          {errors.youtubeUrl && <p className={styles.error_msg}>{errors.youtubeUrl.message}</p>}
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div>사진 첨부</div>
          <div className={styles.picture_enroll_row}>
            {[0, 1, 2].map((_, idx) => {
              const url = images?.[idx]
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
        <button className={styles.enroll_cancel_button} onClick={handleCancel}>
          취소
        </button>
        <button
          className={
            !props.isEdit && !isValid
              ? `${styles.enroll_submit_button} ${styles.disabled}`
              : styles.enroll_submit_button
          }
          disabled={!isValid}
        >
          {isEdit ? '수정' : '등록'}하기
        </button>
      </div>
      {isModalOpen && (
        <Modal title="모달 제목" open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </form>
  )
}
