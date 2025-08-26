'use client';

import { useState } from 'react';
import './booking.css';
import Image from 'next/image';
import { bookingMock } from './mocks';
import { useRouter } from 'next/navigation';

export default function Booking() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('available');
  const [searchDate, setSearchDate] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = () => {
    console.log('검색:', { date: searchDate, text: searchText });
  };

  const handleSellVoucher = () => {
    console.log('숙박권 판매하기 클릭');
  };

  const handleCategoryClick = (category) => {
    console.log('카테고리 선택:', category);
  };

  const handleAccommodationClick = (id) => {
    router.push(`/booking/${id}`);
  };
  return (
    <>
      <div className="booking_wrapper container">
        {/* 상단 프로모션 배너 섹션 */}
        <section className="booking_promotion">
          <div className="booking_title b_28_36">2024 끝여름 낭만있게 마무리 하고 싶다면?</div>
          <div className="booking_featured">
            <div className="booking_card">
              <div className="booking_card_image pohang">
                <div className="booking_float">
                  <Image src="/icons/booking/bookmark.png" width={24} height={24} />
                  <span className="booking_icon me_14_20">24</span>
                </div>
                <div className="booking_card_content">
                  <div className="booking_card_title b_24_32">포항 : 당장 가고 싶은 숙소</div>
                  <p className="booking_card_description me_20_24">
                    살어리 살어리랏다 청산(靑山)에 살어리랏다멀위랑 드래랑 먹고 청산(靑....
                  </p>
                  <div className="booking_price b_24_32">32,900원</div>
                </div>
              </div>
            </div>
            <div className="booking_card">
              <div className="booking_card_image gangneung">
                <div className="booking_float">
                  <Image src="/icons/booking/bookmark.png" width={24} height={24} />
                  <span className="booking_icon me_14_20">24</span>
                </div>
                <div className="booking_card_content">
                  <div className="booking_card_title b_24_32">강릉 : 마음까지 깨끗해지는 하얀 숙소</div>
                  <p className="booking_card_description me_20_24">살어리 살어리랏다 강릉에 평생 살어리랏다</p>
                  <div className="booking_price b_24_32">32,900원</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 특별 오퍼 배너 */}
        <section className="booking_special">
          {/* <Image src="/images/booking/banner.png" alt="솔로트립 전시회" fill /> */}
        </section>

        {/* 여기에서만 예약할 수 있는 숙소 섹션 */}
        <section className="booking_exclusive">
          <h2 className="b_28_36">여기에서만 예약할 수 있는 숙소</h2>

          {/* 탭 */}
          <div className="booking_tabs">
            <button
              className={`booking_tab ${activeTab === 'available' ? 'active sb_16_24' : 'me_16_24'}`}
              onClick={() => handleTabClick('available')}
            >
              예약 가능 숙소
            </button>
            <button
              className={`booking_tab ${activeTab === 'soldout' ? 'active sb_16_24' : 'me_16_24'}`}
              onClick={() => handleTabClick('soldout')}
            >
              예약 마감 숙소
            </button>
          </div>

          {/* 검색 및 필터 */}
          <div className="booking_search">
            <div className="booking_search_inputs">
              <div className="booking_date_input">
                <Image src="/icons/calendar_icon.png" width={24} height={24} />
                <input
                  className="r_16_24"
                  type="text"
                  placeholder="YYYY.MM.DD - YYYY.MM.DD"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <div className="booking_text_input">
                <Image src="/icons/search_icon.png" width={24} height={24} />
                <input
                  className="r_16_24"
                  type="text"
                  placeholder="제목을 검색해주세요."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <button className="booking_search_btn sb_18_24" onClick={handleSearch}>
                검색
              </button>
            </div>
            <button className="booking_sell_btn sb_18_24" onClick={handleSellVoucher}>
              <Image src="/icons/write_icon.png" width={24} height={24} />
              숙박권 판매하기
            </button>
          </div>

          {/* 카테고리 아이콘 */}
          <div className="booking_categories">
            <div className="booking_category" onClick={() => handleCategoryClick('single')}>
              <Image src="/icons/booking/single_person.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">1인 전용</span>
            </div>
            <div className="booking_category" onClick={() => handleCategoryClick('apartment')}>
              <Image src="/icons/booking/apartment.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">아파트</span>
            </div>
            <div className="booking_category" onClick={() => handleCategoryClick('hotel')}>
              <Image src="/icons/booking/hotel.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">호텔</span>
            </div>
            <div className="booking_category" onClick={() => handleCategoryClick('camping')}>
              <Image src="/icons/booking/camp.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">캠핑</span>
            </div>
            <div className="booking_category" onClick={() => handleCategoryClick('roomservice')}>
              <Image src="/icons/booking/room_service.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">룸서비스 가능</span>
            </div>
            <div className="booking_category" onClick={() => handleCategoryClick('glamping')}>
              <Image src="/icons/booking/fire.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">불멍</span>
            </div>
            <div className="booking_category" onClick={() => handleCategoryClick('spa')}>
              <Image src="/icons/booking/spa.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">반신욕&스파</span>
            </div>
            <div className="booking_category" onClick={() => handleCategoryClick('sea')}>
              <Image src="/icons/booking/hotel_sea.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">바다 위 숙소</span>
            </div>
            <div className="booking_category" onClick={() => handleCategoryClick('plant')}>
              <Image src="/icons/booking/plant.png" width={40} height={40} />
              <span className="booking_category_text me_16_24">플랜테리어</span>
            </div>
          </div>

          {/* 숙소 리스트 그리드 */}
          <div className="booking_grid">
            {bookingMock.map((item, index) => (
              <div key={index} className="booking_item" onClick={() => handleAccommodationClick(item.id)}>
                <div className="booking_item_image">
                  <div className="booking_float">
                    <Image src="/icons/booking/bookmark.png" width={24} height={24} />
                    <span className="booking_icon me_14_20">24</span>
                  </div>
                </div>
                <div className="booking_item_content">
                  <p className="booking_item_title me_16_24">{item.title}</p>
                  <p className="booking_description r_14_20">{item.subtitle}</p>
                  <p className="booking_tags r_14_20">#6년 이하 #건식 사우나 #애견동반가능</p>
                  <div className="booking_provider_wrapper">
                    <div className="booking_provider_info">
                      <Image src="/images/profile/profile04.png" width={24} height={24} />
                      <p className="booking_provider l_14_20">{item.seller}</p>
                    </div>
                    <span className="booking_item_price b_16_24">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 우측 사이드바 - 최근 본 상품 */}
        <aside className="booking_recent">
          <div className="me_14_20">최근 본 상품</div>
          <div className="booking_recent_items">
            <div className="booking_recent_item">
              <Image src="/images/booking/gangneung.png" alt="최근 본 상품 1" width={72} height={72} />
            </div>
            <div className="booking_recent_item">
              <Image src="/images/booking/c.png" alt="최근 본 상품 2" width={72} height={72} />
            </div>
            <div className="booking_recent_item">
              <Image src="/images/booking/d.png" alt="최근 본 상품 3" width={72} height={72} />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
