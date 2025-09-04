'use client';

import '@/components/booking/new/booking-register.css';
import { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Image from 'next/image';
import GoogleMap from '@/commons/googleMap/GoogleMap';
import { GoogleMapsProvider } from '@/commons/googleMap/GoogleMapsProvider';
import { geocodeApi, apiUtils } from '@/lib/api/apiClient';
import { useCreateBooking } from '@/hooks/useGraphQL';
import { useFileUpload } from '@/hooks/useFileUpload';

const scriptUrl = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;

export default function BookingRegisterWithApi() {
  // 필수 입력값들
  const [productName, setProductName] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // 선택 입력값들
  const [tags, setTags] = useState('');
  const [postCode, setPostCode] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // 파일 업로드 훅 사용
  const {
    files,
    previewUrls,
    uploadedFiles,
    isUploading: isFileUploading,
    error: fileError,
    addFiles,
    removeFile,
    clearFiles,
    uploadAllFiles,
    fileCount,
    hasFiles,
  } = useFileUpload({
    maxFiles: 5,
    maxSize: 10,
    compress: true,
  });

  // GraphQL 뮤테이션 사용
  const [createBooking, { loading: isCreating }] = useCreateBooking();

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 필수 필드가 모두 채워졌는지 확인
  const isFormValid =
    productName.trim() !== '' &&
    summary.trim() !== '' &&
    description.trim() !== '' &&
    price.trim() !== '' &&
    postCode.trim() !== '';

  // 서버 API Route 통해 좌표 가져오기 (개선된 버전)
  const getLatLngFromAddress = async (addr: string) => {
    try {
      console.log('좌표 변환 시작:', addr);

      const response = await apiUtils.retry(async () => {
        return await geocodeApi.get(`/geocode?address=${encodeURIComponent(addr)}`);
      });

      if (apiUtils.validateResponse(response) && response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        console.log('좌표 변환 성공:', location);
        setLatitude(String(location.lat));
        setLongitude(String(location.lng));
      } else {
        console.error('Geocoding 실패:', response.data);
        alert('좌표를 가져오지 못했습니다: ' + response.data.status);
      }
    } catch (err) {
      console.error('주소 좌표 변환 실패:', err);
      alert('주소를 좌표로 변환하는데 실패했습니다.');
    }
  };

  const open = useDaumPostcodePopup(scriptUrl);

  // 다음 주소 검색
  const handlePostCode = () => {
    open({
      onComplete: (data: any) => {
        setPostCode(data.zonecode);
        getLatLngFromAddress(data.roadAddress);
      },
    });
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      addFiles([file]);
    }
  };

  // 파일 입력 트리거
  const triggerFileInput = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  // 사진 제거
  const removeImage = (index: number) => {
    removeFile(index);
  };

  // 새로운 사진 슬롯 추가 (최대 5개)
  const addNewPhotoSlot = () => {
    if (fileCount < 5) {
      triggerFileInput(fileCount);
    }
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    try {
      // 1. 파일 업로드 (있는 경우)
      let imageUrls: string[] = [];
      if (hasFiles) {
        const uploadedFiles = await uploadAllFiles();
        imageUrls = uploadedFiles.map((file) => file.url);
      }

      // 2. 예약 생성
      const bookingData = {
        productName,
        summary,
        description,
        price: parseInt(price),
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        address: `${postCode} ${addressDetail}`,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        images: imageUrls,
      };

      const result = await createBooking({
        variables: {
          createBookingInput: bookingData,
        },
      });

      if (result.data) {
        alert('예약이 성공적으로 등록되었습니다!');
        // 성공 후 페이지 이동 또는 폼 초기화
      }
    } catch (error) {
      console.error('예약 등록 실패:', error);
      alert('예약 등록에 실패했습니다.');
    }
  };

  return (
    <div className="container">
      <div className="booking_form_title">
        <h1 className="b_28_36">예약 등록</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 필수 정보 섹션 */}
        <div className="booking_form_input_item">
          <label className="booking_form_label">
            상품명 <span>*</span>
          </label>
          <input
            type="text"
            className="booking_form_input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="상품명을 입력해주세요."
          />
        </div>

        <div className="booking_form_input_item">
          <label className="booking_form_label">
            요약 <span>*</span>
          </label>
          <input
            type="text"
            className="booking_form_input"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="상품 요약을 입력해주세요."
          />
        </div>

        <div className="booking_form_input_item">
          <label className="booking_form_label">
            상세 설명 <span>*</span>
          </label>
          <textarea
            className="booking_form_textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상세 설명을 입력해주세요."
          />
        </div>

        <div className="booking_form_input_item">
          <label className="booking_form_label">
            가격 <span>*</span>
          </label>
          <input
            type="number"
            className="booking_form_input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격을 입력해주세요."
          />
        </div>

        <div className="booking_form_input_item">
          <label className="booking_form_label">태그</label>
          <input
            type="text"
            className="booking_form_input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="태그를 쉼표로 구분하여 입력해주세요."
          />
        </div>

        <hr className="booking_form_divider" />

        {/* 주소 섹션 */}
        <div className="booking_form_address_wrapper">
          <div className="booking_form_string_section">
            <div className="booking_form_address_item">
              <label className="booking_form_label">
                우편번호 <span>*</span>
              </label>
              <div className="booking_form_postCode_wrapper">
                <input
                  type="text"
                  className="booking_form_postCode_input"
                  value={postCode}
                  readOnly
                  placeholder="우편번호"
                />
                <button type="button" className="booking_form_postCode_button" onClick={handlePostCode}>
                  주소 검색
                </button>
              </div>
            </div>

            <div className="booking_form_location_item">
              <label className="booking_form_label">상세주소</label>
              <input
                type="text"
                className="booking_form_input"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                placeholder="상세주소를 입력해주세요."
              />
            </div>
          </div>

          <div className="booking_form_map_section">
            <div className="booking_form_map">
              <GoogleMapsProvider>
                <GoogleMap
                  latitude={latitude ? parseFloat(latitude) : 37.5665}
                  longitude={longitude ? parseFloat(longitude) : 126.978}
                  zoom={15}
                />
              </GoogleMapsProvider>
            </div>
          </div>
        </div>

        <hr className="booking_form_divider" />

        {/* 사진 업로드 섹션 */}
        <div className="booking_form_input_item">
          <div className="booking_form_input_item_title">
            <label className="booking_form_label me_16_24">사진 첨부</label>
          </div>
          <div className="booking_form_photo_wrapper_section">
            {/* 기존 파일 업로드 UI */}
            {Array.from({ length: Math.max(1, fileCount + (fileCount < 5 ? 1 : 0)) }, (_, index) => (
              <div key={index}>
                <input
                  type="file"
                  ref={(el) => {
                    fileInputRefs.current[index] = el;
                  }}
                  className="booking_form_file_input"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, index)}
                />
                <div className="booking_form_photo_wrapper" onClick={() => triggerFileInput(index)}>
                  {previewUrls[index] ? (
                    <>
                      <Image
                        src={previewUrls[index]}
                        alt={`Preview ${index + 1}`}
                        width={160}
                        height={160}
                        className="booking_form_photo_preview"
                      />
                      <button
                        type="button"
                        className="booking_form_photo_remove"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <Image src={'/icons/close.png'} alt="remove" width={16} height={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Image src={'/icons/add.png'} alt="photo" width={40} height={40} />
                      <div className="booking_form_photo_text r_16_24">클릭해서 사진 업로드</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 파일 업로드 에러 표시 */}
          {fileError && <div style={{ color: 'red', marginTop: '0.5rem' }}>{fileError}</div>}
        </div>

        {/* 버튼 섹션 */}
        <div className="booking_form_button_wrapper">
          <button type="button" className="booking_form_button cancel" onClick={() => window.history.back()}>
            취소
          </button>
          <button
            type="submit"
            className="booking_form_button"
            disabled={!isFormValid || isCreating || isFileUploading}
          >
            {isCreating || isFileUploading ? '처리 중...' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
