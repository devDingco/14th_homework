"use client";
import { gql } from "@apollo/client";

export interface IFetchBoard {
  _id: string;
  title: string;
  writer: string;
  createdAt: string;
}
export const FETCH_BOARDS = gql`
  query fetchBoards(
    $page: Int
    $search: String
    $endDate: DateTime
    $startDate: DateTime
  ) {
    fetchBoards(
      page: $page
      search: $search
      endDate: $endDate
      startDate: $startDate
    ) {
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
export const FECTH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;
