import { gql } from '@apollo/client';

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const FETCH_BOARD = gql`
  query FetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export const FETCH_BOARDS = gql`
  query FetchBoards(
    $page: Int
    $search: String
    $startDate: DateTime  
    $endDate: DateTime  
  ) {
    fetchBoards(
      page: $page
      search: $search
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const UPDATE_BOARD = gql`
  mutation UpdateBoard(
    $boardId: ID!
    $updateBoardInput: UpdateBoardInput!
    $password: String!
  ) {
    updateBoard(
      boardId: $boardId
      updateBoardInput: $updateBoardInput
      password: $password
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query FetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {
    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)
  }
`;
