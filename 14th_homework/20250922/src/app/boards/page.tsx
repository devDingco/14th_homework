// src/app/boards/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import BoardsList from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import Search from "@/components/boards-list/search";
import Layout from "@/commons/layout";

// 게시글 목록을 가져오는 쿼리 (외부에서 사용할 수 있도록 export)
export const FETCH_BOARDS_DOCUMENT = gql`
  query FetchBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime) {
    fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;

// 게시글 총 개수를 가져오는 쿼리 (외부에서 사용할 수 있도록 export)
export const FETCH_BOARDS_COUNT_DOCUMENT = gql`
  query FetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {
    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)
  }
`;

export default function BoardsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {
    data: boardsData,
    loading: boardsLoading,
    error: boardsError,
    refetch: boardsRefetch,
  } = useQuery(FETCH_BOARDS_DOCUMENT, {
    variables: { page: currentPage, search: searchKeyword, startDate: startDate, endDate: endDate },
  });

  const {
    data: countData,
    loading: countLoading,
    error: countError,
    refetch: countRefetch,
  } = useQuery(FETCH_BOARDS_COUNT_DOCUMENT, {
    variables: { search: searchKeyword, startDate: startDate, endDate: endDate },
  });

  useEffect(() => {
    boardsRefetch();
    countRefetch();
  }, [boardsRefetch, countRefetch]);

  const totalBoardCount = countData?.fetchBoardsCount || 0;
  const totalPage = Math.ceil(totalBoardCount / 10);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    boardsRefetch({ page, search: searchKeyword, startDate, endDate });
  };

  const handleSearch = (keyword: string, start: Date | null, end: Date | null) => {
    setSearchKeyword(keyword);
    setStartDate(start);
    setEndDate(end);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    boardsRefetch({ page: 1, search: keyword, startDate: start, endDate: end });
    countRefetch({ search: keyword, startDate: start, endDate: end });
  };

  const handleReset = () => {
    setSearchKeyword("");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
    boardsRefetch({ page: 1, search: "", startDate: null, endDate: null });
    countRefetch({ search: "", startDate: null, endDate: null });
  };

  if (boardsLoading || countLoading) return <div className="text-center mt-20">로딩 중입니다...</div>;
  
  if (boardsError || countError) {
    console.error("GraphQL Error:", boardsError || countError);
    return (
      <div className="text-center mt-20 text-red-500">
        <p>에러가 발생했습니다.</p>
        <p className="text-sm mt-2">{(boardsError || countError)?.message}</p>
        <button 
          onClick={() => {
            boardsRefetch();
            countRefetch();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const onClickRow = (boardId: string) => { router.push(`/boards/${boardId}`); };
  const onClickDelete = (boardId: string) => { console.log(`게시글 ID ${boardId} 삭제`); };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Search onSearch={handleSearch} onReset={handleReset} />
        <BoardsList 
          boards={boardsData?.fetchBoards || []} 
          onClickRow={onClickRow} 
          onClickDelete={onClickDelete}
          searchKeyword={searchKeyword}
        />
        <Pagination currentPage={currentPage} totalPage={totalPage} onChangePage={onChangePage} />
      </div>
    </Layout>
  );
}