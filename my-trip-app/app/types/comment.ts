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
}


