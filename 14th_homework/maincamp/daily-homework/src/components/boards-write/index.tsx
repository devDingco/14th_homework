'use client';
// 게시물 작성 페이지

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import styles from './styles.module.css';
import useBoardsWriteAdvanced from './hook';
import { BoardVariables } from './types';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Modal } from 'antd';
import Image from 'next/image';
import { Button, Input } from '@commons/ui';
import { Controller } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';

// react-quill을 dynamic import로 로드 (SSR 방지)
const ReactQuill = dynamic(async () => await import('react-quill'), { ssr: false });

export default function BoardsWriteAdvanced(props: BoardVariables) {
  const {
    setFileRef,
    imageUrl,
    register,
    control,
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
    AlertModalComponent,
  } = useBoardsWriteAdvanced(props);

  // react-quill 모듈 설정
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link', 'image'],
        [{ color: [] }, { background: [] }],
        ['clean'],
      ],
    }),
    []
  );

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
    'color',
    'background',
  ];
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
              <Input
                label="작성자"
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                size="medium"
                required={!props.isEdit}
                disabled={props.isEdit}
                error={error.writer}
                {...register('writer', {
                  required: props.isEdit ? false : '필수입력 사항 입니다.',
                })}
              />
            </div>
            <div className={styles['flex-half']}>
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                size="medium"
                required={!props.isEdit}
                disabled={props.isEdit}
                error={error.password}
                {...register('password', {
                  required: props.isEdit ? false : '필수입력 사항 입니다.',
                })}
              />
            </div>
          </div>
        </div>

        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <Input
            label="제목"
            type="text"
            placeholder="제목을 입력해 주세요."
            size="medium"
            required
            error={error.title}
            {...register('title', {
              required: '필수입력 사항 입니다.',
            })}
          />
        </div>
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>내용</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <Controller
            name="contents"
            control={control}
            rules={{ required: '필수입력 사항 입니다.' }}
            render={({ field }) => (
              <div className={styles.quillWrapper}>
                <ReactQuill
                  theme="snow"
                  value={field.value || ''}
                  onChange={field.onChange}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="내용을 입력해 주세요."
                  className={styles.quillEditor}
                />
              </div>
            )}
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
            {...register('addressDetail')}
          />
        </div>
        {/* border */}
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <Input
            label="유튜브 링크"
            type="text"
            placeholder="링크를 입력해 주세요."
            size="medium"
            error={error.youtubeUrl}
            {...register('youtubeUrl')}
          />
        </div>

        {/* border */}
        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div>사진 첨부</div>
          {props.isEdit}
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
                      src={
                        imageUrl[idx].startsWith('data:') || imageUrl[idx].startsWith('blob:')
                          ? imageUrl[idx] // base64 또는 blob URL인 경우 그대로 사용 (미리보기)
                          : `https://storage.googleapis.com/${imageUrl[idx]}` // 서버 URL인 경우
                      }
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
        <Button variant="secondary" size="large">
          취소
        </Button>
        <Button
          variant="primary"
          size="large"
          onClick={props.isEdit ? onclickUpdate : onClickSubmit}
          disabled={!checkRegister}
        >
          게시글 {props.isEdit ? '수정' : '등록'}하기
        </Button>
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
