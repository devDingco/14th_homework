'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import _ from 'lodash';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
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

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <DatePicker onChange={onDateChange} placeholder="날짜 선택" />
      <input
        type="text"
        onChange={onChangeKeyword}
        placeholder="제목을 검색해 주세요."
      />
      <button onClick={onClickEdit}>트립토크 등록</button>
    </div>
  );
}
