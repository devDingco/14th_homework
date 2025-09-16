// src/app/boards/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import BoardsList from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
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
  const [searchKeyword, _setSearchKeyword] = useState("");
  const [startDate, _setStartDate] = useState(null);
  const [endDate, _setEndDate] = useState(null);

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
    boardsRefetch({ page });
  };

  if (boardsLoading || countLoading) return <div className="text-center mt-20">로딩 중입니다...</div>;
  if (boardsError || countError) return <div className="text-center mt-20 text-red-500">에러가 발생했습니다.</div>;

  const onClickNew = () => { router.push("/boards-new"); };
  const onClickRow = (boardId: string) => { router.push(`/boards/${boardId}`); };
  const onClickDelete = (boardId: string) => { console.log(`게시글 ID ${boardId} 삭제`); };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <BoardsList boards={boardsData?.fetchBoards || []} onClickNew={onClickNew} onClickRow={onClickRow} onClickDelete={onClickDelete} />
        <Pagination currentPage={currentPage} totalPage={totalPage} onChangePage={onChangePage} />
      </div>
    </Layout>
  );
}