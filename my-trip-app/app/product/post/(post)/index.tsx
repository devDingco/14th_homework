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
        <h1 className="post_title">숙박권 판매하기</h1>
        
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

          {/* 판매가격 */}
          <div className="form_group">
            <label className="form_label required">판매가격 </label>
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

          {/* 상품설명 */}
          <div className="form_group">
            <label className="form_label required">상품설명 </label>
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
                <div className="toolbar_separator"></div>
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

          {/* 판매기간 */}
          <div className="form_group">
            <label className="form_label required">판매기간</label>
            <div className="period_input_wrapper">
              <input
                type="text"
                name="sellingPeriod"
                value={formData.sellingPeriod}
                onChange={handleInputChange}
                placeholder="판매 기간을 입력해주세요. (기간 선택)"
                className="form_input period_input"
                required
              />
              <button type="button" className="period_btn">
                <span className="plus_icon">+</span>
              </button>
            </div>
          </div>

          {/* 태그 입력 */}
          <div className="form_group">
            <label className="form_label">태그 입력</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="태그를 입력해주세요."
              className="form_input"
            />
          </div>

          {/* 주소 */}
          <div className="form_group">
            <label className="form_label required">주소</label>
            <div className="address_inputs">
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
                placeholder="주소를 입력해주세요."
                className="form_input"
                required
              />
              <input
                type="text"
                name="detailedAddress"
                value={formData.detailedAddress}
                onChange={handleInputChange}
                placeholder="상세주소를 입력해주세요."
                className="form_input"
              />
              <input
                type="text"
                name="referenceItem"
                value={formData.referenceItem}
                onChange={handleInputChange}
                placeholder="참고항목을 입력해주세요."
                className="form_input"
              />
            </div>
          </div>

          {/* 사진 첨부 */}
          <div className="form_group">
            <label className="form_label">사진 첨부</label>
            <div className="photo_upload_section">
              <div className="photo_upload_box">
                <div className="upload_icon">+</div>
                <p className="upload_text">사진 첨부 + 1장 이상 첨부</p>
              </div>
              <div className="photo_preview_area">
                <p className="preview_text">사진을 첨부해주세요.</p>
              </div>
            </div>
          </div>

          {/* 폼 버튼 */}
          <div className="form_actions">
            <span className="version_info">8.1</span>
            <div className="action_buttons">
              <button type="button" className="btn_cancel" onClick={handleCancel}>
                취소
              </button>
              <button type="submit" className="btn_save">
                저장
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}