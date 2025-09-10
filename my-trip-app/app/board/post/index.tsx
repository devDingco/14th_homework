"use client";

import "./index.css";
import { useState, useEffect } from "react";
import Icon from "@utils/iconColor";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createBoardApi, uploadFileApi } from "../../commons/apis/board.api";
import type { CreateBoardInput } from "../../commons/graphql/__generated__/graphql";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useAuth } from "../../commons/hooks/useAuth";
export default function PostBoard() {
  const { user, isLoggedIn, loading } = useAuth();
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [createdBoardId, setCreatedBoardId] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([null, null, null]);
  const router = useRouter();

  // 로그인된 사용자의 이름을 작성자로 설정
  useEffect(() => {
    if (user?.name) {
      setWriter(user.name);
    }
  }, [user]);
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const openPostcode = () => {
    open({
      onComplete: (data: any) => {
        const zonecode = data.zonecode;
        const roadAddress = data.roadAddress || data.address || "";
        setZipcode(zonecode);
        setAddress(roadAddress);
      },
    });
  };

  const validateForm = (): Record<string, string> => {
    const nextErrors: Record<string, string> = {};
    if (!isLoggedIn) {
      nextErrors.writer = "로그인이 필요합니다.";
      return nextErrors;
    }
    if (!writer.trim()) nextErrors.writer = "필수입력 사항 입니다.";
    if (!password.trim()) nextErrors.password = "필수입력 사항 입니다.";
    if (!title.trim()) nextErrors.title = "필수입력 사항 입니다.";
    if (!content.trim()) nextErrors.content = "필수입력 사항 입니다.";
    return nextErrors;
  };

  const buildCreateBoardInput = (): CreateBoardInput => {
    const hasAddress = !!(zipcode || address || detailAddress);
    return {
      writer,
      password,
      title,
      contents: content,
      youtubeUrl: youtubeUrl || undefined,
      images: imageUrls.filter((v): v is string => !!v),
      ...(hasAddress
        ? {
            boardAddress: {
              zipcode: zipcode || undefined,
              address: address || undefined,
              addressDetail: detailAddress || undefined,
            },
          }
        : {}),
    };
  };

  const handleSubmit = async (): Promise<void> => {
    const nextErrors = validateForm();
    setErrors(nextErrors);
    setApiError("");
    if (Object.keys(nextErrors).length !== 0) return;

    const input = buildCreateBoardInput();

    try {
      setIsSubmitting(true);
      const created = await createBoardApi(input);
      if (!created || !created._id) {
        setApiError("등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
        return;
      }
      setCreatedBoardId(created._id);
      setIsModalOpen(true);
    } catch (error) {
      setApiError("에러가 발생했어요. 네트워크 상태를 확인해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const onChangeFile = (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.currentTarget;
    const file = inputEl.files?.[0];
    if (!file) return;
    try {
      setApiError("");
      const uploaded = await uploadFileApi(file);
      const url = uploaded?.url ?? null;
      if (url) {
        setImageUrls((prev) => {
          const next = [...prev];
          next[index] = url;
          return next;
        });
      }
    } catch {
      setApiError("이미지 업로드에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      inputEl.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };


  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="board_page">
        <h1 className="b_28_36 board_title">게시물 등록</h1>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="board_page">
      <h1 className="b_28_36 board_title">게시물 등록</h1>
      {!isLoggedIn && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          borderRadius: '4px', 
          padding: '12px', 
          marginBottom: '20px',
          color: '#856404'
        }}>
          게시글을 작성하려면 로그인이 필요합니다.
        </div>
      )}

      <form className="board_form" onSubmit={(e) => e.preventDefault()}>
        <div className="row two">
          <div className="field">
            <label className="sb_16_24">
              작성자 <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder={isLoggedIn ? user?.name || "로그인된 사용자" : "로그인이 필요합니다"}
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              disabled={true}
              style={{ 
                backgroundColor: '#f5f5f5', 
                cursor: 'not-allowed',
                color: '#666'
              }}
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
              <button type="button" className="btn-search sb_18_24" onClick={openPostcode}>우편번호 검색</button>
            </div>
            <input type="text" placeholder="주소를 입력해 주세요." value={address} readOnly />
            <input type="text" placeholder="상세주소" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label className="sb_16_24">유튜브 링크</label>
            <input type="url" placeholder="링크를 입력해 주세요." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} />
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
                        src={imageUrls[index]?.startsWith("http") ? imageUrls[index]! : `https://storage.googleapis.com/${imageUrls[index]}`}
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
          <button type="button" className="btn-secondary">취소</button>
          <button
            type="button"
            className="btn-primary"
            disabled={isSubmitting || !isLoggedIn}
            onClick={handleSubmit}
            title={!isLoggedIn ? "로그인이 필요합니다" : ""}
          >
            {isSubmitting ? "등록 중..." : !isLoggedIn ? "로그인 필요" : "등록하기"}
          </button>
        </div>
        {apiError && <p className="error_text" style={{ marginTop: 8 }}>{apiError}</p>}
      </form>

      {isModalOpen && (
        <div className="modal_backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2 className="b_20_28">등록 완료</h2>
            <p className="r_14_20">게시글이 등록되었습니다.</p>
            <div className="modal_actions">
              <button
                className="btn"
                onClick={() => {
                  setIsModalOpen(false);
                  if (createdBoardId) {
                    router.push(`/board/${createdBoardId}`);
                  }
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