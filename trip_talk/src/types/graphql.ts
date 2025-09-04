// 게시판 관련 타입
export interface BoardAddress {
  zipcode: string;
  address: string;
  addressDetail: string;
}

export interface BoardUser {
  _id: string;
  email: string;
  name: string;
  picture: string;
  userPoint: {
    _id: string;
    amount: number;
  };
}

export interface Board {
  _id: string;
  title: string;
  contents: string;
  writer: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  likeCount: number;
  dislikeCount: number;
  images: string[] | null;
  youtubeUrl?: string | null;
  boardAddress?: BoardAddress | null;
  user?: BoardUser | null;
}

// 인기 게시판 타입 (핫한 트립토크)
export interface BoardOfTheBest {
  _id: string;
  title: string;
  contents: string;
  writer: string;
  createdAt: string;
  likeCount: number;
  images?: string[];
}

export interface BoardComment {
  _id: string;
  writer: string;
  contents: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    _id: string;
    name: string;
    picture: string;
  } | null;
}

export interface CreateBoardInput {
  title: string;
  contents: string;
  writer: string;
  password: string;
  images?: string[];
  youtubeUrl?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
}

export interface UpdateBoardInput {
  title?: string;
  contents?: string;
  writer?: string;
  images?: string[]; // 이미지 URL 배열 추가
}

// 예약 관련 타입
export interface Booking {
  _id: string;
  productName: string;
  summary: string;
  description: string;
  price: number;
  tags: string[];
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt?: string;
  images?: string[]; // 이미지 URL 배열 추가
}

export interface CreateBookingInput {
  productName: string;
  summary: string;
  description: string;
  price: number;
  tags: string[];
  address: string;
  latitude: number;
  longitude: number;
  images?: string[]; // 이미지 URL 배열 추가
}

export interface UpdateBookingInput {
  productName?: string;
  summary?: string;
  description?: string;
  price?: number;
  tags?: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
  images?: string[]; // 이미지 URL 배열 추가
}

// 사용자 관련 타입
export interface User {
  _id: string;
  email: string;
  name: string;
  picture?: string;
  userPoint?: {
    amount: number;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  picture?: string;
}

export interface LoginResponse {
  accessToken: string;
}

// 파일 업로드 관련 타입
export interface UploadedFile {
  url: string;
}

export interface FileUploadResponse {
  uploadFile: UploadedFile;
}

export interface MultipleFileUploadResponse {
  uploadFiles: UploadedFile[];
}

// GraphQL 응답 타입
export interface GraphQLResponse<T> {
  data: T;
  loading: boolean;
  error?: any;
}
