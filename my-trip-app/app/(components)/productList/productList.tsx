"use client";

import "./productList.css";
import "../../global.css";
import Icon from "@utils/iconColor";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useProductList } from "../../commons/hooks/useProductList";
import ProductListSkeleton from "./ProductListSkeleton";

export default function ProductList() {
  const { products, loading, loadingMore, error, hasMore, loadMore, refresh } = useProductList();

  const navItems = [
    { name: "single_person_accommodation", label: "1인 전용" },
    { name: "apartment", label: "아파트" },
    { name: "hotel", label: "호텔" },
    { name: "camp", label: "캠핑" },
    { name: "room_service", label: "룸 서비스 가능" },
    { name: "fire", label: "불멍" },
    { name: "_spa", label: "반신욕&스파" },
    { name: "house_on_the_sea", label: "바다 위 숙소" },
    { name: "planterior", label: "플랜테리어" },
  ];

  // 로딩 중일 때 스켈레톤 표시
  if (loading) {
    return <ProductListSkeleton />;
  }

  // 에러 발생 시 에러 메시지와 재시도 버튼 표시
  if (error) {
    return (
      <section className="product_list_section">
        <div className="error_container">
          <p className="error_message">상품을 불러오는데 실패했습니다.</p>
          <p className="error_detail">{error}</p>
          <button onClick={refresh} className="retry_button">
            다시 시도
          </button>
        </div>
      </section>
    );
  }
  return (
    <section className="product_list_section">
      <div className="product_list_header">
        <nav aria-label="category">
          <ul className="nav_container">
            {navItems.map((item) => (
              <li key={item.name} className="nav_item">
                <Icon outline default name={item.name} width={40} height={40} />
                <p className="nav_item_text me_16_24">{item.label}</p>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {products.length > 0 ? (
        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="infinite_scroll_loader">
              <div className="loader_grid">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="skeleton_product_card">
                    <div className="skeleton_thumbnail_wrap">
                      <div className="skeleton_thumbnail"></div>
                    </div>
                    <div className="skeleton_product_body">
                      <div className="skeleton_text skeleton_title"></div>
                      <div className="skeleton_text skeleton_subtitle"></div>
                      <div className="skeleton_text skeleton_price"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          endMessage={
            <div className="infinite_scroll_end">
              <p className="end_message">모든 상품을 확인했습니다! 🎉</p>
            </div>
          }
          scrollThreshold={0.8}
          className="infinite_scroll_container"
        >
          <div className="product_grid">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="product_card_link">
                <article className="product_card">
                  <div className="product_thumbnail_wrap">
                    <Image
                      className="product_thumbnail"
                      src={product.image}
                      alt={product.title}
                      width={384}
                      height={384}
                      priority={parseInt(product.id) <= 4}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <span className="head_badge">
                      <Icon outline default name="bookmark" width={20} height={20} />
                      <p className="badge_text me_14_20">{product.bookmarkCount}</p>
                    </span>
                  </div>
                  <div className="product_body">
                    <div className="product_info">
                      <p className="product_title b_16_24">{product.title}</p>
                      <p className="product_subtitle r_14_20">{product.subtitle}</p>
                      <div className="product_tags">
                        {product.tags.length > 0 ? (
                          product.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span key={tagIndex} className="product_tag me_14_20">
                              {tag.startsWith('#') ? tag : `#${tag}`}
                            </span>
                          ))
                        ) : (
                          <span className="product_tag me_14_20">#여행</span>
                        )}
                      </div>
                      <div className="product_footer">
                        <div className="host_info">
                          <Image 
                            className="host_avatar"
                            src={product.hostAvatar}
                            alt={product.host}
                            width={24}
                            height={24}
                            priority={false}
                            loading="lazy"
                          />
                          <span className="r_14_20">{product.host}</span>
                        </div>
                        <p className="product_price sb_16_24">{product.price}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="no_products">
          <p className="no_products_message">등록된 상품이 없습니다.</p>
        </div>
      )}
    </section>
  );
}



