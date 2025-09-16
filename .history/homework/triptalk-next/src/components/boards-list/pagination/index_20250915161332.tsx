'use client';

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const FETCH_BOARDS_PAGINATION = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export default function Pagination() {
  const [startPage, setStartPage] = useState(1);
  const { data, refetch } = useQuery(FETCH_BOARDS_COUNT);

  return (
    <div>
      {data?.fetchBoards.map((el)=>
      <div>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
)}