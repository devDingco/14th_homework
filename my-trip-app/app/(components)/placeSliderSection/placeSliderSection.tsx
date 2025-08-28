import "./placeSliderSection.css";
import "../../global.css";
import Icon from "@utils/iconColor";

export default function PlaceSliderSection() {
  return (
    <section className="place_slider_section">
            <div className="place_slider_header">
                <h2 className="place_slider_title b_28_36">2025 끝여름 낭만있게 마무리 하고 싶다면?</h2>
            </div>
            <div className="place_slider_content">
                <article className="place_card" style={{ backgroundImage: "url(/images/desktop/a.png)" }}>
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

                <article className="place_card" style={{ backgroundImage: "url(/images/desktop/b.png)" }}>
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
            </div>
    </section>
  )
}   