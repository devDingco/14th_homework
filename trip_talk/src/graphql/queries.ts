import { gql } from '@apollo/client';

// 게시판 목록 조회
export const GET_BOARDS = gql`
  query GetBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime) {
    fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {
      _id
      title
      contents
      writer
      createdAt
      updatedAt
      deletedAt
      likeCount
      dislikeCount
      images
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      user {
        _id
        email
        name
        picture
        userPoint {
          _id
          amount
        }
      }
    }
  }
`;

// 게시판 상세 조회
export const GET_BOARD = gql`
  query GetBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      title
      contents
      writer
      createdAt
      updatedAt
      likeCount
      dislikeCount
      images
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      user {
        _id
        name
        picture
      }
    }
  }
`;

// 예약 목록 조회
export const GET_BOOKINGS = gql`
  query GetBookings($page: Int, $searchStartAt: String, $searchEndAt: String, $searchKeyword: String) {
    fetchBookings(
      page: $page
      searchStartAt: $searchStartAt
      searchEndAt: $searchEndAt
      searchKeyword: $searchKeyword
    ) {
      _id
      productName
      summary
      description
      price
      tags
      address
      latitude
      longitude
      createdAt
    }
  }
`;

// 예약 상세 조회
export const GET_BOOKING = gql`
  query GetBooking($bookingId: ID!) {
    fetchBooking(bookingId: $bookingId) {
      _id
      productName
      summary
      description
      price
      tags
      address
      latitude
      longitude
      createdAt
    }
  }
`;

// 사용자 정보 조회
export const GET_USER = gql`
  query GetUser($userId: ID!) {
    fetchUser(userId: $userId) {
      _id
      email
      name
      picture
      userPoint {
        amount
      }
      createdAt
    }
  }
`;

// 로그인된 사용자 정보 조회
export const GET_USER_LOGGED_IN = gql`
  query GetUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        amount
      }
      createdAt
    }
  }
`;

// 게시판 댓글 조회
export const GET_BOARD_COMMENTS = gql`
  query GetBoardComments($boardId: ID!) {
    fetchBoardComments(boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

// 인기 게시판 조회 (핫한 트립토크)
export const GET_BOARDS_OF_THE_BEST = gql`
  query GetBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id
      title
      contents
      writer
      createdAt
      likeCount
      images
    }
  }
`;
