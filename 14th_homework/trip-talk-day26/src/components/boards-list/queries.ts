"use client";
import { gql } from "@apollo/client";

export interface IFetchBoard {
  _id: string;
  title: string;
  writer: string;
  createdAt: string;
}
export const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      title
      writer
      createdAt
    }
  }
`;
export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId_: ID!) {
    deleteBoard(boardId: $boardId_)
  }
`;
