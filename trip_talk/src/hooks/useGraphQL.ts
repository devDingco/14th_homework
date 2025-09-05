import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  GET_BOARDS,
  GET_BOARD,
  GET_BOOKINGS,
  GET_BOOKING,
  GET_USER,
  GET_USER_LOGGED_IN,
  GET_BOARDS_OF_THE_BEST,
  GET_BOARD_COMMENTS,
} from '../graphql/queries';
import {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  LOGIN_USER,
  LOGIN_USER_EXAMPLE,
  CREATE_USER,
  LOGOUT_USER,
  RESET_USER_PASSWORD,
  UPDATE_USER,
  UPLOAD_FILE,
  UPLOAD_FILES,
  LIKE_BOARD,
  DISLIKE_BOARD,
} from '../graphql/mutations';
import {
  Board,
  Booking,
  User,
  CreateBoardInput,
  UpdateBoardInput,
  CreateBookingInput,
  UpdateBookingInput,
  CreateUserInput,
  UpdateUserInput,
  LoginResponse,
} from '../types/graphql';

// 게시판 관련 훅
interface GetBoardsVariables {
  page?: number;
  search?: string;
  startDate?: string; // DateTime 형식 (ISO string)
  endDate?: string; // DateTime 형식 (ISO string)
}

export const useGetBoards = (variables?: GetBoardsVariables) => {
  return useQuery(GET_BOARDS, {
    variables,
    fetchPolicy: 'cache-and-network', // 캐시와 네트워크 모두 확인
    notifyOnNetworkStatusChange: true, // 네트워크 상태 변화 알림
  });
};

export const useGetBoard = (boardId: string) => {
  return useQuery(GET_BOARD, { variables: { boardId } });
};

export const useGetBoardComments = (boardId: string) => {
  return useQuery(GET_BOARD_COMMENTS, { variables: { boardId } });
};

export const useLazyGetBoards = () => {
  return useLazyQuery(GET_BOARDS);
};

export const useCreateBoard = () => {
  return useMutation(CREATE_BOARD);
};

export const useUpdateBoard = () => {
  return useMutation(UPDATE_BOARD);
};

export const useDeleteBoard = () => {
  return useMutation(DELETE_BOARD);
};

// 예약 관련 훅
export const useGetBookings = (variables?: any) => {
  return useQuery(GET_BOOKINGS, { variables });
};

export const useGetBooking = (bookingId: string) => {
  return useQuery(GET_BOOKING, { variables: { bookingId } });
};

export const useLazyGetBookings = () => {
  return useLazyQuery(GET_BOOKINGS);
};

export const useCreateBooking = () => {
  return useMutation(CREATE_BOOKING);
};

export const useUpdateBooking = () => {
  return useMutation(UPDATE_BOOKING);
};

export const useDeleteBooking = () => {
  return useMutation(DELETE_BOOKING);
};

// 인증 관련 훅
export const useLoginUser = () => {
  return useMutation(LOGIN_USER);
};

export const useLoginUserExample = () => {
  return useMutation(LOGIN_USER_EXAMPLE);
};

export const useCreateUser = () => {
  return useMutation(CREATE_USER);
};

export const useLogoutUser = () => {
  return useMutation(LOGOUT_USER);
};

export const useResetUserPassword = () => {
  return useMutation(RESET_USER_PASSWORD);
};

export const useUpdateUser = () => {
  return useMutation(UPDATE_USER);
};

// 사용자 정보 관련 훅
export const useGetUser = (userId: string) => {
  return useQuery(GET_USER, { variables: { userId } });
};

export const useGetUserLoggedIn = (options?: any) => {
  return useQuery(GET_USER_LOGGED_IN, options);
};

// 인기 게시판 관련 훅
export const useGetBoardsOfTheBest = () => {
  return useQuery(GET_BOARDS_OF_THE_BEST);
};

// 파일 업로드 관련 훅
export const useUploadFile = () => {
  return useMutation(UPLOAD_FILE);
};

export const useUploadFiles = () => {
  return useMutation(UPLOAD_FILES);
};

// 좋아요/싫어요 관련 훅
export const useLikeBoard = () => {
  return useMutation(LIKE_BOARD);
};

export const useDislikeBoard = () => {
  return useMutation(DISLIKE_BOARD);
};
