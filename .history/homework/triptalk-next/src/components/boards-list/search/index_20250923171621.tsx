'use client';

import { FetchBoardsQuery } from '@/commons/graphql/graphql';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FETCH_BOARDS_SEARCH = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;
export default function Search() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const { data, refetch } = useQuery<FetchBoardsQuery>(FETCH_BOARDS_SEARCH);
  const onClickEdit = () => {
    router.push('/boards/new');
  };

  return (
    <div>
      <div>
        <input type="date" />
        <input type="text" />
        <button>검색</button>
      </div>
      <button onClick={onClickEdit}>트립토크 등록</button>
    </div>
  );
}
