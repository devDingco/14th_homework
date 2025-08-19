export type TComment = {
  id: number;
  text: string;
  date: string;
};

export type TCard = {
  id: number;
  imgUrl: string;
  state: string;
  date: string;
  title: string;
  content: string;
  comments: Comment[];
};
