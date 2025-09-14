"use client";

import "./index.css";
import "../../global.css";
import Image from "next/image";
import Icon from "@utils/iconColor";
import { useProductDetail } from "../../commons/hooks/useProductDetail";
import type { ProductDetailProps } from "../../_types/product";

export default function ProductDetail({ id }: ProductDetailProps) {
  const {
    galleryImages,
    selectedIndex,
    setSelectedIndex,
    productData,
    handleBookmark,
    handleDelete,
    handleLink,
    handleLocation
  } = useProductDetail(id);

  return (
    <section className="product_detail_section">
      <header className="detail_header">
        <div className="title_section">  
        <h1 className="b_24_32">{productData.title}</h1>
        <p className="r_14_20 detail_subtext">{productData.subtitle}</p>
        </div>
           <div className="action_buttons">
                <button className="icons icon_btn " type="button" onClick={handleDelete}>
                  <Icon outline black name="delete" width={24} height={24} />
                </button>
                <button className="icons icon_btn " type="button" onClick={handleLink}>
                  <Icon outline black name="link" width={24} height={24} />
                </button>
                <button className="icons icon_btn " type="button" onClick={handleLocation}>
                  <Icon outline black name="location" width={24} height={24} />
                </button>
                <button  id="bookmark_btn" className="icon_btn" type="button" aria-label="북마크" onClick={handleBookmark}>
                  <Icon outline default name="bookmark" width={24} height={24} />
                  <span className="me_14_20">{productData.bookmarkCount}</span>
                </button>
              </div>
      </header>

      <div className="detail_grid">
        <div className="detail_left">
          <div className="gallery">
            <div className="main_image_wrap">
              <Image
                className="main_image"
                src={galleryImages[selectedIndex]}
                alt="product main"
                width={640}
                height={480}
                priority={false}
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
                      <Image className="thumb_image" src={src} alt="thumbnail" width={180} height={136} priority={false} />
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
          <div className="divider"/>
          <section className="detail_section">
            <h2 className="b_18_24 section_title">상세 설명</h2>
            <div className="section_body r_14_20">
              <p>{productData.description}</p>
              <br />
              <p>{productData.additionalInfo}</p>
              <br />
              <ul className="bullet_list">
                {productData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </section>
          <div className="divider"/>
          <section className="detail_section">
            <h2 className="b_18_24 section_title">상세 위치</h2>
            <div className="map_wrap">
              <iframe
                title="map"
                className="map_iframe"
                src={productData.mapUrl}
                loading="lazy"
              />
            </div>
          </section>
        
        </div>

        <aside className="detail_right">
          <div className="sticky_card">
            <div className="card_head">
            </div>

            <div className="price_row">
              <p className="sb_18_24">{productData.price}</p>
                <ul className="price_note">
                  <li>부가세 포함</li>
                  <li className="two_cols">예약 전 반드시 숙소 규정을 확인하세요</li>
                </ul>
            </div>

            <button className="btn-primary" type="button">구매하기</button>

            </div>
            <div className="seller_box">
              <p className="b_20_28 seller_title">판매자</p>
              <div className="seller_info">
                <Image className="seller_avatar" src={productData.seller.avatar} alt="host" width={40} height={40} priority={false} />
                <span className="me_16_24">{productData.seller.name}</span>
              </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
