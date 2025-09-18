"use client";

import "./placeSliderSection.css";
import "../../global.css";
import Icon from "@utils/iconColor";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchTravelproductsOfTheBestApi } from "../../commons/apis/product.api";
import { TravelProduct } from "../../_types/product";

export default function PlaceSliderSection() {
  const [bestProducts, setBestProducts] = useState<TravelProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadBestProducts = async () => {
      try {
        setLoading(true);
        
        // 타임아웃을 설정하여 너무 오래 걸리는 요청을 방지
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        
        const dataPromise = fetchTravelproductsOfTheBestApi();
        
        const products = await Promise.race([dataPromise, timeoutPromise]);
        
        if (isMounted) {
          setBestProducts(products as any);
        }
      } catch (error) {
        console.error('베스트 상품 로딩 에러:', error);
        // 에러 발생 시에도 기본 데이터를 보여주도록 함
        if (isMounted) {
          setBestProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBestProducts();
    
    return () => {
      isMounted = false;
    };
  }, []);
  if (loading) {
    return (
      <section className="place_slider_section">
        <div className="place_slider_header">
          <h2 className="place_slider_title b_28_36">2025 끝여름 낭만있게 마무리 하고 싶다면?</h2>
        </div>
        <div className="place_slider_content">
          {/* 스켈레톤 UI */}
          <article className="place_card place_card_1" style={{ backgroundColor: '#f0f0f0', animation: 'pulse 1.5s ease-in-out infinite' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0', borderRadius: '0.8rem' }}></div>
          </article>
          <article className="place_card place_card_2" style={{ backgroundColor: '#f0f0f0', animation: 'pulse 1.5s ease-in-out infinite' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0', borderRadius: '0.8rem' }}></div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="place_slider_section">
      <div className="place_slider_header">
        <h2 className="place_slider_title b_28_36">2025 끝여름 낭만있게 마무리 하고 싶다면?</h2>
      </div>
      <div className="place_slider_content">
        {bestProducts.length > 0 ? (
          bestProducts.slice(0, 2).map((product, index) => (
            <article key={product._id} className={`place_card place_card_${index + 1}`}>
              <Image
                src={product.images?.[0] ? (product.images[0]!.startsWith("http") ? product.images[0]! : `https://storage.googleapis.com/${product.images[0]!.startsWith("/") ? product.images[0]!.slice(1) : product.images[0]}`) : "/images/desktop/a.png"}
                alt={product.name}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{ objectFit: 'cover' }}
              />
              <span className="head_badge">
                <Icon outline default name="bookmark" width={24} height={24} />
                <p className="badge_text me_14_20">{product.pickedCount || 0}</p>
              </span>
              <div className="place_gradient"></div>
              <div className="place_info">
                <p className="place_location sb_14_20">
                  {product.travelproductAddress?.address || "위치 정보 없음"} · {product.seller?.name || "판매자"}
                </p>
                <p className="place_title b_18_24">{product.name}</p>
                <p className="place_subtitle r_14_20">
                  {product.contents.length > 50 
                    ? `${product.contents.substring(0, 50)}...` 
                    : product.contents
                  }
                </p>
              </div>
              <p className="place_price b_16_24">
                {product.price ? `${product.price.toLocaleString()} 원` : "가격 문의"}
              </p>
            </article>
          ))
        ) : (
          // 기본 데이터가 없을 때 기존 하드코딩된 데이터 표시
          <>
            <article className="place_card place_card_1">
              <Image
                src="/images/desktop/a.png"
                alt="포항 숙소"
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{ objectFit: 'cover' }}
              />
              <span className="head_badge">
                <Icon outline default name="bookmark" width={24} height={24} />
                <p className="badge_text me_14_20">24</p>
              </span>
              <div className="place_gradient"></div>
              <div className="place_info">
                <p className="place_location sb_14_20">포항 · 당장 가고 싶은 숙소</p>
                <p className="place_title b_18_24">살아의 실외풀보다 침대가 더 편해서 잠이 잘와요</p>
                <p className="place_subtitle r_14_20">살아의 실외풀보다 침대가 더 편해서 잠이 잘와요</p>
              </div>
              <p className="place_price b_16_24">32,900 원</p>
            </article>

            <article className="place_card place_card_2">
              <Image
                src="/images/desktop/b.png"
                alt="경주 숙소"
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{ objectFit: 'cover' }}
              />
              <span className="head_badge">
                <Icon outline default name="bookmark" width={24} height={24} />
                <p className="badge_text me_14_20">24</p>
              </span>
              <div className="place_gradient"></div>
              <div className="place_info">
                <p className="place_location sb_14_20">경주 · 마침까지 바닷바람이 부는 하얀 숙소</p>
                <p className="place_title b_18_24">살아의 실외풀보다 침대가 더 편해서 잠이 잘와요</p>
                <p className="place_subtitle r_14_20">살아의 실외풀보다 침대가 더 편해서 잠이 잘와요</p>
              </div>
              <p className="place_price b_16_24">32,900 원</p>
            </article>
          </>
        )}
      </div>
    </section>
  );
}   