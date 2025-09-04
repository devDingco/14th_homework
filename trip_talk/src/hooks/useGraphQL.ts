import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_BOARDS, GET_BOARD, GET_BOOKINGS, GET_BOOKING, GET_USER, GET_USER_LOGGED_IN } from '../graphql/queries';
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
export const useGetBoards = (variables?: any) => {
  return useQuery(GET_BOARDS, { variables });
};

export const useGetBoard = (boardId: string) => {
  return useQuery(GET_BOARD, { variables: { boardId } });
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
