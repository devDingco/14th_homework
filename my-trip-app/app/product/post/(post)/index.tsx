"use client"

import "../../../global.css"
import "./index.css"
import { useState } from "react"
import Icon from "@utils/iconColor"

export default function ProductPage() {
  const [formData, setFormData] = useState({
    productName: "",
    sellingPrice: "",
    productDescription: "",
    sellingPeriod: "",
    tags: "",
    zipCode: "",
    address: "",
    detailedAddress: "",
    referenceItem: "",
    latitude: "",
    longitude: "",
    photos: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // 여기에 폼 제출 로직을 추가할 수 있습니다
  };

  const handleCancel = () => {
    // 취소 로직
    console.log("Form cancelled");
  };

  return (
    <div className="post_page">
      <div className="post_container">
        <h1 className="post_title b_20_28">숙박권 판매하기</h1>
        
        <form className="post_form" onSubmit={handleSubmit}>
          {/* 상품명 */}
          <div className="form_group">
            <label className="form_label required">상품명 </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="상품명을 입력해주세요."
              className="form_input"
              required
            />
          </div>
          <div className="divider_line"></div>

          {/* 판매가격 */}
          <div className="form_group">
            <label className="me_16_24 required">판매가격 </label>
            <input
              type="text"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleInputChange}
              placeholder="판매가격을 입력해주세요."
              className="form_input"
              required
            />
          </div>
          <div className="divider_line"></div>


          {/* 상품설명 */}
          <div className="form_group">
            <label className="me_16_24 required">상품설명 </label>
            <div className="rich_text_editor">
              <div className="editor_toolbar">
                <Icon outline name="formatting" width={24} height={24} />
                <Icon outline name="formatting_1" width={24} height={24} />
                <Icon outline name="formatting_2" width={24} height={24} />
                <Icon outline name="formatting_3" width={24} height={24} />
                <div className="toolbar_separator"></div>
                <Icon outline name="paragraph" width={24} height={24} />
                <Icon outline name="paragraph_1" width={24} height={24} />
                <Icon outline name="paragraph_2" width={24} height={24} />
                <Icon outline name="paragraph_3" width={24} height={24} />
                <div className="toolbar_separator"></div>
                <Icon outline name="content" width={24} height={24} />
                <Icon outline name="content_1" width={24} height={24} />
                <Icon outline name="content_2" width={24} height={24} />
                <Icon outline name="content_3" width={24} height={24} />
                <div className="toolbar_separator" id="separator"></div>
                <Icon outline name="arrows_right" width={24} height={24} />
                <Icon outline name="arrows_right_1" width={24} height={24} />
                <Icon outline name="generic" width={24} height={24} />
              </div>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                placeholder="내용을 입력해주세요."
                className="editor_content"
                required
              />
            </div>
          </div>
          <div className="divider_line"></div>

          {/* 판매기간 */}
          <div className="form_group">
            <label className="me_16_24 required">판매 가격</label>
            <div className="form_group">
              <input
                type="text"
                name="sellingPeriod"
                value={formData.sellingPeriod}
                onChange={handleInputChange}
                placeholder="판매 가격을 입력해주세요. (WON단위)"
                className="form_input"
                required
              />
            </div>
          </div>
          <div className="divider_line"></div>

          {/* 태그 입력 */}
          <div className="form_group">
            <label className="me_16_24">태그 입력</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="태그를 입력해주세요."
              className="form_input"
            />
          </div>
          <div className="divider_line"></div>


                    {/* 주소 */}
          <div className="form_group address_form_group">
            <div className="address_map_row">
              <div className="address_column">
                <label className="me_16_24 required">주소</label>
                <div className="zip_code_wrapper">
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="우편번호"
                    className="form_input zip_code_input"
                    required
                  />
                  <button type="button" className="btn btn-outline">우편번호 검색</button>
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="상세주소를 입력해주세요."
                  className="form_input address_detail_input"
                  required
                />
                <div className="coordinate_inputs">
                  <div className="coordinate_group">
                    <span className="me_16_24">위도(LAT)</span>
                    <input
                      type="text"
                      name="latitude"
                      value={formData.latitude || ""}
                      onChange={handleInputChange}
                      placeholder="주소를 먼저 입력해주세요."
                      className="form_input coordinate_input"
                    />
                  </div>
                  <div className="coordinate_group">
                    <span className="me_16_24">경도(LNG)</span>
                    <input
                      type="text"
                      name="longitude"
                      value={formData.longitude || ""}
                      onChange={handleInputChange}
                      placeholder="주소를 먼저 입력해주세요."
                      className="form_input coordinate_input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="map_column">
                <span className="map_title me_16_24">실제 위치</span>
                <div className="map_container">
                  <div className="map_placeholder">
                    <div className="map_content">
                      <div className="map_marker"></div>
                      <div className="map_info">
                        <p>지도가 여기에 표시됩니다</p>
                        <p>주소 입력 시 자동으로 위치가 표시됩니다</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="divider_line"></div>


          {/* 사진 첨부 */}
          <div className="form_group">
            <label className="me_16_24">사진 첨부</label>
            <div className="photo_upload_section">
              <div className="photo_upload_box">
                <div className="upload_icon">+</div>
                <p className="upload_text">클릭해서 사진 업로드</p>
              </div>
            </div>
          </div>

          {/* 폼 버튼 */}
          <div className="form_actions">
            <div className="action_buttons">
              <button type="button" className="btn btn-outline" onClick={handleCancel}>
                취소
              </button>
              <button type="submit" className="btn btn-disabled">
                등록하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}