'use client';
import { supabase } from '@/commons/libraries/supabase';
import { use, useState } from 'react';

export default function MyApisList() {
  const [movies, setMovies] = useState([]);
  const onClickFetch = async () => {
    const { data } = await supabase.from('movies').select('*');
    setMovies(data);
  };

  return (
    <>
      <div>
        <button onClick={onClickFetch}>조회하기</button>
      </div>
    </>
  );
}
