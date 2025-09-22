// src/app/class_quiz/pages/day35-36-all-in-one/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { LikeOutlined } from "@ant-design/icons";

const Day3536AllInOne = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Day 35-1: useRef로 포커스 맞추기 */}
        <PasswordFocusComponent />

        {/* Day 35-2: 이미지 업로드 */}
        <ImageUploadComponent />

        {/* Day 35-3: 이미지 좌측 정렬 알고리즘 */}
        <ImageGridComponent />
      </div>
    </div>
  );
};

// Day 35-1: useRef로 포커스 맞추기
const PasswordFocusComponent = () => {
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 비밀번호 입력창에 자동 포커스
    passwordRef.current?.focus();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-600">
        Day 35-1: useRef로 포커스 맞추기
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            비밀번호 *
          </label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <p className="text-sm text-gray-500">
          페이지 접속 시 자동으로 비밀번호 입력창에 포커스가 이동합니다.
        </p>
      </div>
    </div>
  );
};

// Day 35-2: 이미지 업로드
const ImageUploadComponent = () => {
  const [formData, setFormData] = useState({
    writer: "",
    password: "",
    title: "",
    content: "",
    imageUrl: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 가짜 API 함수들 (실제로는 실제 API 호출로 대체)
  const uploadFileAPI = async (file: File): Promise<string> => {
    // 실제로는 FormData를 사용하여 서버에 업로드
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return URL.createObjectURL(file); // 임시 URL 생성
  };

  const createBoardAPI = async (data: typeof formData): Promise<void> => {
    // 실제로는 서버에 데이터 전송
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("게시물 등록 성공:", data);
    alert("게시물이 등록되었습니다!");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const imageUrl = await uploadFileAPI(file);
        setFormData((prev) => ({ ...prev, imageUrl }));
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBoardAPI(formData);
      // 폼 초기화
      setFormData({
        writer: "",
        password: "",
        title: "",
        content: "",
        imageUrl: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("게시물 등록 실패:", error);
      alert("게시물 등록에 실패했습니다.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-green-600">
        Day 35-2: 이미지 업로드
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              작성자 *
            </label>
            <input
              type="text"
              name="writer"
              value={formData.writer}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호 *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용 *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지 업로드
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
          >
            <LikeOutlined className="text-red-500" />
            <span>이미지 선택</span>
          </button>

          {formData.imageUrl && (
            <div className="mt-3">
              <img
                src={formData.imageUrl}
                alt="Uploaded preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

// Day 35-3: 이미지 좌측 정렬 알고리즘
const ImageGridComponent = () => {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, imageUrl]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-purple-600">
        Day 35-3: 이미지 좌측 정렬 알고리즘
      </h2>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        multiple
      />

      <button
        onClick={triggerFileInput}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        이미지 추가
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative group">
            <img
              src={imageUrl}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}

        {/* 이미지 추가 버튼 */}
        <div
          onClick={triggerFileInput}
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-500">이미지 추가</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">좌측 정렬 알고리즘 특징:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 그리드 레이아웃으로 자동 좌측 정렬</li>
          <li>• 반응형 디자인: 화면 크기에 따라 열 개수 조정</li>
          <li>• 이미지 호버 시 삭제 버튼 표시</li>
          <li>• 어떤 칸을 클릭해도 이미지는 좌측부터 채워짐</li>
        </ul>
      </div>
    </div>
  );
};

export default Day3536AllInOne;
