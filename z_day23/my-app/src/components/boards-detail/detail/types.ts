import { FetchBoardDetailQuery } from "@/commons/graphql/graphql";
import { DocumentNode } from "@apollo/client";

export interface IFetchBoardData {
  fetchBoard: {
    _id: string;
    writer: string;
    title: string;
    contents: string;
    createdAt: string;
  };
}

export interface IUpdateBoardData {
  updateBoard: {
    _id: string;
    title: string;
    contents: string;
    writer: string;
    createdAt: string;
  };
}

export interface IUseBoardDetail {
  loading: boolean;
  data: FetchBoardDetailQuery | undefined;
  error: any;
  onClickUpdateMove: () => void;
  onClickMoveToList: () => void;
}
