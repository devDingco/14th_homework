export interface BestBoard {
  _id: string;
  title: string;
  images?: (string | null)[] | null;
  likeCount?: number | null;
  writer?: string | null;
  user?: { _id?: string | null; name?: string | null } | null;
  createdAt?: string | null;
}

export interface BoardDetail {
  _id: string;
  writer?: string | null;
  title?: string | null;
  contents?: string | null;
  youtubeUrl?: string | null;
  images?: string[] | null;
  likeCount?: number | null;
  dislikeCount?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  boardAddress?: {
    zipcode?: string | null;
    address?: string | null;
    addressDetail?: string | null;
  } | null;
}

// BoardDetail 컴포넌트에서 사용하는 props 타입
export interface BoardDetailProps {
  id: string;
  initialData: {
    title: string;
    authorName: string;
    createdAt: string;
    coverImage: string;
    contents: string;
    badCount: number;
    likeCount: number;
    youtubeUrl: string;
    address?: string;
    detailAddress?: string;
    zipcode?: string;
  };
}

// BoardEdit 컴포넌트에서 사용하는 props 타입
export interface BoardEditProps {
  id: string;
  initialData: any;
}

// 폼 데이터 타입들
export interface BoardFormData {
  writer: string;
  password: string;
  title: string;
  content: string;
  youtubeUrl: string;
  zipcode: string;
  address: string;
  detailAddress: string;
}

export interface BoardEditFormData {
  password: string;
  title: string;
  content: string;
  youtubeUrl: string;
  zipcode: string;
  address: string;
  detailAddress: string;
}

// 모달 컨텐츠 타입
export interface ModalContent {
  type: 'link' | 'address';
  content: string;
}

// Post 객체 타입
export interface PostData {
  title: string;
  authorProfileImage: string;
  authorName: string;
  createdAt: string;
  coverImage: string;
  contents: string;
  badCount: number;
  likeCount: number;
  youtubeUrl: string;
  address?: string;
  detailAddress?: string;
  zipcode?: string;
}


