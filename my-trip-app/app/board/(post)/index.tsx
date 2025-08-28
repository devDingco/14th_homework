"use client";
import "./index.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "@utils/iconColor";
export default function PostBoard() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 사전 로드(선택). 이미 있으면 중복 로드하지 않음
    if (typeof window !== "undefined" && !(window as any).daum?.Postcode) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openPostcode = async () => {
    // 스크립트가 아직 로드되지 않았으면 대기
    const waitForDaum = () =>
      new Promise<void>((resolve) => {
        const check = () => {
          if ((window as any).daum?.Postcode) resolve();
          else setTimeout(check, 50);
        };
        check();
      });

    if (!(window as any).daum?.Postcode) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
      await waitForDaum();
    }

    // 열기
    const { daum } = window as any;
    new daum.Postcode({
      oncomplete: (data: any) => {
        const zonecode = data.zonecode;
        const roadAddress = data.roadAddress || data.address || "";
        setZipcode(zonecode);
        setAddress(roadAddress);
      },
    }).open();
  };
  return (
    <div className="board_page">
      <h1 className="b_28_36 board_title">게시물 등록</h1>

      <form className="board_form" onSubmit={(e) => e.preventDefault()}>
        <div className="row two">
          <div className="field">
            <label className="sb_16_24">
              작성자 <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
            {errors.writer  && <p className="error_text">{errors.writer}</p>}
          </div>
          <div className="field">
            <label className="sb_16_24">
              비밀번호 <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error_text">{errors.password}</p>}
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label className="sb_16_24">제목 <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="제목을 입력해 주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="error_text">{errors.title}</p>}
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label className="sb_16_24">내용 <span className="required">*</span>
            </label>
            <textarea
              rows={12}
              placeholder="내용을 입력해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {errors.content && <p className="error_text">{errors.content}</p>}
          </div>
        </div>

        <div className="row">
          <div className="field address_field">
            <label className="sb_16_24">주소</label>
            <div className="postal_row">
              <input className="postal_input" type="text" value={zipcode} readOnly placeholder="우편번호" />
              <button type="button" className="btn btn-search sb_18_24" onClick={openPostcode}>우편번호 검색</button>
            </div>
            <input type="text" placeholder="주소를 입력해 주세요." value={address} readOnly />
            <input type="text" placeholder="상세주소" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label className="sb_16_24">유튜브 링크</label>
            <input type="url" placeholder="링크를 입력해 주세요." />
          </div>
        </div>

        <div className="row">
          <label className="sb_16_24">사진 첨부</label>
          <div className="upload_grid">
            <label className="uploader">
              <input type="file" accept="image/*" hidden />
              <div className="uploader_box">
                <span className="plus">
                    <Icon outline name="add" className="plus_icon" color="var(--gray-60)"/>
                </span>
                <span className="r_16_24">클릭해서 사진 업로드</span>
              </div>
            </label>
            <label className="uploader">
              <input type="file" accept="image/*" hidden />
              <div className="uploader_box">
                <span className="plus">
                    <Icon outline name="add" className="plus_icon" color="var(--gray-60)"/>
                </span>
                <span className="r_16_24">클릭해서 사진 업로드</span>
              </div>
            </label>
            <label className="uploader">
              <input type="file" accept="image/*" hidden />
              <div className="uploader_box">
                <span className="plus">
                    <Icon outline name="add" className="plus_icon" color="var(--gray-60)"/>
                </span>
                <span className="r_16_24">클릭해서 사진 업로드</span>
              </div>
            </label>
          </div>
        </div>

        <div className="row actions">
          <button type="button" className="btn-secondary">취소</button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              const nextErrors: Record<string, string> = {};
              if (!writer.trim()) nextErrors.writer = "필수입력 사항 입니다.";
              if (!password.trim()) nextErrors.password = "필수입력 사항 입니다.";
              if (!title.trim()) nextErrors.title = "필수입력 사항 입니다.";
              if (!content.trim()) nextErrors.content = "필수입력 사항 입니다.";
              setErrors(nextErrors);
              if (Object.keys(nextErrors).length === 0) {
                setIsModalOpen(true);
              }
            }}
          >
            등록하기
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="modal_backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2 className="b_20_28">등록 완료</h2>
            <p className="r_14_20">게시글이 등록되었습니다.</p>
            <div className="modal_actions">
              <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}