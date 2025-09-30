// src/app/hoc-demo/page.tsx
"use client";

import React, { useState, useEffect, ComponentType } from "react";
import { useRouter, usePathname } from "next/navigation";

// ==================== 타입 정의 ====================
export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
}

export type WithAuthProps = {
  auth: AuthState;
};

// ==================== HOC 구현 ====================
export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P & WithAuthProps>,
  options?: {
    requiredRole?: "USER" | "ADMIN";
    redirectTo?: string;
    loadingComponent?: React.ReactNode;
  }
) {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();
    const [authState, setAuthState] = useState<AuthState>({
      isLoggedIn: false,
      user: null,
      isLoading: true,
    });

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const token = localStorage.getItem("accessToken");

          if (token) {
            setAuthState({
              isLoggedIn: true,
              user: {
                id: "user-123",
                email: "user@example.com",
                name: "테스트 사용자",
                role: "USER",
              },
              isLoading: false,
            });
          } else {
            setAuthState({
              isLoggedIn: false,
              user: null,
              isLoading: false,
            });

            if (options?.redirectTo && pathname !== options.redirectTo) {
              router.push(options.redirectTo);
            }
          }
        } catch (error) {
          console.error("인증 확인 중 오류:", error);
          setAuthState({
            isLoggedIn: false,
            user: null,
            isLoading: false,
          });
        }
      };

      checkAuth();
    }, [router, pathname]);

    useEffect(() => {
      if (
        !authState.isLoading &&
        authState.isLoggedIn &&
        options?.requiredRole
      ) {
        const hasPermission = authState.user?.role === options.requiredRole;
        if (!hasPermission) {
          router.push("/hoc-demo/unauthorized");
        }
      }
    }, [authState, router]);

    if (authState.isLoading) {
      return (
        options?.loadingComponent || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">인증 확인 중...</p>
            </div>
          </div>
        )
      );
    }

    if (
      options?.redirectTo &&
      !authState.isLoggedIn &&
      pathname !== options.redirectTo
    ) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">리다이렉트 중...</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} auth={authState} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return ComponentWithAuth;
}

