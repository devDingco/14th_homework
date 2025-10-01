"use client";

import React from "react";
import { useOpenApiNew } from "./hook";
import { Button, Input } from "@triptalk/ui-components";
import styles from "./styles.module.css";

export default function OpenApiNew() {
  const { content, updateContent, onClickSubmit, isLoading, error } = useOpenApiNew();

  return (
    <div className={styles.newContainer}>
      <h1>사용자 등록</h1>
      <Input
        type="text"
        placeholder="이름"
        value={content.name}
        onChange={(e) => updateContent("name", e.target.value)}
        fullWidth
      />
      <Input
        type="email"
        placeholder="이메일"
        value={content.email}
        onChange={(e) => updateContent("email", e.target.value)}
        fullWidth
      />
      <Input
        type="text"
        placeholder="사진 URL"
        value={content.picture_url || ""}
        onChange={(e) => updateContent("picture_url", e.target.value)}
        fullWidth
      />
      <Input
        type="text"
        placeholder="국적"
        value={content.nat || ""}
        onChange={(e) => updateContent("nat", e.target.value)}
        fullWidth
      />
      <Button
        variant="primary"
        size="large"
        onClick={onClickSubmit}
        disabled={isLoading}
        loading={isLoading}
        fullWidth
      >
        등록하기
      </Button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}