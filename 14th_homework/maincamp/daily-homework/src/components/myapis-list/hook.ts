import { supabase } from '@/commons/libraries/supabase';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import type { Inputs } from './types';
import fetchList, { deleteList } from './queries';

export default function useDataList() {
  const [title, setTitle] = useState<Inputs[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const list = await fetchList();
      setTitle(list);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    await deleteList(id);
    setTitle((prev) => prev.filter((x) => x.id !== id));
  }

  useEffect(() => {
    load();
  }, []);

  return { title, loading, reload: load, onDelete };
}
