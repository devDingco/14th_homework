'use client';
// 게시물 작성 페이지

import styles from './styles.module.css';
import useBoardsWriteAdvanced from './hook';
import { BoardVariables } from './types';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Modal } from 'antd';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function BoardsWriteAdvanced(props: BoardVariables) {
  const {
    formData,
    fileRef,
    setFileRef,
    imageUrl,
    onChangeInput,
    onChangePassword,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    onChangeFile,
    deleteImage,
    onClickImage,
    onclickUpdate,
    onClickSubmit,
    error,
    checkRegister,
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    zipcode,
    address,
    addressDetail,
    youtubeUrl,
    AlertModalComponent,
  } = useBoardsWriteAdvanced(props);
  // console.log('🚀 ~ checkRegister:', checkRegister());

  return (
    <div className={styles.layout}>
      <div className={styles['enroll-subject']}>
        <div className={styles['enroll-subject-text']}>게시물 {props.isEdit ? '수정' : '등록'}</div>
      </div>
      <div className={styles['enroll-row-container']}>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-row-flex']}>
            <div className={styles['flex-half']}>
              <div className={styles['enroll-form-title']}>
                <div>작성자 </div>
                <div className={styles['enroll-required-indicator']}>*</div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="작성자 명을 입력해 주세요."
                  className={styles['enroll-input']}
                  id="writer"
                  onChange={onChangeInput}
                  value={formData.writer}
                  // defaultValue={props.data?.fetchBoard?.writer || ''}
                  disabled={props.isEdit}
                />
                {error.writer && <p className={styles.error}>{error.writer}</p>}
              </div>
            </div>
            <div className={styles['flex-half']}>
              <div className={styles['enroll-form-title']}>
                <div>비밀번호</div>
                <div className={styles['enroll-required-indicator']}> *</div>
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={styles['enroll-input']}
                onChange={onChangePassword}
                // defaultValue={'*************'}
                disabled={props.isEdit}
              />
              {error.password && <p className={styles.error}>{error.password}</p>}
            </div>
          </div>
        </div>

        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>제목</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <input
            type="text"
            className={styles['enroll-input']}
            placeholder="제목을 입력해 주세요."
            id="title"
            onChange={onChangeInput}
            value={formData.title}
            // defaultValue={props.data?.fetchBoard?.title || ''}
          />
          {error.title && <p className={styles.error}>{error.title}</p>}
        </div>
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>내용</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <input
            type="text"
            className={styles.contents}
            placeholder="내용을 입력해 주세요."
            id="contents"
            onChange={onChangeInput}
            value={formData.contents}
            // defaultValue={props.data?.fetchBoard?.contents || ''}
          />
          {error.contents && <p className={styles.error}>{error.contents}</p>}
        </div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>주소</div>
          </div>
          <div className={styles['enroll-address-firstrow']}>
            <input
              type="text"
              className={styles['zipcode-input']}
              placeholder="12345"
              value={zipcode}
              readOnly
            />
            <button className={styles['zipcode-search-button']} onClick={showModal}>
              우편번호 검색
            </button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles['enroll-input']}
            type="text"
            value={address}
            readOnly
          />
          <input
            placeholder="상세주소"
            className={styles['enroll-input']}
            type="text"
            value={addressDetail}
            onChange={onChangeAddressDetail}
          />
        </div>
        {/* border */}
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles['enroll-input']}
            placeholder="링크를 입력해 주세요."
            value={youtubeUrl}
            onChange={onChangeYoutubeUrl}
          />
        </div>

        {/* border */}
        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div>사진 첨부</div>
          {props.isEdit && <div className={styles['existing-images-info']}></div>}
          <div className={styles['picture-enroll-row']}>
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                style={{
                  display: 'flex',
                  width: 110,
                  height: 110,
                  color: '#666',
                  borderRadius: '10px',
                }}
                onClick={onClickImage(idx)}
              >
                <input
                  style={{ display: 'none' }}
                  type="file"
                  onChange={onChangeFile(idx)}
                  ref={setFileRef(idx)}
                  accept="image/jpeg,image/png"
                />
                {imageUrl[idx] ? (
                  <>
                    <Image
                      src={`https://storage.googleapis.com/${imageUrl[idx]}`}
                      alt={`이미지${idx + 1}`}
                      width={100}
                      height={100}
                    />
                    <button type="button" className={styles.deleteBtn} onClick={deleteImage(idx)}>
                      삭제
                    </button>
                  </>
                ) : (
                  <span style={{ color: '#fff', fontSize: 12 }}>
                    <img src="/add image.png" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles['enroll-button-container']}>
        <button className={styles['enroll-cancel-button']}>취소</button>
        {/* <Link href={'/boards/detail'}> */}
        <button
          className={styles['enroll-submit-button']}
          onClick={props.isEdit ? onclickUpdate : onClickSubmit}
          disabled={!checkRegister}
          aria-disabled={!checkRegister}
        >
          게시글 {props.isEdit ? '수정' : '등록'}하기
        </button>
        {/* </Link> */}
      </div>
      {isModalOpen && (
        <Modal title="모달 제목" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
      <AlertModalComponent />
    </div>
  );
}
