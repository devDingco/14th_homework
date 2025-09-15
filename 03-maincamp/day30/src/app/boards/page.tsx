"use client"

import BoardsList from '@/components/boards-list/list';
import Pagination from '@/components/boards-list/pagination';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState } from 'react';


const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;


export default function BoardsPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  console.log(data)
  const [currentPage, setCurrentPage] = useState(1);
  // const [startPage, setStartPage] = useState(1);
  return (
    <div style={{position : "relative"}}>
    <BoardsList data={data?.fetchBoards} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    <Pagination refetch={refetch} lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}