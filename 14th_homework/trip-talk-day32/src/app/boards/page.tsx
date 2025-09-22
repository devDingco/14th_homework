"use client";
import BoardsListPage from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";
import { FECTH_BOARDS_COUNT, FETCH_BOARDS } from "./queries";
// import Banner from "@/components/boards-list/banner";

export default function BoardsPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FECTH_BOARDS_COUNT);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  return (
    <div className="w-full max-w-7xl">
      <BoardsListPage data={data?.fetchBoards} />
      <Pagination lastPage={lastPage} refetch={refetch} />
    </div>
  );
}
