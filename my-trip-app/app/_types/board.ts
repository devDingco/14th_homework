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
}


