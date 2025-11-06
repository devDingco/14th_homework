"use client";

import { Inputfield, InputBoardAddress } from "@commons/ui";
import styles from "./styles.module.css";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import useProductWriteForm from "./hook";

// Lexical 툴바 컴포넌트
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: "bold" | "italic" | "underline" | "strikethrough") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className={styles.editorToolbar}>
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatText("bold")}
          title="Bold"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.5 4V20H12.5C14.43 20 16 18.43 16 16.5C16 15.27 15.37 14.19 14.42 13.58C15.1 12.97 15.5 12.08 15.5 11.1C15.5 9.29 14.21 8 12.5 8H9.5V4H6.5ZM9.5 10.5H12.5C13.05 10.5 13.5 10.95 13.5 11.5C13.5 12.05 13.05 12.5 12.5 12.5H9.5V10.5ZM9.5 14.5H12.5C13.6 14.5 14.5 15.4 14.5 16.5C14.5 17.6 13.6 18.5 12.5 18.5H9.5V14.5Z"
              fill="#333333"
            />
          </svg>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatText("italic")}
          title="Italic"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 4V7H12.21L8.79 17H6V20H14V17H11.79L15.21 7H18V4H10Z" fill="#333333" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatText("underline")}
          title="Underline"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 17C14.76 17 17 14.76 17 12V3H15V12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12V3H7V12C7 14.76 9.24 17 12 17ZM5 19V21H19V19H5Z"
              fill="#333333"
            />
          </svg>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatText("strikethrough")}
          title="Strikethrough"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 19H14V16H10V19ZM5 4V7H10V10H14V7H19V4H5ZM3 14H21V12H3V14Z" fill="#333333" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Lexical 에디터 설정
const editorConfig = {
  namespace: "ProductEditor",
  theme: {
    paragraph: "editorParagraph",
    text: {
      bold: "textBold",
      italic: "textItalic",
      underline: "textUnderline",
      strikethrough: "textStrikethrough",
    },
  },
  onError: (error: Error) => {
    console.error(error);
  },
};

