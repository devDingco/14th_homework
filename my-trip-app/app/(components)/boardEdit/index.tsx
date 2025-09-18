"use client";

import "./index.css";
import { useState, useEffect } from "react";
import Icon from "@utils/iconColor";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useBoardEdit } from "../../commons/hooks/useBoardEdit";
import type { BoardEditProps } from "../../_types/board";

export default function BoardEdit({ id, initialData }: BoardEditProps) {
  const router = useRouter();
  const {
    formData,
    errors,
    isModalOpen,
    isSubmitting,
    apiError,
    imageUrls,
    updateFormData,
    handleSubmit,
    onChangeFile,
    removeImage,
    openPostcode,
    setIsModalOpen
  } = useBoardEdit(id, initialData);

  return (
    <div className="board_page">
      <h1 className="b_28_36 board_title">게시물 수정</h1>
      <form className="board_form" onSubmit={(e) => e.preventDefault()}>
        <div className="row two">
          <div className="field">
            <label className="sb_16_24">제목 <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="제목을 입력해 주세요."
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
            />
            {errors.title && <p className="error_text">{errors.title}</p>}
          </div>
          <div className="field">
            <label className="sb_16_24">
              비밀번호 <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
            />
            {errors.password && <p className="error_text">{errors.password}</p>}
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label className="sb_16_24">내용 <span className="required">*</span>
            </label>
            <textarea
              rows={12}
              placeholder="내용을 입력해 주세요."
              value={formData.content}
              onChange={(e) => updateFormData('content', e.target.value)}
            />
            {errors.content && <p className="error_text">{errors.content}</p>}
          </div>
        </div>

        <div className="row">
          <div className="field address_field">
            <label className="sb_16_24">주소</label>
            <div className="postal_row">
              <input className="postal_input" type="text" value={formData.zipcode} readOnly placeholder="우편번호" />
              <button type="button" className="btn-search sb_18_24" onClick={openPostcode}>우편번호 검색</button>
            </div>
            <input type="text" placeholder="주소를 입력해 주세요." value={formData.address} readOnly />
            <input type="text" placeholder="상세주소" value={formData.detailAddress} onChange={(e) => updateFormData('detailAddress', e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label className="sb_16_24">유튜브 링크</label>
            <input type="url" placeholder="링크를 입력해 주세요." value={formData.youtubeUrl} onChange={(e) => updateFormData('youtubeUrl', e.target.value)} />
          </div>
        </div>

        <div className="row">
          <label className="sb_16_24">사진 첨부</label>
          <div className="upload_grid">
            {Array.from({ length: 3 }).map((_, index) => (
              <label className="uploader" key={index}>
                <input type="file" accept="image/*" hidden onChange={onChangeFile(index)} />
                <div className="uploader_box">
                  {imageUrls[index] ? (
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image
                        src={imageUrls[index]?.startsWith("http") ? imageUrls[index]! : `https://storage.googleapis.com/${imageUrls[index]!.startsWith("/") ? imageUrls[index]!.slice(1) : imageUrls[index]}`}
                        alt={`preview-${index}`}
                        width={160}
                        height={160}
                        priority={false}
                        sizes="160px"
                      />
                      <button 
                      type="button"
                      className="btn" 
                      onClick={(e) => { e.preventDefault(); removeImage(index); }}
                      style={{ position: "absolute", top: 8, right: 8 }}
                      >삭제</button>
                    </div>
                  ) : (
                    <>
                      <span className="plus">
                        <Icon outline name="add" className="plus_icon" color="var(--gray-60)"/>
                      </span>
                      <span className="r_16_24">클릭해서 사진 업로드</span>
                    </>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="row actions">
          <button type="button" className="btn-secondary" onClick={() => router.back()}>취소</button>
          <button
            type="button"
            className="btn-primary"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "수정 중..." : "수정하기"}
          </button>
        </div>
        {apiError && <p className="error_text" style={{ marginTop: 8 }}>{apiError}</p>}
      </form>

      {isModalOpen && (
        <div className="modal_backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2 className="b_20_28">수정 완료</h2>
            <p className="r_14_20">게시글이 수정되었습니다.</p>
            <div className="modal_actions">
              <button
                className="btn"
                onClick={() => {
                  setIsModalOpen(false);
                  router.push(`/board/${id}`);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
