// src/app/boards/write/page.tsx
"use client";

import React, { useState, useRef } from "react";

const BoardWritePage = () => {
  const [formData, setFormData] = useState({
    writer: "",
    title: "",
    content: "",
    zipcode: "",
    address: "",
    detailAddress: "",
    youtubeLink: "",
    images: [] as string[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, e.target.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // API 호출 로직 추가
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">게시물 등록</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 작성자 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              작성자 *
            </label>
            <input
              type="text"
              name="writer"
              value={formData.writer}
              onChange={handleInputChange}
              placeholder="작성자 명을 입력해 주세요."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* 제목 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="제목을 입력해 주세요."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* 내용 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용 *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="내용을 입력해 주세요."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* 주소 필드 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              주소
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
                placeholder="01234"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                우편번호 검색
              </button>
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="주소를 입력해 주세요."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleInputChange}
              placeholder="상세주소"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 유튜브 링크 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              유튜브 링크
            </label>
            <input
              type="url"
              name="youtubeLink"
              value={formData.youtubeLink}
              onChange={handleInputChange}
              placeholder="링크를 입력해 주세요."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 사진 첨부 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              사진 첨부
            </label>
            <div className="flex space-x-4">
              {/* 노란색 배경 흰색 소파 이미지 */}
              <div className="w-32 h-32 bg-yellow-100 rounded-lg flex items-center justify-center border-2 border-dashed border-yellow-300">
                <div className="w-20 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-12 h-8 bg-gray-100 rounded"></div>
                </div>
              </div>

              {/* 이미지 업로드 박스 */}
              <div
                onClick={triggerFileInput}
                className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
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
                <span className="text-gray-500 text-xs text-center">
                  클릭해서
                  <br />
                  사진 업로드
                </span>
              </div>

              {/* 숨겨진 파일 입력 */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                multiple
              />
            </div>
          </div>

          {/* 업로드된 이미지 미리보기 */}
          {formData.images.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                업로드된 이미지
              </h3>
              <div className="flex space-x-2 overflow-x-auto">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 제출 버튼 */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="px-12 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWritePage;