export default function ProductsWrite() {
  const {
    register,
    handleSubmit,
    formState,
    watch,
    isModalOpen,
    onToggleModal,
    handleComplete,
    handleEditorChange,
    onClickCancel,
    onClickSubmit,
  } = useProductWriteForm();

  const zipcode = watch("productAddress.zipcode");
  const address = watch("productAddress.address");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>숙박권 판매하기</h1>

      <form className={styles.form} onSubmit={handleSubmit(onClickSubmit)}>
        {/* 상품명 */}
        <Inputfield
          type="text"
          label="상품명"
          required
          placeholder="상품명을 입력해 주세요."
          {...register("name")}
          error={formState.errors.name?.message}
        />

        <div className={styles.divider} />

        {/* 한줄 요약 */}
        <Inputfield
          type="text"
          label="한줄 요약"
          required
          placeholder="상품을 한줄로 요약해 주세요."
          {...register("remarks")}
          error={formState.errors.remarks?.message}
        />

        <div className={styles.divider} />

        {/* 상품 설명 (Lexical 에디터) */}
        <div className={styles.editorContainer}>
          <div className={styles.editorLabel}>
            <label>상품 설명</label>
            <span>*</span>
          </div>
          <div className={styles.editor}>
            <LexicalComposer initialConfig={editorConfig}>
              <ToolbarPlugin />
              <RichTextPlugin
                contentEditable={<ContentEditable className={styles.editorContent} />}
                placeholder={<div className={styles.editorPlaceholder}>내용을 입력해 주세요.</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <OnChangePlugin onChange={handleEditorChange} />
            </LexicalComposer>
          </div>
        </div>

        <div className={styles.divider} />

        {/* 판매 가격 */}
        <Inputfield
          type="text"
          label="판매 가격"
          required
          placeholder="판매 가격을 입력해 주세요. (원 단위)"
          {...register("price")}
          error={formState.errors.price?.message}
        />

        <div className={styles.divider} />

        {/* 태그 입력 */}
        <Inputfield
          type="text"
          label="태그 입력"
          placeholder="태그를 입력해 주세요."
          {...register("tags")}
          error={formState.errors.tags?.message}
        />

        <div className={styles.divider} />

        {/* 주소 및 지도 */}
        <div className={styles.addressGroup}>
          <div className={styles.addressInputs}>
            <InputBoardAddress
              required
              onClick={onToggleModal}
              placeholder="상세주소를 입력해 주세요."
              register={register}
              basePath="productAddress"
            />

            <div className={`${styles.disabledInput} ${styles.latInput}`}>
              <Inputfield
                type="text"
                label="위도(LAT)"
                placeholder="주소를 먼저 입력해 주세요."
                {...register("lat")}
                isEdit={true}
              />
            </div>

            <div className={`${styles.disabledInput} ${styles.lngInput}`}>
              <Inputfield
                type="text"
                label="경도(LNG)"
                placeholder="주소를 먼저 입력해 주세요."
                {...register("lng")}
                isEdit={true}
              />
            </div>
          </div>

          <div className={styles.mapContainer}>
            <label className={styles.mapLabel}>상세 위치</label>
            <div className={styles.map}>
              {zipcode && address ? (
                <div>지도 표시 영역 (구현 예정)</div>
              ) : (
                <span className={styles.mapPlaceholder}>주소를 먼저 입력해 주세요.</span>
              )}
            </div>
          </div>
        </div>

        {/* 주소 검색 모달 */}
        {isModalOpen && (
          <Modal
            title="주소입력하기"
            open={true}
            styles={{ body: { height: 450 } }}
            onOk={onToggleModal}
            onCancel={onToggleModal}
          >
            <DaumPostcodeEmbed onComplete={handleComplete} style={{ height: "100%" }} />
          </Modal>
        )}

        <div className={styles.divider} />

        {/* 사진 첨부 */}
        <div className={styles.photoContainer}>
          <div className={styles.photoLabel}>
            <label>사진 첨부</label>
          </div>
          <div className={styles.photoUpload}>
            <div className={styles.photoIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M18.7513 21.2503H10.418C10.0638 21.2503 9.767 21.1305 9.52755 20.8907C9.28783 20.651 9.16797 20.3541 9.16797 19.9999C9.16797 19.6455 9.28783 19.3487 9.52755 19.1095C9.767 18.87 10.0638 18.7503 10.418 18.7503H18.7513V10.417C18.7513 10.0628 18.8712 9.76602 19.1109 9.52658C19.3506 9.28685 19.6476 9.16699 20.0017 9.16699C20.3562 9.16699 20.653 9.28685 20.8921 9.52658C21.1316 9.76602 21.2513 10.0628 21.2513 10.417V18.7503H29.5846C29.9388 18.7503 30.2356 18.8702 30.4751 19.1099C30.7148 19.3496 30.8346 19.6466 30.8346 20.0007C30.8346 20.3552 30.7148 20.652 30.4751 20.8912C30.2356 21.1306 29.9388 21.2503 29.5846 21.2503H21.2513V29.5837C21.2513 29.9378 21.1314 30.2346 20.8917 30.4741C20.652 30.7138 20.3551 30.8337 20.0009 30.8337C19.6464 30.8337 19.3496 30.7138 19.1105 30.4741C18.871 30.2346 18.7513 29.9378 18.7513 29.5837V21.2503Z"
                  fill="#777777"
                />
              </svg>
            </div>
            <span className={styles.photoText}>클릭해서 사진 업로드</span>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelButton} onClick={onClickCancel}>
            취소
          </button>
          <button
            type="submit"
            className={`${styles.submitButton} ${formState.isValid ? styles.enabled : ""}`}
            disabled={!formState.isValid}
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
