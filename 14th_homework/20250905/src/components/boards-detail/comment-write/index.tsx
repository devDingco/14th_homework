"use client";

import React from "react";
import { useCommentWrite } from "./hook";
import type { CommentWriteProps } from "./types";

export default function CommentWrite(props: CommentWriteProps) {
  const {
    writer,
    password,
    contents,
    setWriter,
    setPassword,
    setContents,
    isValid,
    onClickSubmit,
    loading,
  } = useCommentWrite(props);

  const contentsLength = contents.length;

  return (
    <div className="content-container">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <h3 className="post-title" style={{ margin: 0 }}>댓글</h3>
        {/* 비활성 별점(나중에 기능 추가 예정) */}
        <div style={{ color: "#D1D5DB", fontSize: 18 }}>☆☆☆☆☆</div>
      </div>

      <div className="form-group first-group">
        <div className="form-row-group">
          <div className="flex-1">
            <label className="label-required">작성자</label>
            <input
              type="text"
              className="input-field"
              placeholder="작성자 입력을 입력해 주세요."
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="label-required">비밀번호</label>
            <input
              type="password"
              className="input-field"
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-group no-border">
        <textarea
          className="textarea-field"
          placeholder="댓글을 입력해 주세요."
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          maxLength={100}
          rows={5}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <span style={{ color: "#9CA3AF", fontSize: 12 }}>{contentsLength}/100</span>
          <button
            className={`button ${isValid ? "" : "primary"}`}
            onClick={onClickSubmit}
            disabled={!isValid || loading}
            style={isValid ? { backgroundColor: "var(--color-primary)", color: "#fff" } : {}}
          >
            댓글 등록
          </button>
        </div>
      </div>
    </div>
  );
}


