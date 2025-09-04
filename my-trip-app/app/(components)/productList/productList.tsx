import "./productList.css";
import "../../global.css";
import Icon from "@utils/iconColor";
import Image from "next/image";
import Link from "next/link";

export default function ProductList() {
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

  // 임시 상품 데이터 (실제로는 API에서 가져올 데이터)
  const products = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: "살어리 살어리랏다 청산(靑山)에 살어리랏다...",
    subtitle: "살어리 살어리랏다 청산(靑山)에 살어리랏다뫼위랑...",
    price: "32,900 원",
    bookmarkCount: 24,
    host: "빈안토리",
    tags: ["#6인 이하", "#건식 사우나", "#애견동반 가능"],
    image: "/images/desktop/a.png",
    hostAvatar: "/images/mobile/profile/img.png"
  }));
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

      <div className="product_grid">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="product_card_link">
            <article className="product_card">
              <div className="product_thumbnail_wrap">
                <Image
                  className="product_thumbnail"
                  src={product.image}
                  alt="product"
                  width={384}
                  height={384}
                  priority={false}
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
                    {product.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="product_tag me_14_20">{tag}</span>
                    ))}
                  </div>
                  <div className="product_footer">
                    <div className="host_info">
                      <Image 
                      className="host_avatar"
                      src={product.hostAvatar}
                      alt="host"
                      width={24}
                      height={24}
                      priority={false}
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
    </section>
  );
}



