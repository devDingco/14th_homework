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
  const onClickpage= (event: MouseEvent<HTMLSpanElement>) => {
  const onClickEdit = () => {
    router.push('/boards/new');
  };

  return (<div>
      검색어입력: <input type="text" onChange={onChangeKeyword} />
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>
            {el.title
              .replaceAll(keyword, `#$%${keyword}#$%`)
              .split("#$%")
              .map((el, index) => (
                <span
                  key={`${el}_${index}`}
                  style={{ color: el === keyword ? "red" : "black" }}
                >
                  {el}
                </span>
              ))}
          </span>
          <span>{el.writer}</span>
        </div>
      ))}
      <button onClick={onClickEdit}>트립토크 등록</button>
    </div>
  )
  }
