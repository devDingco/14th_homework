import "./index.css";
import "../../global.css";

export default function ProductList() {
  return (
    <section className="product_list_section">
      <div className="product_list_header">
        <h2 className="product_list_title b_28_36">상품 리스트</h2>
      </div>
      <div className="product_grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <article key={index} className="product_card">
            <div className="product_thumbnail" />
            <div className="product_info">
              <p className="product_title b_16_24">샘플 숙소 타이틀</p>
              <p className="product_price b_16_24">32,800 원</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


