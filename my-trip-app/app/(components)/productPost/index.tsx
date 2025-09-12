"use client"

import "./index.css"
import "../../global.css"
import Image from "next/image"
import Icon from "@utils/iconColor"
import { useProductPost } from "../../commons/hooks/useProductPost"
import type { ProductPostProps } from "../../_types/product"

export default function ProductPost() {
  const {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    handleCancel,
    handlePostcodeSearch,
    handlePhotoUpload,
    removePhoto,
    uploadedPhotos
  } = useProductPost();

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
            {errors.productName && <span className="error_message">{errors.productName}</span>}
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
            {errors.sellingPrice && <span className="error_message">{errors.sellingPrice}</span>}
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
              {errors.productDescription && <span className="error_message">{errors.productDescription}</span>}
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
              {errors.sellingPeriod && <span className="error_message">{errors.sellingPeriod}</span>}
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
                    readOnly
                  />
                  <button type="button" className="btn btn-outline" onClick={handlePostcodeSearch}>우편번호 검색</button>
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="상세주소를 입력해주세요."
                  className="form_input address_detail_input"
                  required
                  readOnly
                />
                <input
                  type="text"
                  name="detailedAddress"
                  value={formData.detailedAddress}
                  onChange={handleInputChange}
                  placeholder="상세주소를 입력해주세요."
                  className="form_input"
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
                      readOnly
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
                      readOnly
                    />
                  </div>
                </div>
                {errors.address && <span className="error_message">{errors.address}</span>}
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
              <div className="photo_upload_grid">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="photo_upload_box">
                    {uploadedPhotos[index] ? (
                      <div className="uploaded_photo">
                        <Image src={uploadedPhotos[index]!} alt={`업로드된 사진 ${index + 1}`} width={200} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          type="button" 
                          className="remove_photo_btn"
                          onClick={() => removePhoto(index)}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="upload_label">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handlePhotoUpload(e, index)}
                          hidden
                        />
                        <div className="upload_icon">+</div>
                        <p className="upload_text">클릭해서 사진 업로드</p>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 폼 버튼 */}
          <div className="form_actions">
            <div className="action_buttons">
              <button type="button" className="btn btn-outline" onClick={handleCancel}>
                취소
              </button>
              <button type="submit" className="btn btn-primary">
                등록하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
