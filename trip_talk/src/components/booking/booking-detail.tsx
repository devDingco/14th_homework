'use client';

import './booking-detail.css';
import { bookingMock, BookingItem } from './mocks';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import FeedbackForm from '@/commons/feedbackForm/feedbackForm';
import Modal from '@/components/modal/modal';
import GoogleMap from '@/commons/googleMap/GoogleMap';
import { GoogleMapsProvider } from '@/commons/googleMap/GoogleMapsProvider';
import { useState } from 'react';

type ModalType = 'purchase' | 'fail' | null;

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const booking = bookingMock.find((item: BookingItem) => item.id === Number(id));

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOpenPurchaseModal = () => {
    setModalType('purchase');
    setIsOpen(true);
  };

  const handleOpenFailModal = () => {
    setModalType('fail');
  };

  if (!booking) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="booking_detail_wrapper container">
      <div className="booking_detail_header_wrapper">
        <div className="booking_detail_title_wrapper">
          <div className="booking_detail_title b_28_36">{booking.title}</div>
          <div className="booking_detail_button_wrapper">
            <span>
              <Image src="/icons/booking/delete.png" width={24} height={24} alt="delete" />
            </span>
            <span>
              <Image src="/icons/booking/link.png" width={24} height={24} alt="link" />
            </span>
            <span>
              <Image src="/icons/booking/location.png" width={24} height={24} alt="location" />
            </span>
            <span className="booking_float_wrapper">
              <Image src="/icons/booking/bookmark.png" width={18} height={18} alt="bookmark" />
              <span className="booking_icon me_14_20">24</span>
            </span>
          </div>
        </div>
        <div className="booking_detail_subtitle me_16_24">{booking.subtitle}</div>
        <div className="booking_detail_tags me_16_20">#6인 이하 #건식 사우나 #애견동반 가능</div>
      </div>
      <div className="booking_detail_content_wrapper">
        <div className="booking_detail_content_container">
          {/* 이미지섹션 */}
          <div className="booking_detail_image_wrapper">
            <div className="booking_detail_main_image">메인이미지</div>
            <div className="booking_detail_vertical_image_wrapper">
              <div className="booking_detail_vertical_image">세로이미지</div>
              <div className="booking_detail_vertical_image">세로이미지</div>
              <div className="booking_detail_vertical_image">세로이미지</div>
              <div className="booking_detail_vertical_image">세로이미지</div>
            </div>
          </div>
          <hr className="booking_detail_divider" />
          {/* 설명섹션 */}
          <div className="booking_detail_description_wrapper">
            <div className="booking_detail_title b_20_28">상세 설명</div>
            <div className="booking_detail_description_content r_16_24">{booking.content}</div>
          </div>
          <hr className="booking_detail_divider" />
          <div className="booking_detail_description_wrapper">
            <div className="booking_detail_title b_20_28">상세 위치</div>
            <GoogleMapsProvider>
              <GoogleMap
                latitude={booking.latitude || 0}
                longitude={booking.longitude || 0}
                title={booking.title}
                className="booking-detail-map"
                readOnly={true}
              />
            </GoogleMapsProvider>
          </div>
        </div>

        {/* 구매섹션 */}
        <div className="booking_detail_purchase_wrapper">
          <div className="booking_detail_purchase_button_wrapper">
            <div className="b_24_32">{booking.price}</div>
            <ul>
              <li className="booking_detail_purchase_info r_14_20">
                숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
              </li>
              <li className="booking_detail_purchase_info r_14_20">상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
            </ul>
            <button className="booking_detail_purchase_button sb_20_24" onClick={handleOpenPurchaseModal}>
              구매하기
            </button>
          </div>
          <div className="booking_detail_seller_wrapper">
            <div className="b_20_28">판매자</div>
            <div className="booking_detail_seller_info">
              <Image src={'/images/profile/profile09.png'} width={40} height={40} alt="seller profile" />
              <span className="booking_detail_seller_name me_16_20">{booking.seller}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 문의하기 섹션 */}
      <FeedbackForm type="문의하기" />

      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={onClose} type={modalType} handleOpenFailModal={handleOpenFailModal} />
    </div>
  );
}
