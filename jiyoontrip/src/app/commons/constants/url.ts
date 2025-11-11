// URL 경로 관리
export const ROUTES = {
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },
  BOARDS: {
    LIST: "/boards",
    DETAIL: (id: string) => `/boards/${id}`,
    NEW: "/boards/new",
  },
  MYPAGE: {
    TRANSACTION_BOOKMARK: "/mypage/transaction-bookmark",
    POINT_HISTORY: "/mypage/point-history",
    PASSWORD_CHANGE: "/mypage/password-change",
  },
  PURCHASE: {
    LIST: "/purchase",
    DETAIL: (id: string) => `/purchase/${id}`,
    WRITE: "/purchase/write",
  },
} as const;

// URL 메타 정보 (접근 권한, 레이아웃 노출 여부)
type AccessType = "PUBLIC" | "MEMBER_ONLY";

interface RouteMetadata {
  access: AccessType;
  showBanner: boolean;
  showNavigation: boolean;
}

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  "/auth/signin": {
    access: "PUBLIC",
    showBanner: false,
    showNavigation: false,
  },
  "/auth/signup": {
    access: "PUBLIC",
    showBanner: false,
    showNavigation: false,
  },
  "/boards": {
    access: "PUBLIC",
    showBanner: true,
    showNavigation: true,
  },
  "/boards/[id]": {
    access: "MEMBER_ONLY",
    showBanner: true,
    showNavigation: true,
  },
  "/boards/new": {
    access: "MEMBER_ONLY",
    showBanner: false,
    showNavigation: true,
  },
  "/mypage/transaction-bookmark": {
    access: "MEMBER_ONLY",
    showBanner: false,
    showNavigation: true,
  },
  "/mypage/point-history": {
    access: "MEMBER_ONLY",
    showBanner: false,
    showNavigation: true,
  },
  "/mypage/password-change": {
    access: "MEMBER_ONLY",
    showBanner: false,
    showNavigation: true,
  },
  "/purchase": {
    access: "PUBLIC",
    showBanner: true,
    showNavigation: true,
  },
  "/purchase/[id]": {
    access: "MEMBER_ONLY",
    showBanner: true,
    showNavigation: true,
  },
  "/purchase/write": {
    access: "MEMBER_ONLY",
    showBanner: true,
    showNavigation: true,
  },
};

// 현재 경로의 메타데이터 가져오기 헬퍼 함수
export const getRouteMetadata = (pathname: string): RouteMetadata | null => {
  // 정확히 일치하는 경로 먼저 확인
  if (ROUTE_METADATA[pathname]) {
    return ROUTE_METADATA[pathname];
  }

  // 다이나믹 라우팅 패턴 매칭
  if (pathname.startsWith("/boards/") && pathname !== "/boards/new") {
    return ROUTE_METADATA["/boards/[id]"];
  }

  if (pathname.startsWith("/purchase/") && pathname !== "/purchase/write") {
    return ROUTE_METADATA["/purchase/[id]"];
  }

  return null;
};