export function withPublic<P extends object>(
  WrappedComponent: ComponentType<P & { auth: AuthState }>,
  options?: {
    redirectTo?: string;
  }
) {
  const ComponentWithPublic = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();
    const [authState, setAuthState] = useState<AuthState>({
      isLoggedIn: false,
      user: null,
      isLoading: true,
    });

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const token = localStorage.getItem("accessToken");

          if (token) {
            setAuthState({
              isLoggedIn: true,
              user: {
                id: "user-123",
                email: "user@example.com",
                name: "테스트 사용자",
                role: "USER",
              },
              isLoading: false,
            });

            if (options?.redirectTo && pathname !== options.redirectTo) {
              router.push(options.redirectTo);
            }
          } else {
            setAuthState({
              isLoggedIn: false,
              user: null,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("인증 확인 중 오류:", error);
          setAuthState({
            isLoggedIn: false,
            user: null,
            isLoading: false,
          });
        }
      };

      checkAuth();
    }, [router, pathname]);

    if (authState.isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} auth={authState} />;
  };

  ComponentWithPublic.displayName = `withPublic(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return ComponentWithPublic;
}

// ==================== 데모 페이지 컴포넌트들 ====================

// 1. 홈 페이지 (퍼블릭)
const HomePage = ({ auth }: WithAuthProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2"> 홈페이지</h1>
          <p className="text-gray-600 mb-6">
            누구나 접근 가능한 공개 페이지입니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">인증 상태</h3>
              <p
                className={
                  auth.isLoggedIn ? "text-green-600" : "text-orange-600"
                }
              >
                {auth.isLoggedIn ? " 로그인됨" : " 로그인 필요"}
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">페이지 정보</h3>
              <p className="text-green-700">퍼블릭 접근 가능</p>
            </div>
          </div>

          {auth.user && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">
                사용자 정보
              </h3>
              <div className="space-y-1 text-sm">
                <p> 이름: {auth.user.name}</p>
                <p> 이메일: {auth.user.email}</p>
                <p> 역할: {auth.user.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. 마이페이지 (로그인 필요)
const MyPage = ({ auth }: WithAuthProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">마이페이지</h1>
          <p className="text-gray-600 mb-6">
            로그인한 사용자만 접근 가능합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">접근 상태</h3>
              <p className="text-green-600"> 인증된 사용자</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">HOC 정보</h3>
              <p className="text-blue-700">withAuth 적용됨</p>
            </div>
          </div>

          {auth.user && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border">
                <h3 className="font-semibold text-gray-800 mb-3">개인 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">아이디:</span>{" "}
                      {auth.user.id}
                    </p>
                    <p>
                      <span className="font-medium">이름:</span>{" "}
                      {auth.user.name}
                    </p>
                    <p>
                      <span className="font-medium">이메일:</span>{" "}
                      {auth.user.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">역할:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs ${
                          auth.user.role === "ADMIN"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {auth.user.role}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">상태:</span>
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        활성
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  HOC 동작 설명
                </h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 페이지 접근 시 자동 인증 확인</li>
                  <li>• 로그인되지 않으면 /login으로 리다이렉트</li>
                  <li>• 인증 상태를 props로 전달</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. 관리자 페이지 (ADMIN 권한 필요)
const AdminPage = ({ auth }: WithAuthProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ⚡ 관리자 페이지
          </h1>
          <p className="text-gray-600 mb-6">
            ADMIN 역할을 가진 사용자만 접근 가능합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">권한 상태</h3>
              <p
                className={
                  auth.user?.role === "ADMIN"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {auth.user?.role === "ADMIN" ? " ADMIN 권한" : " 권한 없음"}
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">HOC 설정</h3>
              <p className="text-purple-700">requiredRole: ADMIN</p>
            </div>
          </div>

          {auth.user && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-semibold text-gray-800 mb-3">
                  관리자 기능
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded border text-center">
                    <div className="text-2xl mb-2"></div>
                    <p className="text-sm font-medium">사용자 관리</p>
                  </div>
                  <div className="p-3 bg-white rounded border text-center">
                    <div className="text-2xl mb-2"></div>
                    <p className="text-sm font-medium">시스템 통계</p>
                  </div>
                  <div className="p-3 bg-white rounded border text-center">
                    <div className="text-2xl mb-2"></div>
                    <p className="text-sm font-medium">설정 관리</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">
                  현재 접근자
                </h3>
                <p className="text-blue-700">
                  <strong>{auth.user.name}</strong> ({auth.user.email}) -{" "}
                  {auth.user.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. 로그인 페이지 (이미 로그인한 사용자는 리다이렉트)
const LoginPage = ({ auth }: WithAuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    // 로그인 처리 (가짜 구현)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    localStorage.setItem("accessToken", "fake-jwt-token");
    window.location.href = "/hoc-demo/mypage";
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/hoc-demo";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2"> 로그인</h1>

          {auth.isLoggedIn ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-600 font-medium">
                  이미 로그인되어 있습니다.
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {auth.user?.name}님 환영합니다!
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => (window.location.href = "/hoc-demo/mypage")}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  마이페이지로 이동
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 주소
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center"
              >
                {isLoggingIn ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    로그인 중...
                  </>
                ) : (
                  "로그인"
                )}
              </button>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  테스트 정보
                </h3>
                <p className="text-sm text-yellow-700">
                  아무 이메일과 비밀번호로 로그인 가능합니다.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. 권한 없음 페이지
const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl mb-4"></div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            접근 권한 없음
          </h1>
          <p className="text-gray-600 mb-6">
            이 페이지에 접근할 수 있는 권한이 없습니다. 필요한 권한이 있다면
            관리자에게 문의해주세요.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/hoc-demo")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              홈으로 이동
            </button>
            <button
              onClick={() => (window.location.href = "/hoc-demo/login")}
              className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              로그인 페이지
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== HOC 적용 ====================
const HomePageWithPublic = withPublic(HomePage);
const MyPageWithAuth = withAuth(MyPage, {
  redirectTo: "/hoc-demo/login",
  loadingComponent: (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-600">마이페이지 접근 권한 확인 중...</p>
      </div>
    </div>
  ),
});
const AdminPageWithAuth = withAuth(AdminPage, {
  requiredRole: "ADMIN",
  redirectTo: "/hoc-demo/login",
});
const LoginPageWithPublic = withPublic(LoginPage, {
  redirectTo: "/hoc-demo/mypage",
});

// ==================== 메인 데모 페이지 ====================
export default function HocDemoPage() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "mypage" | "admin" | "login" | "unauthorized"
  >("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePageWithPublic />;
      case "mypage":
        return <MyPageWithAuth />;
      case "admin":
        return <AdminPageWithAuth />;
      case "login":
        return <LoginPageWithPublic />;
      case "unauthorized":
        return <UnauthorizedPage />;
      default:
        return <HomePageWithPublic />;
    }
  };

  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentPage("home")}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            홈
          </button>
          <button
            onClick={() => setCurrentPage("login")}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
          >
            로그인
          </button>
          <button
            onClick={() => setCurrentPage("mypage")}
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors"
          >
            마이페이지
          </button>
          <button
            onClick={() => setCurrentPage("admin")}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
          >
            관리자
          </button>
          <button
            onClick={() => setCurrentPage("unauthorized")}
            className="px-4 py-2 bg-orange-600 rounded hover:bg-orange-700 transition-colors"
          >
            권한없음
          </button>
        </div>
      </nav>

      {/* 현재 페이지 렌더링 */}
      {renderPage()}

      {/* HOC 설명 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            HOC 권한 분기 구현 설명
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-blue-800">withAuth HOC</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li> 로그인 상태 확인</li>
                <li> 역할 기반 접근 제어</li>
                <li> 자동 리다이렉트</li>
                <li> 로딩 상태 관리</li>
                <li> 제네릭 타입 적용</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-green-800">withPublic HOC</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li> 이미 로그인한 사용자 리다이렉트</li>
                <li> 퍼블릭 페이지 접근 관리</li>
                <li> 인증 상태 props 전달</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">테스트 방법</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. "로그인" 페이지에서 아무 정보로 로그인</li>
              <li>2. "마이페이지" 접근 시도 (로그인 필요)</li>
              <li>3. "관리자" 페이지 접근 시도 (권한 없음)</li>
              <li>4. "홈" 페이지는 누구나 접근 가능</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
