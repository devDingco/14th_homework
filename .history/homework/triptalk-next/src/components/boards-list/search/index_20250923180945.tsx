'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import _ from 'lodash';
interface SearchProps {
  refetch: any;
  onKeywordChange: (keyword: string) => void;
}

export default function Search({ refetch, onKeywordChange }: SearchProps) {
  const router = useRouter();
  const getDebounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1,
    });
    onKeywordChange(value);
  }, 500);

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  const onClickEdit = () => {
    router.push('/boards/new');
  };

  return (
    <div>
      <input type='date'
      검색어입력: <input type="text" onChange={onChangeKeyword} />
      <button onClick={onClickEdit}>트립토크 등록</button>
    </div>
  );
}
