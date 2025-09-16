export interface IBoardList {
  __typename?: "Board";
  _id: string;
  writer: string;
  title: string;
  contents: string;
  youtubeUrl?: string | null;
  likeCount: number;
  dislikeCount: number;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
