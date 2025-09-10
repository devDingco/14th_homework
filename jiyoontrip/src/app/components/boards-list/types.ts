export interface IFetchBoard {
  _id: string;
  writer?: string | null | undefined;
  title: string;
  contents: string;
  youtubeUrl: string;
  likeCount: number;
  dislikeCount: number;
  images: string[];
  boardAddress: {
    _id: string;
    zipcode: string;
    address: string;
    addressDetail: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
