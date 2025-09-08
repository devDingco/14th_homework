import { ApolloError } from "@apollo/client";

export interface IFetchBoard {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

export interface IFetchBoardsData {
  fetchBoards: IFetchBoard[];
}

export interface IUseBoardList {
  data: IFetchBoardsData | undefined;
  onClickDelete: (boardIdToDelete: string) => Promise<void>;
  onClickTitle: (boardId: string) => void;
  formatDate: (dateString: string) => string;
  loading: boolean;
  error?: ApolloError;
}
