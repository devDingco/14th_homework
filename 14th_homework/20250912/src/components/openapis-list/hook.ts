import { useState, useEffect, useCallback } from "react";
import { fetchUsers } from "./queries";
import { User } from "./types";

export function useUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchMore = useCallback(async () => {
    if (isLoading || !hasMore) {
      console.log(`fetchMore 스킵: isLoading=${isLoading}, hasMore=${hasMore}`);
      return;
    }

    console.log(`fetchMore 호출: page=${page}, users.length=${users.length}`);
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3초 지연
      const response = await fetchUsers(10);
      const newUsers = response.results;
      console.log(`새 사용자 로드: ${newUsers.length}명`);
      
      setUsers((prev) => {
        const updated = [...prev, ...newUsers];
        console.log(`총 사용자: ${updated.length}명`);
        return updated;
      });
      setPage((prev) => prev + 1);
      setHasMore(newUsers.length === 10 && page < 10); // 최대 100명 제한
    } catch (err: any) {
      console.error("fetchMore 에러:", err.message);
      setError(err.message || "사용자를 불러오는 중 에러가 발생했습니다.");
      setHasMore(false);
    } finally {
      setIsLoading(false);
      console.log("fetchMore 완료: isLoading=false");
    }
  }, [isLoading, hasMore, page]); // users.length 제거

  useEffect(() => {
    console.log("초기 로드 시작");
    if (users.length === 0 && !isLoading) {
      fetchMore();
    }
  }, [fetchMore, users.length, isLoading]);

  return { users, isLoading, hasMore, error, fetchMore };
}