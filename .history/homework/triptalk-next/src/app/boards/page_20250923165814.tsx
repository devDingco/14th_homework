'use client';
//게시글 목록 페이지
import BoardsList from '@/components/boards-list/list';
import Pagination from '@/components/boards-list/pagination';
import { useQuery } from '@apollo/client';
import { FETCH_BOARDS } from '@/components/boards-list/list/queries';
import { FETCH_BOARDS_COUNT } from './queries';
import Search from '@/components/boards-list/search';

export default function BoardsPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  return (
    <>
      <Search />
      <BoardsList data={data?.fetchBoards} />
      <Pagination refetch={refetch} lastPage={lastPage} />
    </>
  );
}
