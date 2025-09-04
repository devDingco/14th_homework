'use client';

import '@/components/booking/new/booking-register.css';
import { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Image from 'next/image';
import GoogleMap from '@/commons/googleMap/GoogleMap';
import { GoogleMapsProvider } from '@/commons/googleMap/GoogleMapsProvider';

const scriptUrl = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;

export default function BookingRegister() {
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
  const [images, setImages] = useState<File[]>([]);

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 필수 필드가 모두 채워졌는지 확인
  const isFormValid =
    productName.trim() !== '' &&
    summary.trim() !== '' &&
    description.trim() !== '' &&
    price.trim() !== '' &&
    postCode.trim() !== '';

  // 서버 API Route 통해 좌표 가져오기
  const getLatLngFromAddress = async (addr: string) => {
    try {
      console.log('좌표 변환 시작:', addr);
      const res = await fetch(`/api/geocode?address=${encodeURIComponent(addr)}`);
      const result = await res.json();
      console.log('API 응답:', result);

      if (result.status === 'OK') {
        const location = result.results[0].geometry.location;
        console.log('좌표 변환 성공:', location);
        setLatitude(String(location.lat));
        setLongitude(String(location.lng));
      } else {
        console.error('Geocoding 실패:', result);
        alert('좌표를 가져오지 못했습니다: ' + result.status);
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

  // 사진 업로드 핸들러
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  // 파일 입력 트리거
  const triggerFileInput = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  // 사진 제거
  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // 새로운 사진 슬롯 추가 (최대 5개)
  const addNewPhotoSlot = () => {
    if (images.length < 5) {
      setImages([...images, null as any].filter(Boolean));
    }
  };

  return (
    <div className="container">
      <div className="booking_form_title b_20_28">숙박권 판매하기</div>
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">
            상품명 <span>*</span>
          </label>
        </div>
        <input
          type="text"
          placeholder="상품명을 입력해 주세요."
          className="booking_form_input r_16_24"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">
            한줄요약 <span>*</span>
          </label>
        </div>
        <input
          type="text"
          placeholder="상품을 한줄로 요약해 주세요."
          className="booking_form_input r_16_24"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">
            상품 설명 <span>*</span>
          </label>
        </div>
        {/* 에디터 영역 - 무슨 에디터 인지 확인 후 추가 예정 */}
        <textarea
          className="booking_form_textarea"
          placeholder="상품 설명을 입력해 주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">
            판매 가격 <span>*</span>
          </label>
        </div>
        <input
          type="text"
          placeholder="판매 가격을 입력해 주세요. (원 단위)"
          className="booking_form_input r_16_24"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">태그 입력</label>
        </div>
        <input
          type="text"
          placeholder="태그를 입력해 주세요."
          className="booking_form_input r_16_24"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_address_wrapper">
        {/* 주소 섹션 */}
        <div className="booking_form_string_section">
          <div className="booking_form_address_item">
            <label className="booking_form_label me_16_24">
              주소 <span>*</span>
            </label>
            <div className="booking_form_postCode_wrapper">
              <input
                type="text"
                placeholder="01234"
                className="booking_form_postCode_input r_16_24"
                value={postCode}
                readOnly
              />
              <button type="button" className="booking_form_postCode_button sb_18_24" onClick={() => handlePostCode()}>
                우편번호 검색
              </button>
            </div>
            <input
              type="text"
              placeholder="상세주소를 입력해 주세요."
              className="booking_form_input r_16_24"
              style={{ color: 'var(--black)' }}
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </div>
          {/* 위도, 경도 섹션 */}
          <div className="booking_form_location_item">
            <div>
              <div className="booking_form_input_item">
                <div className="booking_form_input_item_title">
                  <label className="booking_form_label me_16_24">위도(LAT)</label>
                </div>
                <input
                  type="text"
                  placeholder="주소를 먼저 입력해 주세요."
                  className="booking_form_input r_16_24"
                  style={{ color: 'var(--black)', backgroundColor: 'var(--gray-50)', border: 'none' }}
                  value={latitude}
                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="booking_form_input_item">
                <div className="booking_form_input_item_title">
                  <label className="booking_form_label me_16_24">경도(LNG)</label>
                </div>
                <input
                  type="text"
                  placeholder="주소를 먼저 입력해 주세요."
                  className="booking_form_input r_16_24"
                  style={{ color: 'var(--black)', backgroundColor: 'var(--gray-50)', border: 'none' }}
                  value={longitude}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* 상세 위치 섹션 */}
        <div className="booking_form_map_section">
          <label className="booking_form_label me_16_24">상세 위치</label>
          <GoogleMapsProvider>
            <GoogleMap
              latitude={parseFloat(latitude) || 0}
              longitude={parseFloat(longitude) || 0}
              title="선택된 위치"
              className="booking-register-map"
              readOnly={false}
            />
          </GoogleMapsProvider>
        </div>
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">사진 첨부</label>
        </div>
        <div className="booking_form_photo_wrapper_section">
          {/* 동적 사진 업로드 슬롯들 */}
          {Array.from({ length: Math.max(1, images.length + (images.length < 5 ? 1 : 0)) }, (_, index) => (
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
                {images[index] ? (
                  <>
                    <Image
                      src={URL.createObjectURL(images[index])}
                      alt={`업로드된 이미지 ${index + 1}`}
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
                      <Image src={'/icons/close.png'} alt="remove photo" width={16} height={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <Image src={'/icons/add.png'} alt="add photo" width={40} height={40} />
                    <div className="booking_form_photo_text r_16_24">클릭해서 사진 업로드</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="booking_form_button_wrapper">
        <div className="booking_form_button cancel sb_18_24">취소</div>
        <button type="submit" className="booking_form_button sb_18_24" disabled={!isFormValid}>
          등록하기
        </button>
      </div>
    </div>
  );
}
