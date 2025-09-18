'use client';

import { useEffect, useState } from 'react';
import { ICat } from './types';

export const useFetchCats = () => {
  const [cats, setCats] = useState<ICat[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const baseUrl = 'https://api.thecatapi.com/v1/images/search';

  const fetchCats = async () => {
    const response = await fetch(`${baseUrl}?limit=10&page=${page}`);
    const data = await response.json();

    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    setCats((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    fetchCats();
  }, [ ]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
      fetchCats();
    }
  };

  return { cats, hasMore, loadMore };
};
