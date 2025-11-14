"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import { useRef } from "react";
import MyInput from "@/app/commons/components/input";
import MyButton from "@/app/commons/components/button";
import styles from "./styles.module.css";
import "suneditor/dist/css/suneditor.min.css";
import usePurchaseWriteModal from "./hooks/index.modal.hook";
import usePurchaseWriteMap from "./hooks/index.map.hook";
import usePurchaseWriteBinding from "./hooks/index.write.hook";
import { schema } from "./schema";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

interface FormData {
  productName: string;
  summary: string;
  description: string;
  price: string;
  tags?: string;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  lat?: string;
  lng?: string;
  images?: string[];
}

export default function PurchaseWrite() {
  const form = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      productName: "",
      summary: "",
      description: "",
      price: "",
      tags: undefined,
      zipcode: undefined,
      address: undefined,
      addressDetail: undefined,
      lat: undefined,
      lng: undefined,
      images: undefined,
    },
  });
  const { register, formState, setValue, watch } = form;
  const { openAddressSearchModal } = usePurchaseWriteModal({ setValue });
  const lat = watch("lat");
  const lng = watch("lng");
  const editorRef = useRef<unknown>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    onSubmit,
    images,
    handleImageUpload,
    handleImageDelete,
    handleCancel,
    isLoading,
    isEditMode,
    isLoadingData,
  } = usePurchaseWriteBinding({ form, editorRef });
  usePurchaseWriteMap();
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      <div className={styles.page} data-testid="purchase-write-page">
        <div className={styles.container}>
          {isLoadingData ? (
            <div className={styles.label}>로딩 중...</div>
          ) : (
            <div className={styles.label} data-testid="purchase-write-title">
              {isEditMode ? "숙박권 수정하기" : "숙박권 판매하기"}
            </div>
          )}
          <div className={styles.gap}></div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {/* Input Area 1 - 상품명 */}
            <div className={styles.inputArea}>
              <div className={styles.labelArea}>
                <span className={styles.labelText}>상품명</span>
                <span className={styles.required}>*</span>
              </div>
              <MyInput
                register={register}
                name="productName"
                placeholder="상품명을 입력해 주세요."
                style={{ width: "100%", height: "48px" }}
              />
              {formState.errors.productName && (
                <div className={styles.inputError} data-testid="error-productName">
                  {formState.errors.productName.message}
                </div>
              )}
            </div>

            <div className={styles.gapWithDivider}>
              <div className={styles.gapHalf}></div>
              <div className={styles.divider}></div>
              <div className={styles.gapHalf}></div>
            </div>

            {/* Input Area 2 - 한줄 요약 */}
            <div className={styles.inputArea}>
              <div className={styles.labelArea}>
                <span className={styles.labelText}>한줄 요약</span>
                <span className={styles.required}>*</span>
              </div>
              <MyInput
                register={register}
                name="summary"
                placeholder="상품을 한줄로 요약해 주세요."
                style={{ width: "100%", height: "48px" }}
              />
              {formState.errors.summary && (
                <div className={styles.inputError} data-testid="error-summary">
                  {formState.errors.summary.message}
                </div>
              )}
            </div>

            <div className={styles.gapWithDivider}>
              <div className={styles.gapHalf}></div>
              <div className={styles.divider}></div>
              <div className={styles.gapHalf}></div>
            </div>

            {/* Editor Area - 상품 설명 */}
            <div className={styles.editorArea}>
              <div className={styles.editorLabelArea}>
                <span className={styles.labelText}>상품 설명</span>
                <span className={styles.required}>*</span>
              </div>
              <div className={styles.editorWrapper} data-testid="editor-wrapper">
                <SunEditor
                  placeholder="내용을 입력해 주세요."
                  height="421px"
                  getSunEditorInstance={(sunEditor) => {
                    editorRef.current = sunEditor;
                  }}
                  onChange={(content) => {
                    setValue("description", content);
                  }}
                  setOptions={{
                    buttonList: [
                      ["bold", "italic", "underline", "strike"],
                      ["formatBlock", "paragraphStyle", "blockquote", "list"],
                      ["image", "video", "link", "table"],
                      ["undo", "redo", "removeFormat"],
                    ],
                  }}
                />
              </div>
              {formState.errors.description && (
                <div className={styles.inputError} data-testid="error-description">
                  {formState.errors.description.message}
                </div>
              )}
            </div>

            <div className={styles.gapWithDivider}>
              <div className={styles.gapHalf}></div>
              <div className={styles.divider}></div>
              <div className={styles.gapHalf}></div>
            </div>

            {/* Input Area 3 - 판매 가격 */}
            <div className={styles.inputArea}>
              <div className={styles.labelArea}>
                <span className={styles.labelText}>판매 가격</span>
                <span className={styles.required}>*</span>
              </div>
              <MyInput
                register={register}
                name="price"
                placeholder="판매 가격을 입력해 주세요. (원 단위)"
                style={{ width: "100%", height: "48px" }}
              />
              {formState.errors.price && (
                <div className={styles.inputError} data-testid="error-price">
                  {formState.errors.price.message}
                </div>
              )}
            </div>

            <div className={styles.gapWithDivider}>
              <div className={styles.gapHalf}></div>
              <div className={styles.divider}></div>
              <div className={styles.gapHalf}></div>
            </div>

            {/* Input Area 4 - 태그 입력 */}
            <div className={styles.inputArea}>
              <div className={styles.labelArea}>
                <span className={styles.labelText}>태그 입력</span>
              </div>
              <MyInput
                register={register}
                name="tags"
                placeholder="태그를 입력해 주세요."
                style={{ width: "100%", height: "48px" }}
              />
            </div>
            <div className={styles.gapWithDivider}>
              <div className={styles.gapHalf}></div>
              <div className={styles.divider}></div>
              <div className={styles.gapHalf}></div>
            </div>
            {/* Address Area */}
            <div className={styles.addressArea}>
              <div className={styles.addressLeft}>
                <div className={styles.addressSection}>
                  <div className={styles.zipSection}>
                    <div className={styles.labelArea}>
                      <span className={styles.labelText}>주소</span>
                      <span className={styles.required}>*</span>
                    </div>
                    <div className={styles.zipRow}>
                      <MyInput
                        register={register}
                        name="zipcode"
                        placeholder="01234"
                        style={{ width: "82px", height: "48px" }}
                        data-testid="zipcode-input"
                      />
                      <button
                        type="button"
                        className={styles.searchButton}
                        onClick={openAddressSearchModal}
                        data-testid="zipcode-search-button"
                      >
                        우편번호 검색
                      </button>
                    </div>
                  </div>

                  <div className={styles.addressDetailRow}>
                    <MyInput
                      register={register}
                      name="address"
                      placeholder="상세주소를 입력해 주세요."
                      style={{ width: "396px", height: "48px" }}
                      data-testid="address-input"
                    />
                  </div>
                </div>

                <div className={styles.coordsRow}>
                  <div className={styles.coordInput}>
                    <div className={styles.labelArea}>
                      <span className={styles.labelText}>위도(LAT)</span>
                    </div>
                    <MyInput
                      register={register}
                      name="lat"
                      placeholder="주소를 먼저 입력해 주세요."
                      disabled
                      style={{
                        width: "396px",
                        height: "48px",
                        backgroundColor: "#e4e4e4",
                        color: "#919191",
                      }}
                      data-testid="lat-input"
                    />
                  </div>
                  <div className={styles.coordInput}>
                    <div className={styles.labelArea}>
                      <span className={styles.labelText}>경도(LNG)</span>
                    </div>
                    <MyInput
                      register={register}
                      name="lng"
                      placeholder="주소를 먼저 입력해 주세요."
                      disabled
                      style={{
                        width: "396px",
                        height: "48px",
                        backgroundColor: "#e4e4e4",
                        color: "#919191",
                      }}
                      data-testid="lng-input"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.addressRight}>
                <div className={styles.mapLabel}>상세 위치</div>
                <div className={styles.mapPlaceholder} data-testid="map-area">
                  {lat && lng ? (
                    <Map
                      center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                      style={{ width: "100%", height: "100%", borderRadius: "16px" }}
                      level={3}
                    >
                      <MapMarker
                        position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                      />
                    </Map>
                  ) : (
                    <span
                      className={styles.mapPlaceholderText}
                      data-testid="map-placeholder"
                    >
                      주소를 먼저 입력해 주세요.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Line 13 */}
            <div className={styles.gapWithDivider}>
              <div className={styles.gapHalf}></div>
              <div className={styles.divider}></div>
              <div className={styles.gapHalf}></div>
            </div>

            {/* Upload Area */}
            <div className={styles.uploadArea}>
              <div className={styles.uploadLabelArea}>
                <span className={styles.labelText}>사진 첨부</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                className={styles.hiddenFileInput}
                onChange={handleImageUpload}
              />
              <div
                className={styles.uploadBox}
                onClick={() => fileInputRef.current?.click()}
                data-testid="upload-box"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                <Image src="/icons/outline/add.svg" alt="add" width={40} height={40} />
                <span className={styles.uploadText}>클릭해서 사진 업로드</span>
              </div>
              {images.length > 0 && (
                <div
                  className={styles.imagePreviewContainer}
                  data-testid="image-preview-container"
                >
                  {images.map((url, index) => {
                    // 이미지 URL이 전체 URL이 아닌 경우 GCS 경로로 변환
                    // FileReader로 생성한 data URL은 그대로 사용
                    const imageUrl =
                      url.startsWith("data:") ||
                      url.startsWith("http://") ||
                      url.startsWith("https://")
                        ? url
                        : `https://storage.googleapis.com/${url}`;
                    return (
                      <div key={index} className={styles.imagePreviewItem}>
                        <img
                          src={imageUrl}
                          alt={`uploaded-${index}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          onClick={() => handleImageDelete(index)}
                          className={styles.imageDeleteButton}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={styles.gap}></div>

            {/* Button Area */}
            <div className={styles.buttonArea}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
                disabled={isLoading}
              >
                취소
              </button>
              <MyButton
                formState={formState}
                style={{ width: "95px", backgroundColor: isLoading ? "#999" : "#c7c7c7" }}
              >
                {isLoading
                  ? isEditMode
                    ? "수정 중..."
                    : "등록 중..."
                  : isEditMode
                    ? "수정하기"
                    : "등록하기"}
              </MyButton>
            </div>

            <div className={styles.gap}></div>
          </form>
        </div>
      </div>
    </>
  );
}
