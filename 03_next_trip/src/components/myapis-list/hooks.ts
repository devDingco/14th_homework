import { useEffect, useState } from 'react';
import { TPost } from './types';
import { getPosts } from './queries';

export const useGetPosts = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const loadPosts = async (page: number) => {
    const res = await getPosts(page, 20);
    if (!res || res.length === 0) {
      setHasMore(false);
      return;
    }
    // setPosts((prev) => [...prev, ...res]);
    setPosts(res);
  };

  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return { posts, hasMore, loadMore };
};
