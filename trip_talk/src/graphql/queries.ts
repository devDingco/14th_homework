import { gql } from '@apollo/client';

// 게시판 목록 조회
export const GET_BOARDS = gql`
  query GetBoards($page: Int, $searchStartAt: String, $searchEndAt: String, $searchKeyword: String) {
    fetchBoards(page: $page, searchStartAt: $searchStartAt, searchEndAt: $searchEndAt, searchKeyword: $searchKeyword) {
      _id
      title
      contents
      writer
      createdAt
      updatedAt
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
