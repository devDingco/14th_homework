import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IBoard } from "./types";
import { fetchBoardsFromDB, deleteBoardFromDB } from "./queries";

export const useBoardsList = () => {
  const router = useRouter();
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  const fetchBoards = async (pageNum: number) => {
    setLoading(true);
    const { data, error } = await fetchBoardsFromDB(itemsPerPage, pageNum);

    if (error || !data) {
      setError("게시글을 불러오는 데 실패했습니다.");
      setHasMore(false);
      setLoading(false);
      return;
    }

    if (data.length < itemsPerPage) {
      setHasMore(false);
    }

    setBoards((prevBoards) => {
      const combinedBoards = [...prevBoards, ...data];
      const uniqueIds = new Set();
      return combinedBoards.filter((board) => {
        if (uniqueIds.has(board.id)) {
          return false;
        }
        uniqueIds.add(board.id);
        return true;
      });
    });

    setLoading(false);
  };

  const fetchMoreData = () => {
    if (loading) return;
    setPage((prevPage) => prevPage + 1);
  };

  const onClickDelete = async (id: string) => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    const { error } = await deleteBoardFromDB(id);
    if (error) {
      alert("삭제에 실패했습니다.");
      return;
    }

    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    setPage(0);
    setHasMore(true);
  };

  useEffect(() => {
    fetchBoards(page);
  }, [page]);

  return {
    boards,
    loading,
    error,
    hasMore,
    fetchMoreData,
    onClickDelete,
    router,
  };
};
