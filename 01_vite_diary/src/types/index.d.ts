export type TComment = {
  id: number;
  comment: string;
  date: string;
};

export type TCard = {
  id: number;
  imgUrl: string;
  category: string;
  date: string;
  title: string;
  content: string;
  comments: TComment[];
};
