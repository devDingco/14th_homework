
// 게시글 상세 데이터의 타입 정의
export interface IUser {
    _id: string;
    email: string;
    name: string;
    picture: string;
  }
  
  export interface IBoardDetail {
    _id: string;
    writer: string;
    title: string;
    contents: string;
    youtubeUrl?: string;
    likeCount?: number;
    dislikeCount?: number;
    images?: string[];
    user?: IUser;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
  }
  