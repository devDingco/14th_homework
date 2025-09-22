//상세페이지
'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/commons/libraries/supabase';

export default function MyApisDetail() {
  const params = useParams();
  const [movie, setMovie] = useState(null);

  const movieId = params.id; // URL에서 id 가져오기

  const onClickFetch = async () => {
    const { data } = await supabase
      .from('movies')
      .select('*')
      .eq('id', movieId)
      .single();
    setMovie(data);
  };

  return (
    <>
      <button onClick={onClickFetch}>상세조회</button>
      {movie && (
        <div>
          <h1>영화제목: {movie.title}</h1>
          <p>감독: {movie.director}</p>
          <p>평점: {movie.rating}/5</p>
          <p>후기: {movie.content}</p>
        </div>
      )}
    </>
  );
}
