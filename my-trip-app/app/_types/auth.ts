export interface FlexColumnCenter {
  display: "flex" | "grid" | string;
  flexDirection?: "row" | "column" | string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  gridTemplateColumns?: string;
  margin?: string;
  overflow?: string;
}

// 유저 정보 관련 타입 정의
export interface User {
  _id: string;
  email: string;
  name: string;
  userPoint?: {
    amount: number;
  };
  picture?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  name: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
}
