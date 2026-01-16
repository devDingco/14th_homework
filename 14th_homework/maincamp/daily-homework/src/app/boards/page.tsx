'use client';

import { ChangeEvent, useState } from 'react';
import { useQuery } from '@apollo/client';
import BoardListPage from '@/components/boards-list/list';
import PaginationComponent from '@/components/boards-list/pagination';
import PageLayout from '@/commons/components/page-layout';
import _ from 'lodash';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from '@/components/boards-list/list/queries';
import SearchComponent from '@/components/boards-list/search';
import { FetchBoardsQuery, QueryFetchBoardsArgs } from '@/commons/graphql/graphql';

export default function BoardsListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  // 게시글 데이터 가져오기
  const { data, refetch } = useQuery<FetchBoardsQuery, QueryFetchBoardsArgs>(FETCH_BOARDS, {
    variables: {
      page: currentPage,
      search: keyword,
    },
  });

  // 검색어에 따른 게시글 수 가져오기
  const { data: countData } = useQuery(FETCH_BOARDS_COUNT, {
    variables: { search: keyword },
  });

  // 마지막 페이지 계산 (한 페이지당 10개씩)
  const lastPage = countData ? Math.ceil(countData.fetchBoardsCount / 10) : 1;

  const getDebounce = _.debounce((value) => {
    setKeyword(value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    refetch({
      search: value,
      page: 1,
    });
  }, 500);

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  // 페이지 변경 함수
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    refetch({
      page,
      search: keyword,
    });
  };

  return (
    <PageLayout>
      <SearchComponent onChange={onChangeKeyword} />
      <BoardListPage
        data={data}
        refetch={refetch}
        currentPage={currentPage}
        totalCount={countData?.fetchBoardsCount || 0}
        keyword={keyword}
      />
      <PaginationComponent
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={onPageChange}
      />
    </PageLayout>
  );
}
