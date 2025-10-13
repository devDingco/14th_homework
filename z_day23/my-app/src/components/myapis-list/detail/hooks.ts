import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IBoard } from "./types";
import { fetchBoardById } from "./queries";

export const useContentDetail = (id: string) => {
  const router = useRouter();
  const [board, setBoard] = useState<IBoard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchBoardById(id);

      if (error || !data) {
        setError("게시글을 찾을 수 없습니다.");
        setLoading(false);
        return;
      }

      setBoard(data);
      setLoading(false);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const navigateToList = () => {
    router.push("/myapis");
  };

  return {
    board,
    loading,
    error,
    navigateToList,
  };
};
