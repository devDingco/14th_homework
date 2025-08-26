const AddressInput = ({ label, placeholder = "", type = "text" }) => {
  return (
    <div className="address-area">
      <div className="address-area__search">
        <label className="input-area__label">{label}</label>
        <div className="address-area__input-button-group">
          <input
            className="input-area__input__address"
            type={type}
            placeholder="01234"
          />
          <button className="input-area__button">우편번호 검색</button>
        </div>
      </div>
      <input
        className="input-area__input"
        type={type}
        placeholder="주소를 입력해 주세요"
      />
      <input className="input-area__input" type={type} placeholder="상세주소" />
    </div>
  );
};
