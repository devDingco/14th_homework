'use client';

import { FetchBoardsQuery } from '@/commons/graphql/graphql';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState, MouseEvent, ChangeEvent } from 'react';
import _ from 'lodash';
import { FETCH_BOARDS } from '@/components/boards-list/list/queries';
export default function Search() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const { data, refetch } = useQuery<FetchBoardsQuery>(FETCH_BOARDS);
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    refetch({ page: Number(event.currentTarget.id) });
  };
  const getDebounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1,
    });
    setKeyword(value);
  }, 500);

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };
  const onClickEdit = () => {
    router.push('/boards/new');
  };

  return (
    <div>
      검색어입력: <input type="text" onChange={onChangeKeyword} />
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>
            {el.title
              .replaceAll(keyword, `#$%${keyword}#$%`)
              .split('#$%')
              .map((el, index) => (
                <span
                  key={`${el}_${index}`}
                  style={{ color: el === keyword ? 'red' : 'black' }}
                >
                  {el}
                </span>
              ))}
          </span>
          <span>{el.writer}</span>
        </div>
      ))}
      {new Array(10).fill(1).map((_, index) => (
        <button key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {index + 1}
        </button>
      ))}
      <button onClick={onClickEdit}>트립토크 등록</button>
    </div>
  );
}
