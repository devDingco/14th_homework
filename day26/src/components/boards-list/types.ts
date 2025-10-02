// src/components/boards-list/types.ts
// 서버에서 받아올 데이터(게시글 하나)의 형태
export interface IBoard { // 더 일반적인 이름으로 변경
  _id: string;
  title: string;
  writer: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  images: string[];
  youtubeUrl: string | null;
  __typename: string;
}
  //types.ts (데이터 타입을 정의할 설계도)