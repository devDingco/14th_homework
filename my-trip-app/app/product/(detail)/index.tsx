"use client";

import "./index.css";
import "../../global.css";
import Image from "next/image";
import Icon from "@utils/iconColor";
import { useState } from "react";

export default function ProductDetail({ id }: { id: string }) {
  const galleryImages = [
    "/images/desktop/a.png",
    "/images/desktop/b.png",
    "/images/desktop/c.png",
    "/images/desktop/d.png",
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="product_detail_section">
      <header className="detail_header">
        <h1 className="b_24_32">포항 : 숙박권 명이 여기에 들어갑니다</h1>
        <p className="r_14_20 detail_subtext">예약 전 반드시 숙소 규정을 확인하세요</p>
      </header>

      <div className="detail_grid">
        <div className="detail_left">
          <div className="gallery_grid">
            <div className="main_image_wrap">
              <Image
                className="main_image"
                src={galleryImages[selectedIndex]}
                alt="product main"
                width={936}
                height={702}
                priority
              />
            </div>
            <aside className="thumbs_aside">
              <ul className="thumb_list thumb_list_vertical" aria-label="gallery thumbnails">
                {galleryImages.map((src, index) => (
                  <li key={src} className="thumb_item">
                    <button
                      type="button"
                      className={`thumb_button ${index === selectedIndex ? "active" : ""}`}
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`썸네일 ${index + 1}`}
                    >
                      <Image className="thumb_image" src={src} alt="thumbnail" width={184} height={160} />
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="detail_section">
            <h2 className="b_18_24 section_title">상세 설명</h2>
            <div className="section_body r_14_20">
              <p>
                살어리 살어리랏다 청산에 살어리랏다. 멀위랑 다래랑 먹고 청산에 살어리랏다.
                살어리 살어리랏다 강나래 우니렁 쉬여가며 살어리 살어리랏다.
              </p>
              <br />
              <p>
                아늑하고 편안한 휴식을 위한 프라이빗한 공간. 대형 통창으로 들어오는 햇살과 플랜테리어의 조화가 매력적인 숙소입니다.
                인근 카페와 맛집, 바다가 가까워 도보로 충분히 즐길 수 있어요.
              </p>
              <br />
              <ul className="bullet_list">
                <li>기본 2인 기준, 최대 6인까지 이용 가능</li>
                <li>침실 2, 거실 1, 욕실 1, 주방 1</li>
                <li>반려동물 동반 가능 (사전 문의 필수)</li>
                <li>건식 사우나, 야외 바비큐 시설</li>
              </ul>
            </div>
          </section>

          <section className="detail_section">
            <h2 className="b_18_24 section_title">상세 위치</h2>
            <div className="map_wrap">
              <iframe
                title="map"
                className="map_iframe"
                src="https://www.google.com/maps?q=Seoul&output=embed"
                loading="lazy"
              />
            </div>
          </section>
        </div>

        <aside className="detail_right">
          <div className="sticky_card">
            <div className="card_head">
              <div className="action_buttons">
                <button className="btn-outline icon_btn" type="button">
                  <Icon outline default name="link" width={20} height={20} />
                  <span className="me_14_20">공유</span>
                </button>
                <button className="btn-outline icon_btn" type="button" aria-label="북마크">
                  <Icon outline default name="bookmark" width={20} height={20} />
                </button>
              </div>
            </div>

            <div className="price_row">
              <p className="sb_18_24">32,500원</p>
              <span className="me_14_20 price_note">부가세 포함</span>
            </div>

            <button className="btn btn-primary buy_btn" type="button">구매하기</button>

            <div className="divider" />

            <div className="seller_box">
              <p className="b_16_24 seller_title">판매자</p>
              <div className="seller_info">
                <Image className="seller_avatar" src="/images/mobile/profile/img.png" alt="host" width={32} height={32} />
                <span className="me_16_24">홍길동</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}