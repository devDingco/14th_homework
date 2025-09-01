'use client';

import '@/components/booking/new/booking-register.css';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';

const scriptUrl = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;

declare global {
  interface Window {
    google: any;
  }
}

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

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 필수 필드가 모두 채워졌는지 확인
  const isFormValid =
    productName.trim() !== '' &&
    summary.trim() !== '' &&
    description.trim() !== '' &&
    price.trim() !== '' &&
    postCode.trim() !== '';

  // 구글 지도 초기화
  const initMap = (lat: number, lng: number) => {
    if (!mapRef.current || !window.google?.maps) {
      console.log('맵 초기화 실패: mapRef 또는 Google Maps API 없음');
      return;
    }

    try {
      console.log('맵 초기화 시작:', { lat, lng });
      const center = { lat, lng };

      // 기존 맵이 있다면 제거
      if (mapInstance.current) {
        mapInstance.current = null;
      }

      // 맵 컨테이너 내부 텍스트 제거
      const mapContainer = mapRef.current;
      while (mapContainer.firstChild) {
        mapContainer.removeChild(mapContainer.firstChild);
      }

      mapInstance.current = new window.google.maps.Map(mapContainer, {
        zoom: 15,
        center,
        mapTypeId: 'roadmap',
      });

      new window.google.maps.Marker({
        position: center,
        map: mapInstance.current,
        title: '선택된 위치',
      });

      console.log('맵 초기화 완료');
    } catch (error) {
      console.error('맵 초기화 중 오류:', error);
    }
  };

  // 서버 API Route 통해 좌표 가져오기
  const getLatLngFromAddress = async (addr: string) => {
    try {
      console.log('좌표 변환 시작:', addr);
      const res = await fetch(`/apis/geocode?address=${encodeURIComponent(addr)}`);
      const result = await res.json();
      console.log('API 응답:', result);

      if (result.status === 'OK') {
        const location = result.results[0].geometry.location;
        console.log('좌표 변환 성공:', location);
        setLatitude(String(location.lat));
        setLongitude(String(location.lng));
        initMap(location.lat, location.lng);
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

  // 구글 지도 스크립트 로드
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise((resolve) => {
        const existingScript = document.getElementById('google-map-script');
        if (existingScript) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.id = 'google-map-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('구글 맵 스크립트 로드 완료');
          resolve(true);
        };
        script.onerror = () => {
          console.error('구글 맵 스크립트 로드 실패');
          resolve(false);
        };
        document.head.appendChild(script);
      });
    };

    loadGoogleMapsScript();
  }, []);

  // 좌표가 변경될 때마다 지도 업데이트
  useEffect(() => {
    if (latitude && longitude && window.google?.maps) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        // 약간의 지연을 두어 DOM이 준비될 때까지 기다림
        setTimeout(() => {
          initMap(lat, lng);
        }, 100);
      }
    }
  }, [latitude, longitude]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, []);

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
          <div className="booking_form_map" ref={mapRef}>
            <div>
              {!latitude ||
                (!longitude && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1,
                    }}
                    className="me_14_20"
                  >
                    주소를 먼저 입력해 주세요.
                  </div>
                ))}
            </div>
          </div>
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
