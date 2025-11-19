'use client';

import styles from './styles.module.css';
import useAccommodationSell from './hook';
import { AccommodationSellVariables } from './types';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Modal } from 'antd';
import Image from 'next/image';
import { Button, Input } from '@commons/ui';
import { useRouter } from 'next/navigation';
import KakaoMap from '@/components/apis/kakao-map';

export default function AccommodationSell(props: AccommodationSellVariables) {
  const router = useRouter();
  const {
    register,
    onClickSubmit,
    onClickUpdate,
    onClickImage,
    onChangeFile,
    deleteImage,
    error,
    isValid,
    imageUrls,
    zipcode,
    address,
    lat,
    lng,
    setValue,
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    fileRefs,
    price,
    handlePriceChange,
    AlertModalComponent,
  } = useAccommodationSell(props);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>숙박권 {props.isEdit ? '수정하기' : '판매하기'}</h1>
      </div>

      <div className={styles.formContainer}>
        {/* 상품명 */}
        <div className={styles.formSection}>
          <Input
            label="상품명"
            type="text"
            placeholder="상품명을 입력해 주세요."
            size="medium"
            required
            error={error.name}
            {...register('name')}
          />
        </div>

        <div className={styles.divider}></div>

        {/* 한줄 요약 */}
        <div className={styles.formSection}>
          <Input
            label="한줄 요약"
            type="text"
            placeholder="상품을 한줄로 요약해 주세요."
            size="medium"
            required
            error={error.summary}
            {...register('summary')}
          />
        </div>

        <div className={styles.divider}></div>

        {/* 상품 설명 */}
        <div className={styles.formSection}>
          <div className={styles.labelRow}>
            <label className={styles.label}>상품 설명</label>
            <span className={styles.required}>*</span>
          </div>
          <div className={styles.editorContainer}>
            <div className={styles.editorToolbar}>
              <div className={styles.toolbarStandard}>
                {/* Text (Formatting) - 168px width */}
                <div className={styles.toolbarGroup}>
                  <button type="button" className={styles.toolbarButton} title="굵게">
                    <Image src="/filled/Vector.svg" alt="굵게" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="기울임">
                    <Image src="/filled/Vector-1.svg" alt="기울임" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="밑줄">
                    <Image src="/filled/Vector-2.svg" alt="밑줄" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="취소선">
                    <Image src="/filled/Vector-3.svg" alt="취소선" width={24} height={24} />
                  </button>
                </div>

                {/* Block (Paragraph) - 168px width */}
                <div className={styles.toolbarGroup}>
                  <button type="button" className={styles.toolbarButton} title="제목 1">
                    <Image src="/filled/Vector-4.svg" alt="제목 1" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="제목 2">
                    <Image src="/filled/Vector-5.svg" alt="제목 2" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="목록">
                    <Image src="/filled/Vector-6.svg" alt="목록" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="인용">
                    <Image src="/filled/Vector-7.svg" alt="인용" width={24} height={24} />
                  </button>
                </div>

                {/* Media (Content) - 168px width */}
                <div className={styles.toolbarGroup}>
                  <button type="button" className={styles.toolbarButton} title="이미지">
                    <Image src="/filled/Vector-8.svg" alt="이미지" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="링크">
                    <Image src="/filled/Vector-9.svg" alt="링크" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="비디오">
                    <Image src="/filled/Vector-10.svg" alt="비디오" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="파일">
                    <Image src="/filled/Vector-11.svg" alt="파일" width={24} height={24} />
                  </button>
                </div>

                {/* More - 120px width */}
                <div className={styles.toolbarGroupMore}>
                  <button
                    type="button"
                    className={`${styles.toolbarButton} ${styles.toolbarButtonDisabled}`}
                    title="왼쪽 정렬"
                  >
                    <Image src="/filled/Vector-12.svg" alt="왼쪽 정렬" width={24} height={24} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.toolbarButton} ${styles.toolbarButtonDisabled}`}
                    title="오른쪽 정렬"
                  >
                    <Image src="/filled/Vector-13.svg" alt="오른쪽 정렬" width={24} height={24} />
                  </button>
                  <button type="button" className={styles.toolbarButton} title="더보기">
                    <Image src="/filled/Vector-14.svg" alt="더보기" width={24} height={24} />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.editorDivider}></div>
            <textarea
              className={styles.editorContent}
              placeholder="내용을 입력해 주세요."
              {...register('description')}
            />
            {error.description && <p className={styles.errorText}>{error.description}</p>}
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* 판매 가격 */}
        <div className={styles.formSection}>
          <Input
            label="판매 가격"
            type="text"
            placeholder="판매 가격을 입력해 주세요. (원 단위)"
            size="medium"
            required
            error={error.price}
            value={price}
            onChange={handlePriceChange}
          />
        </div>

        <div className={styles.divider}></div>

        {/* 태그 입력 */}
        <div className={styles.formSection}>
          <Input
            label="태그 입력"
            type="text"
            placeholder="태그를 입력해 주세요."
            size="medium"
            required
            error={error.tags}
            {...register('tags')}
          />
        </div>

        <div className={styles.divider}></div>

        {/* 주소 및 위치 */}
        <div className={styles.locationSection}>
          <div className={styles.addressSection}>
            {/* 주소 */}
            <div className={styles.formSection}>
              <div className={styles.addressInputGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>주소</label>
                  <span className={styles.required}>*</span>
                </div>
                <div className={styles.zipcodeRow}>
                  <input
                    type="text"
                    className={styles.zipcodeInput}
                    placeholder="01234"
                    value={zipcode}
                    readOnly
                  />
                  <Button variant="secondary" size="medium" onClick={showModal}>
                    우편번호 검색
                  </Button>
                </div>
                {error.zipcode && <p className={styles.errorText}>{error.zipcode}</p>}
              </div>
              <input
                type="text"
                className={styles.addressInput}
                placeholder="상세주소를 입력해 주세요."
                value={address}
                readOnly
              />
              <input
                type="text"
                className={styles.addressInput}
                placeholder="상세주소를 입력해 주세요."
                {...register('addressDetail')}
              />
              {error.address && <p className={styles.errorText}>{error.address}</p>}
            </div>

            {/* 위도/경도 */}
            <div className={styles.formSection}>
              <div className={styles.coordinatesRow}>
                <div className={styles.coordinateInput}>
                  <div className={styles.labelRow}>
                    <label className={styles.label}>위도(LAT)</label>
                    <span className={styles.required}>*</span>
                  </div>
                  <input
                    type="text"
                    className={`${styles.coordinateInputField} ${!address ? styles.disabled : ''}`}
                    placeholder="주소를 먼저 입력해 주세요."
                    disabled={!address}
                    {...register('lat')}
                  />
                  {error.lat && <p className={styles.errorText}>{error.lat}</p>}
                </div>
                <div className={styles.coordinateInput}>
                  <div className={styles.labelRow}>
                    <label className={styles.label}>경도(LNG)</label>
                    <span className={styles.required}>*</span>
                  </div>
                  <input
                    type="text"
                    className={`${styles.coordinateInputField} ${!address ? styles.disabled : ''}`}
                    placeholder="주소를 먼저 입력해 주세요."
                    disabled={!address}
                    {...register('lng')}
                  />
                  {error.lng && <p className={styles.errorText}>{error.lng}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* 상세 위치 (지도) */}
          <div className={styles.mapSectionWrapper}>
            <label className={styles.label}>상세 위치</label>
            <div className={styles.mapContainer}>
              <KakaoMap address={address} lat={lat} lng={lng} height="400px" />
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* 사진 첨부 */}
        <div className={styles.formSection}>
          <div className={styles.labelRow}>
            <label className={styles.label}>사진 첨부</label>
            <span className={styles.required}>*</span>
          </div>
          <div className={styles.imageUploadSection}>
            {Array.from({ length: 8 }).map((_, index) => {
              const imageUrl = imageUrls[index] || '';
              return (
                <div key={index} className={styles.imageUploadWrapper}>
                  <div className={styles.imageUploadButton} onClick={() => onClickImage(index)}>
                    <input
                      type="file"
                      ref={(el) => {
                        if (fileRefs.current) {
                          fileRefs.current[index] = el;
                        } else {
                          fileRefs.current = [];
                          fileRefs.current[index] = el;
                        }
                      }}
                      onChange={onChangeFile(index)}
                      accept="image/jpeg,image/png"
                      style={{ display: 'none' }}
                    />
                    {imageUrl ? (
                      <div className={styles.imagePreview}>
                        <Image
                          src={
                            imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')
                              ? imageUrl // base64 또는 blob URL인 경우 그대로 사용 (미리보기)
                              : `https://storage.googleapis.com/${imageUrl}` // 서버 URL인 경우
                          }
                          alt="미리보기"
                          width={160}
                          height={160}
                          className={styles.previewImage}
                        />
                        <button
                          type="button"
                          className={styles.deleteImageButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteImage(index);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    ) : (
                      <div className={styles.imageUploadPlaceholder}>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        <p>클릭해서 사진 업로드</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {error.images && <p className={styles.errorText}>{error.images}</p>}
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className={styles.buttonContainer}>
        <Button variant="secondary" size="large" onClick={() => router.back()}>
          취소
        </Button>
        <Button
          variant="primary"
          size="large"
          onClick={props.isEdit ? onClickUpdate : onClickSubmit}
          disabled={!isValid || imageUrls.filter((url) => url).length === 0}
        >
          {props.isEdit ? '수정하기' : '등록하기'}
        </Button>
      </div>

      {/* 우편번호 검색 모달 */}
      {isModalOpen && (
        <Modal title="우편번호 검색" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}

      <AlertModalComponent />
    </div>
  );
}
