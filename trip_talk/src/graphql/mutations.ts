import { gql } from '@apollo/client';

// 게시판 생성
export const CREATE_BOARD = gql`
  mutation CreateBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      title
      contents
      writer
      createdAt
      images
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

// 게시판 수정
export const UPDATE_BOARD = gql`
  mutation UpdateBoard($boardId: ID!, $updateBoardInput: UpdateBoardInput!) {
    updateBoard(boardId: $boardId, updateBoardInput: $updateBoardInput) {
      _id
      title
      contents
      writer
      updatedAt
    }
  }
`;

// 게시판 삭제
export const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

// 예약 생성
export const CREATE_BOOKING = gql`
  mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
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

// 예약 수정
export const UPDATE_BOOKING = gql`
  mutation UpdateBooking($bookingId: ID!, $updateBookingInput: UpdateBookingInput!) {
    updateBooking(bookingId: $bookingId, updateBookingInput: $updateBookingInput) {
      _id
      productName
      summary
      description
      price
      tags
      address
      latitude
      longitude
      updatedAt
    }
  }
`;

// 예약 삭제
export const DELETE_BOOKING = gql`
  mutation DeleteBooking($bookingId: ID!) {
    deleteBooking(bookingId: $bookingId)
  }
`;

// 로그인
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

// 로그인 예시 (테스트용)
export const LOGIN_USER_EXAMPLE = gql`
  mutation LoginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

// 회원가입
export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

// 로그아웃
export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

// 비밀번호 재설정
export const RESET_USER_PASSWORD = gql`
  mutation ResetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

// 사용자 정보 수정
export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      email
      name
      picture
    }
  }
`;

// 파일 업로드
export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

// 다중 파일 업로드
export const UPLOAD_FILES = gql`
  mutation UploadFiles($files: [Upload!]!) {
    uploadFiles(files: $files) {
      url
    }
  }
`;
