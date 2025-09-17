// src/components/boards-write/index.tsx
"use client";

import React, { useState } from "react";

interface BoardForm {
  title: string;
  content: string;
  writer: string;
}

const BoardsWrite = () => {
  const [form, setForm] = useState<BoardForm>({
    title: "",
    content: "",
    writer: "",
  });

  // 하나의 함수로 통합된 입력 처리
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // API 호출 로직 추가
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">작성자 *</label>
          <input
            type="text"
            name="writer"
            value={form.writer}
            onChange={handleInputChange}
            placeholder="작성자 명을 입력해 주세요."
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">제목 *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="제목을 입력해 주세요."
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">내용 *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleInputChange}
            placeholder="내용을 입력해 주세요."
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default BoardsWrite;
