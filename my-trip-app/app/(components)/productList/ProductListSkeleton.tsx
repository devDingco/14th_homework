import "./productListSkeleton.css";

export default function ProductListSkeleton() {
  // 8개의 스켈레톤 카드 생성
  const skeletonCards = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className="skeleton_product_card">
      <div className="skeleton_thumbnail_wrap">
        <div className="skeleton_thumbnail"></div>
        <div className="skeleton_badge">
          <div className="skeleton_icon"></div>
          <div className="skeleton_text skeleton_badge_text"></div>
        </div>
      </div>
      <div className="skeleton_product_body">
        <div className="skeleton_product_info">
          <div className="skeleton_text skeleton_title"></div>
          <div className="skeleton_text skeleton_subtitle"></div>
          <div className="skeleton_tags">
            <div className="skeleton_tag"></div>
            <div className="skeleton_tag"></div>
            <div className="skeleton_tag"></div>
          </div>
          <div className="skeleton_product_footer">
            <div className="skeleton_host_info">
              <div className="skeleton_avatar"></div>
              <div className="skeleton_text skeleton_host_name"></div>
            </div>
            <div className="skeleton_text skeleton_price"></div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="product_list_section">
      <div className="product_list_header">
        <nav aria-label="category">
          <ul className="nav_container">
            {Array.from({ length: 9 }, (_, index) => (
              <li key={index} className="nav_item">
                <div className="skeleton_nav_icon"></div>
                <div className="skeleton_text skeleton_nav_text"></div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="product_grid">
        {skeletonCards}
      </div>
    </section>
  );
}
