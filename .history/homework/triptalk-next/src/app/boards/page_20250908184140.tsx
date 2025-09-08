'use client';
//게시글 목록 페이지
import Image from 'next/image';
import React, { MouseEvent } from 'react';
import styles from './page.module.css';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

// 게시글 데이터의 타입을 정의
interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

// 게시글 목록을 가져올 때의 데이터 타입 정의
interface FetchBoardsData {
  fetchBoards: Board[]; // Board 배열
}

// 게시글 목록을 가져오는 GraphQL 쿼리
const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime # 쿼리 변수 정의
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards( # 서버의 fetchBoards 함수 호출
      endDate: $endDate # 위에서 정의한 변수들을
      startDate: $startDate # 함수의 매개변수로 전달
      search: $search
      page: $page
    ) {
      # 서버에서 받아올 데이터 필드들 지정
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

// 게시글을 삭제하는 GraphQL 뮤테이션
const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardsPage() {


  return (<
  )
