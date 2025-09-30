// src/app/auth-forms-demo/page.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==================== Zod 스키마 정의 ====================

// 로그인 스키마
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .email("이메일 형식이 올바르지 않습니다."),
  password: z
    .string()
    .min(1, "비밀번호를 입력해 주세요.")
    .min(8, "비밀번호는 8자 이상 입력해 주세요.")
    .max(16, "비밀번호는 16자 이하로 입력해 주세요."),
});

// 회원가입 스키마
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .email("이메일 형식이 올바르지 않습니다."),
    password: z
      .string()
      .min(1, "비밀번호를 입력해 주세요.")
      .min(8, "비밀번호는 8자 이상 입력해 주세요.")
      .max(16, "비밀번호는 16자 이하로 입력해 주세요.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/,
        "비밀번호는 영대/소문자, 숫자가 포함되어야 합니다."
      ),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해 주세요."),
    name: z
      .string()
      .min(1, "이름을 입력해 주세요.")
      .min(2, "이름은 2자 이상 입력해 주세요."),
    phone: z
      .string()
      .min(1, "전화번호를 입력해 주세요.")
      .regex(
        /^01[0-9]-\d{3,4}-\d{4}$/,
        "전화번호 형식이 올바르지 않습니다. (010-1234-5678)"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// 타입 정의
type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

// ==================== 로그인 컴포넌트 ====================

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setSubmitResult("");

    try {
      // 실제 API 호출 대신 가짜 구현
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("로그인 데이터:", data);
      setSubmitResult(" 로그인이 성공적으로 완료되었습니다!");
      reset();
    } catch (error) {
      console.error("로그인 실패:", error);
      setSubmitResult(
        " 로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2"> 로그인</h1>
        <p className="text-gray-600">React Hook Form을 사용한 로그인 폼</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이메일 *
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="example@email.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              로그인 중...
            </>
          ) : (
            "로그인"
          )}
        </button>

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

      {/* 테스트 계정 정보 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-2">🧪 테스트 정보</h3>
        <p className="text-sm text-gray-600">
          아무 이메일과 8자 이상 비밀번호로 로그인 가능합니다.
        </p>
      </div>
    </div>
  );
};

// ==================== 회원가입 컴포넌트 ====================

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setSubmitResult("");

    try {
      // 실제 API 호출 대신 가짜 구현
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("회원가입 데이터:", data);
      setSubmitResult(" 회원가입이 성공적으로 완료되었습니다!");
      reset();
    } catch (error) {
      console.error("회원가입 실패:", error);
      setSubmitResult(" 회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");
  const watchedConfirmPassword = watch("confirmPassword");
  const watchedName = watch("name");

  // 비밀번호 강도 계산
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    const checks = [
      /[a-z]/, // 소문자
      /[A-Z]/, // 대문자
      /[0-9]/, // 숫자
      /.{8,}/, // 길이
    ];

    checks.forEach((regex) => {
      if (regex.test(password)) strength++;
    });

    const labels = ["매우 약함", "약함", "보통", "강함", "매우 강함"];
    return { strength, label: labels[strength] };
  };

  const passwordStrength = getPasswordStrength(watchedPassword || "");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">👤 회원가입</h1>
        <p className="text-gray-600">
          React Hook Form + Zod를 사용한 회원가입 폼
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이메일 *
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="example@email.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이름 *
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="이름을 입력해 주세요."
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <div className="mt-1 flex justify-between">
            {errors.name ? (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            ) : (
              <p className="text-sm text-gray-500">
                최소 2자 이상 입력해주세요
              </p>
            )}
            <p
              className={`text-sm ${
                watchedName?.length >= 2 ? "text-green-600" : "text-gray-500"
              }`}
            >
              {watchedName?.length || 0} / 2
            </p>
          </div>
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            전화번호 *
          </label>
          <input
            type="tel"
            {...register("phone")}
            placeholder="010-1234-5678"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
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
          <div className="mt-2 space-y-2">
            {errors.password ? (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            ) : (
              <>
                {/* 비밀번호 강도 표시기 */}
                {watchedPassword && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>비밀번호 강도:</span>
                      <span
                        className={`font-medium ${
                          passwordStrength.strength >= 4
                            ? "text-green-600"
                            : passwordStrength.strength >= 3
                            ? "text-yellow-600"
                            : passwordStrength.strength >= 2
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          passwordStrength.strength >= 4
                            ? "bg-green-500"
                            : passwordStrength.strength >= 3
                            ? "bg-yellow-500"
                            : passwordStrength.strength >= 2
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${(passwordStrength.strength / 4) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* 비밀번호 요구사항 체크리스트 */}
                <div className="space-y-1 text-xs">
                  <div
                    className={`flex items-center ${
                      /[a-z]/.test(watchedPassword || "")
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <span className="mr-1">
                      {/[a-z]/.test(watchedPassword || "") ? "" : "○"}
                    </span>
                    소문자 포함
                  </div>
                  <div
                    className={`flex items-center ${
                      /[A-Z]/.test(watchedPassword || "")
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <span className="mr-1">
                      {/[A-Z]/.test(watchedPassword || "") ? "" : "○"}
                    </span>
                    대문자 포함
                  </div>
                  <div
                    className={`flex items-center ${
                      /[0-9]/.test(watchedPassword || "")
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <span className="mr-1">
                      {/[0-9]/.test(watchedPassword || "") ? "" : "○"}
                    </span>
                    숫자 포함
                  </div>
                  <div
                    className={`flex items-center ${
                      (watchedPassword?.length || 0) >= 8
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <span className="mr-1">
                      {(watchedPassword?.length || 0) >= 8 ? "" : "○"}
                    </span>
                    8자 이상
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            비밀번호 확인 *
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="비밀번호를 다시 입력해 주세요."
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <div className="mt-1 flex justify-between">
            {errors.confirmPassword ? (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            ) : watchedConfirmPassword ? (
              <p
                className={`text-sm ${
                  watchedPassword === watchedConfirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {watchedPassword === watchedConfirmPassword
                  ? " 비밀번호가 일치합니다"
                  : " 비밀번호가 일치하지 않습니다"}
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                비밀번호를 다시 입력해주세요
              </p>
            )}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              회원가입 중...
            </>
          ) : (
            "회원가입"
          )}
        </button>

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

      {/* 비밀번호 정규식 설명 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">비밀번호 요구사항</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 영문 소문자(a-z) 포함</li>
          <li>• 영문 대문자(A-Z) 포함</li>
          <li>• 숫자(0-9) 포함</li>
          <li>• 8자 이상 16자 이하</li>
        </ul>
        <p className="text-xs text-blue-600 mt-2">
          정규식: <code>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{(8, 16)}$/</code>
        </p>
      </div>
    </div>
  );
};

// ==================== 메인 데모 페이지 ====================

export default function AuthFormsDemo() {
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Day 41: 로그인/회원가입 폼
          </h1>
          <p className="text-gray-600">
            React Hook Form + Zod를 활용한 모던한 인증 폼
          </p>
        </div>

        {/* 폼 선택 탭 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveForm("login")}
              className={`px-8 py-3 rounded-md transition-colors ${
                activeForm === "login"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setActiveForm("signup")}
              className={`px-8 py-3 rounded-md transition-colors ${
                activeForm === "signup"
                  ? "bg-green-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              👤 회원가입
            </button>
          </div>
        </div>

        {/* 폼 렌더링 */}
        {activeForm === "login" ? <LoginForm /> : <SignupForm />}

        {/* 기능 설명 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="font-semibold text-blue-600 mb-3">
              React Hook Form 장점
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 성능 최적화 (리렌더링 최소화)</li>
              <li>• 쉬운 폼 상태 관리</li>
              <li>• 제어/비제어 컴포넌트 지원</li>
              <li>• 내장 유효성 검사 통합</li>
              <li>• 타입스크립트 완벽 지원</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="font-semibold text-green-600 mb-3">Zod 검증 규칙</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 이메일: @ 포함 필수</li>
              <li>• 비밀번호: 8~16자, 영대/소문자+숫자</li>
              <li>• 비밀번호 확인: 일치 여부 검증</li>
              <li>• 이름: 2자 이상</li>
              <li>• 전화번호: 형식 검증</li>
            </ul>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-4 bg-white px-6 py-3 rounded-lg shadow border">
            <span className="text-sm text-gray-600">기술 스택:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
              React Hook Form
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">
              Zod
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
