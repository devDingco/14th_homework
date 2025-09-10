export interface AppComment {
  id: string;
  avatar: string;
  author: string;
  date: string;
  rating: number;
  content: string;
}

export interface NewComment {
  rating: number;
  content: string;
  author?: string;
}

// 문의하기 댓글을 위한 타입
export interface InquiryComment {
  id: string;
  avatar: string;
  author: string;
  date: string;
  content: string;
  replies?: InquiryReply[];
}

export interface InquiryReply {
  id: string;
  avatar: string;
  author: string;
  date: string;
  content: string;
}

export interface NewInquiryComment {
  content: string;
  author?: string;
}

export interface NewInquiryReply {
  content: string;
}


