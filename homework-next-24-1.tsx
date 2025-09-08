"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BoardWriteProps {
  isEdit?: boolean;
  boardId?: string;
}

interface BoardData {
  writer: string;
  password: string;
  title: string;
  contents: string;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  youtubeUrl?: string;
}

export default function BoardWrite({
  isEdit = false,
  boardId,
}: BoardWriteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BoardData>({
    writer: "",
    password: "",
    title: "",
    contents: "",
    zipcode: "",
    address: "",
    addressDetail: "",
    youtubeUrl: "",
  });

  // 수정 모드일 때 기존 데이터 불러오기
  useEffect(() => {
    if (isEdit && boardId) {
      fetchBoardData();
    }
  }, [isEdit, boardId]);

  const fetchBoardData = async () => {
    try {
      // GRAPHQL-API(fetchBoard) 호출 - 실제 구현 필요
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();

      setFormData({
        writer: data.writer || "",
        password: "", // 비밀번호는 불러오지 않음
        title: data.title || "",
        contents: data.contents || "",
        zipcode: data.zipcode || "",
        address: data.address || "",
        addressDetail: data.addressDetail || "",
        youtubeUrl: data.youtubeUrl || "",
      });
    } catch (error) {
      console.error("Error fetching board data:", error);
      alert("게시글 정보를 불러오는데 실패했습니다.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        // 수정 모드 - 비밀번호 확인
        const password = prompt(
          "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
        );
        if (!password) return;

        // GRAPHQL-API(updateBoard) 호출 - 실제 구현 필요
        const response = await fetch(`/api/boards/${boardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            password: password,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        alert("게시글이 수정되었습니다.");
        router.push(`/boards/${boardId}`);
      } else {
        // 등록 모드 - GRAPHQL-API(createBoard) 호출 - 실제 구현 필요
        const response = await fetch("/api/boards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("게시글 등록에 실패했습니다.");
        }

        alert("게시글이 등록되었습니다.");
        router.push("/boards");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleZipcodeSearch = () => {
    // 우편번호 검색 기능 구현 - 실제 구현 필요
    alert("우편번호 검색 기능 구현 필요");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      {/* 작성자 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          작성자 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="writer"
          value={formData.writer}
          onChange={handleInputChange}
          disabled={isEdit}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          required
        />
      </div>

      {/* 비밀번호 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          비밀번호 <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={isEdit}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          required={!isEdit}
        />
      </div>

      {/* 제목 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* 내용 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="contents"
          value={formData.contents}
          onChange={handleInputChange}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* 주소 */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">주소</label>

        <div className="flex space-x-2">
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            placeholder="01234"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleZipcodeSearch}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            우편번호 검색
          </button>
        </div>

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="서울특별시 강남구"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="addressDetail"
          value={formData.addressDetail}
          onChange={handleInputChange}
          placeholder="1211"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 유튜브 링크 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          유통브 랜크
        </label>
        <input
          type="url"
          name="youtubeUrl"
          value={formData.youtubeUrl}
          onChange={handleInputChange}
          placeholder="빙크를 입력해 주세요."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 사진 업로드 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          사진 함께
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="flex-1 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-400"
            >
              <span className="text-gray-500">+</span>
              <span className="text-gray-400 text-sm ml-1">
                클래픽시 사진 업로드
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex space-x-4 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "처리중..." : isEdit ? "수정하기" : "등록하기"}
        </button>
      </div>
    </form>
  );
}
