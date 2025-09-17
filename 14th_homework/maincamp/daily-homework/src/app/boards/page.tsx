'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import NewBoardsPage from '@/components/boards-list/list';
import PaginationComponent from '@/components/boards-list/pagination';
import BannerCarousel from '@/commons/layout/banner';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from '@/components/boards-list/list/queries';

export default function BoardsListPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // 게시글 데이터 가져오기
  const { data, refetch } = useQuery(FETCH_BOARDS, {
    variables: { page: currentPage },
  });

  // 전체 게시글 수 가져오기
  const { data: countData } = useQuery(FETCH_BOARDS_COUNT);

  // 마지막 페이지 계산 (한 페이지당 10개씩)
  const lastPage = countData ? Math.ceil(countData.fetchBoardsCount / 10) : 1;

  // 페이지 변경 함수
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    refetch({ page });
  };

  return (
    <div>
      <BannerCarousel />
      <NewBoardsPage
        data={data}
        refetch={refetch}
        currentPage={currentPage}
        totalCount={countData?.fetchBoardsCount || 0}
      />
      <PaginationComponent
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
