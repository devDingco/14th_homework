import { useEffect, useState } from 'react';
import { CatImage, UseCatApiResult } from './types';
import { fetchCatImages } from './queries';

export default function useCatApi(): UseCatApiResult {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      try {
        const first = await fetchCatImages(20);
        if (!ignore) {
          setCats(first);
          setHasMore(first.length > 0);
        }
      } catch {
        if (!ignore) setHasMore(false);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // 무한 스크롤에서 호출하는 로더
  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const more = await fetchCatImages(20);
      setCats((prev) => [...prev, ...more]);
      // 랜덤 API 특성상 보통 더 있음. 혹시 0장이면 멈춤.
      setHasMore(more.length > 0);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  // 새로고침
  async function refresh() {
    if (loading) return;
    setLoading(true);
    try {
      const first = await fetchCatImages(20);
      setCats(first);
      setHasMore(first.length > 0);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }
  return { cats, loading, hasMore, loadMore, refresh };
}
