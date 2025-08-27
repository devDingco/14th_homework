import '@/components/booking/new/booking-register.css';
import TextInput from '@/commons/text-input/text-input';

export default function BookingRegister() {
  return (
    <div className="container">
      <div className="booking_form_title b_20_28">숙박권 판매하기</div>
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">
            상품명 <span>*</span>
          </label>
        </div>
        <TextInput placeholder="상품명을 입력해 주세요." />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">
            한줄요약 <span>*</span>
          </label>
        </div>
        <TextInput placeholder="상품을 한줄로 요약해 주세요." />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">
            상품 설명 <span>*</span>
          </label>
        </div>
        {/* 에디터 영역 - 무슨 에디터 인지 확인 후 추가 예정 */}
        <textarea className="booking_form_textarea" placeholder="상품 설명을 입력해 주세요." />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">
            판매 가격 <span>*</span>
          </label>
        </div>
        <TextInput placeholder="판매 가격을 입력해 주세요. (원 단위)" />
      </div>
      <hr className="booking_form_divider" />
      <div className="booking_form_input_item">
        <div className="booking_form_input_item_title">
          <label className="booking_form_label me_16_24">태그 입력</label>
        </div>
        <TextInput placeholder="태그를 입력해 주세요." />
      </div>
      <hr className="booking_form_divider" />
      주소 입력 섹션
      <hr className="booking_form_divider" />
      사진 첨부 섹션 - 사진을 한장씩 첨부하는데, 여러장 등록이 가능함
      <div className="booking_form_button_wrapper">
        <div className="booking_form_button cancel sb_18_24">취소</div>
        <button type="submit" className="booking_form_button sb_18_24">
          등록하기
        </button>
      </div>
    </div>
  );
}
