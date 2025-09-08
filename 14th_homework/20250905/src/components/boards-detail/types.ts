export interface BoardsDetailProps {
  boardId: string;
}

export interface FetchBoardData {
  fetchBoard: {
    _id: string;
    writer?: string | null;
    title: string;
    contents: string;
    likeCount: number;
    dislikeCount: number;
    createdAt: any;
    updatedAt: any;
  } | null;
}


