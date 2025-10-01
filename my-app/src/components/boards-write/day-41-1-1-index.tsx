// src/app/react-hook-form-demo/page.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==================== Zod 스키마 정의 ====================

// 게시글 등록 스키마
const createBoardSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해 주세요.")
    .min(2, "제목은 2자 이상 입력해 주세요."),
  writer: z.string().min(1, "작성자 명을 입력해 주세요."),
  password: z
    .string()
    .min(1, "비밀번호를 입력해 주세요.")
    .min(8, "비밀번호는 8자 이상 입력해 주세요.")
    .max(16, "비밀번호는 16자 이하로 입력해 주세요."),
  content: z.string().min(1, "내용을 입력해 주세요."),
  youtubeUrl: z.string().optional(),
  boardAddress: z
    .object({
      zipcode: z.string().optional(),
      address: z.string().optional(),
      addressDetail: z.string().optional(),
    })
    .optional(),
});

// 게시글 수정 스키마 (작성자 제외)
const updateBoardSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해 주세요.")
    .min(2, "제목은 2자 이상 입력해 주세요."),
  password: z
    .string()
    .min(1, "비밀번호를 입력해 주세요.")
    .min(8, "비밀번호는 8자 이상 입력해 주세요.")
    .max(16, "비밀번호는 16자 이하로 입력해 주세요."),
  content: z.string().min(1, "내용을 입력해 주세요."),
  youtubeUrl: z.string().optional(),
  boardAddress: z
    .object({
      zipcode: z.string().optional(),
      address: z.string().optional(),
      addressDetail: z.string().optional(),
    })
    .optional(),
});

// 타입 정의
type CreateBoardFormData = z.infer<typeof createBoardSchema>;
type UpdateBoardFormData = z.infer<typeof updateBoardSchema>;

// ==================== 게시글 등록 컴포넌트 ====================

const BoardCreateForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateBoardFormData>({
    resolver: zodResolver(createBoardSchema),
    mode: "onChange",
    defaultValues: {
      boardAddress: {
        zipcode: "",
        address: "",
        addressDetail: "",
      },
    },
  });

  const onSubmit = async (data: CreateBoardFormData) => {
    setIsSubmitting(true);
    setSubmitResult("");

    try {
      // 실제 API 호출 대신 가짜 구현
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("게시글 등록 데이터:", data);
      setSubmitResult(" 게시글이 성공적으로 등록되었습니다!");
      reset();
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      setSubmitResult(" 게시글 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedTitle = watch("title");
  const watchedPassword = watch("password");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">게시글 등록</h1>
        <p className="text-gray-600">
          React Hook Form + Zod를 사용한 유효성 검사
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 작성자 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            작성자 *
          </label>
          <input
            type="text"
            {...register("writer")}
            placeholder="작성자 명을 입력해 주세요."
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.writer
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.writer && (
            <p className="mt-1 text-sm text-red-600">{errors.writer.message}</p>
          )}
        </div>

        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 *
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="제목을 입력해 주세요."
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <div className="mt-1 flex justify-between">
            {errors.title ? (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            ) : (
              <p className="text-sm text-gray-500">
                최소 2자 이상 입력해주세요
              </p>
            )}
            <p
              className={`text-sm ${
                watchedTitle?.length >= 2 ? "text-green-600" : "text-gray-500"
              }`}
            >
              {watchedTitle?.length || 0} / 2
            </p>
          </div>
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용 *
          </label>
          <textarea
            rows={6}
            {...register("content")}
            placeholder="내용을 입력해 주세요."
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.content
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            비밀번호 *
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="비밀번호를 입력해 주세요."
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <div className="mt-1 flex justify-between">
            {errors.password ? (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            ) : (
              <p className="text-sm text-gray-500">8~16자로 입력해주세요</p>
            )}
            <p
              className={`text-sm ${
                watchedPassword &&
                watchedPassword.length >= 8 &&
                watchedPassword.length <= 16
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {watchedPassword?.length || 0} / 8-16
            </p>
          </div>
        </div>

        {/* 유튜브 링크 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            유튜브 링크
          </label>
          <input
            type="url"
            {...register("youtubeUrl")}
            placeholder="링크를 입력해 주세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 주소 */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            주소
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              {...register("boardAddress.zipcode")}
              placeholder="01234"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              우편번호 검색
            </button>
          </div>
          <input
            type="text"
            {...register("boardAddress.address")}
            placeholder="주소를 입력해 주세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            {...register("boardAddress.addressDetail")}
            placeholder="상세주소"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                등록 중...
              </>
            ) : (
              "등록하기"
            )}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            초기화
          </button>
        </div>

        {/* 결과 메시지 */}
        {submitResult && (
          <div
            className={`p-4 rounded-lg ${
              submitResult.includes("")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {submitResult}
          </div>
        )}
      </form>

      {/* 폼 상태 디버깅 정보 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">🔍 폼 상태 정보</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">
              제목 길이:{" "}
              <span className="font-mono">{watchedTitle?.length || 0}</span>
            </p>
            <p className="text-gray-600">
              비밀번호 길이:{" "}
              <span className="font-mono">{watchedPassword?.length || 0}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              에러 개수:{" "}
              <span className="font-mono">{Object.keys(errors).length}</span>
            </p>
            <p className="text-gray-600">
              제출 가능:{" "}
              <span className="font-mono">
                {Object.keys(errors).length === 0 ? "" : ""}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== 게시글 수정 컴포넌트 ====================

const BoardUpdateForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdateBoardFormData>({
    resolver: zodResolver(updateBoardSchema),
    mode: "onChange",
    defaultValues: {
      title: "기존 게시글 제목",
      content: "기존 게시글 내용입니다.\n수정할 내용을 입력해주세요.",
      boardAddress: {
        zipcode: "12345",
        address: "기존 주소",
        addressDetail: "기존 상세주소",
      },
    },
  });

  const onSubmit = async (data: UpdateBoardFormData) => {
    setIsSubmitting(true);
    setSubmitResult("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("게시글 수정 데이터:", data);
      setSubmitResult(" 게시글이 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      setSubmitResult(" 게시글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedTitle = watch("title");
  const watchedPassword = watch("password");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">게시글 수정</h1>
        <p className="text-gray-600">
          React Hook Form + Zod를 사용한 유효성 검사
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 *
          </label>
          <input
            type="text"
            {...register("title")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <div className="mt-1 flex justify-between">
            {errors.title ? (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            ) : (
              <p className="text-sm text-gray-500">
                최소 2자 이상 입력해주세요
              </p>
            )}
            <p
              className={`text-sm ${
                watchedTitle?.length >= 2 ? "text-green-600" : "text-gray-500"
              }`}
            >
              {watchedTitle?.length || 0} / 2
            </p>
          </div>
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용 *
          </label>
          <textarea
            rows={6}
            {...register("content")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.content
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            비밀번호 *
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="비밀번호를 입력해 주세요."
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <div className="mt-1 flex justify-between">
            {errors.password ? (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            ) : (
              <p className="text-sm text-gray-500">8~16자로 입력해주세요</p>
            )}
            <p
              className={`text-sm ${
                watchedPassword &&
                watchedPassword.length >= 8 &&
                watchedPassword.length <= 16
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {watchedPassword?.length || 0} / 8-16
            </p>
          </div>
        </div>

        {/* 유튜브 링크 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            유튜브 링크
          </label>
          <input
            type="url"
            {...register("youtubeUrl")}
            placeholder="링크를 입력해 주세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 주소 */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            주소
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              {...register("boardAddress.zipcode")}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              우편번호 검색
            </button>
          </div>
          <input
            type="text"
            {...register("boardAddress.address")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            {...register("boardAddress.addressDetail")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                수정 중...
              </>
            ) : (
              "수정하기"
            )}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            취소
          </button>
        </div>

        {/* 결과 메시지 */}
        {submitResult && (
          <div
            className={`p-4 rounded-lg ${
              submitResult.includes("")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {submitResult}
          </div>
        )}
      </form>
    </div>
  );
};

// ==================== 메인 데모 페이지 ====================

export default function ReactHookFormDemo() {
  const [activeTab, setActiveTab] = useState<"create" | "update">("create");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Day 41: React Hook Form + Zod
          </h1>
          <p className="text-gray-600">
            폼 관리와 유효성 검사를 위한 모던한 접근 방식
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab("create")}
              className={`px-6 py-3 rounded-md transition-colors ${
                activeTab === "create"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              게시글 등록
            </button>
            <button
              onClick={() => setActiveTab("update")}
              className={`px-6 py-3 rounded-md transition-colors ${
                activeTab === "update"
                  ? "bg-green-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              게시글 수정
            </button>
          </div>
        </div>

        {/* 폼 렌더링 */}
        {activeTab === "create" ? <BoardCreateForm /> : <BoardUpdateForm />}

        {/* 기능 설명 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="font-semibold text-blue-600 mb-3">
              React Hook Form
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 성능 최적화된 폼 관리</li>
              <li>• 제어/비제어 컴포넌트 지원</li>
              <li>• 리렌더링 최소화</li>
              <li>• 쉬운 폼 상태 관리</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="font-semibold text-green-600 mb-3">
              Zod 유효성 검사
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 타입 안전한 스키마 정의</li>
              <li>• 런타임 유효성 검증</li>
              <li>• 사용자 친화적 에러 메시지</li>
              <li>• TypeScript와 완벽 통합</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="font-semibold text-purple-600 mb-3"> 검증 규칙</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 제목: 최소 2자 이상</li>
              <li>• 비밀번호: 8~16자</li>
              <li>• 필수 필드: 제목, 작성자, 내용, 비밀번호</li>
              <li>• 실시간 유효성 검사</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
