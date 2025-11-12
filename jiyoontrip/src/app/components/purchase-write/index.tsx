"use client";

import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import MyInput from "@/app/commons/components/input";
import MyButton from "@/app/commons/components/button";
import styles from "./styles.module.css";
import "suneditor/dist/css/suneditor.min.css";
import usePurchaseWriteModal from "./hooks/index.modal.hook";
import usePurchaseWriteMap from "./hooks/index.map.hook";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

interface FormData {
  productName: string;
  summary: string;
  description: string;
  price: string;
  tags: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  lat: string;
  lng: string;
}

export default function PurchaseWrite() {
  const { register, formState, setValue, watch } = useForm<FormData>({ mode: "onChange" });
  const { openAddressSearchModal } = usePurchaseWriteModal({ setValue });
  const lat = watch("lat");
  const lng = watch("lng");
  usePurchaseWriteMap();
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      <div className={styles.page} data-testid="purchase-write-page">
        <div className={styles.container}>
        <div className={styles.label}>숙박권 판매하기</div>
        <div className={styles.gap}></div>

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
          <div className={styles.editorWrapper}>
            <SunEditor
              placeholder="내용을 입력해 주세요."
              height="421px"
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
                  <MapMarker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
                </Map>
              ) : (
                <span className={styles.mapPlaceholderText} data-testid="map-placeholder">
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
          <div className={styles.uploadBox}>
            <Image src="/icons/outline/add.svg" alt="add" width={40} height={40} />
            <span className={styles.uploadText}>클릭해서 사진 업로드</span>
          </div>
        </div>

        <div className={styles.gap}></div>

        {/* Button Area */}
        <div className={styles.buttonArea}>
          <button className={styles.cancelButton}>취소</button>
          <MyButton
            formState={formState}
            style={{ width: "95px", backgroundColor: "#c7c7c7" }}
          >
            등록하기
          </MyButton>
        </div>

        <div className={styles.gap}></div>
        </div>
      </div>
    </>
  );
}
