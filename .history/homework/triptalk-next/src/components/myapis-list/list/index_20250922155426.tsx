'use client';
import { supabase } from '@/commons/libraries/supabase';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function MyApisList() {
  const router = useParams();
  const [movies, setMovies] = useState([]);
  const onClickFetch = async () => {
    const { data } = await supabase.from('movies').select('*');
    setMovies(data);
  };

  return (
    <>
      <button onClick={onClickFetch}>조회하기</button>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>영화제목: {movie.title}</h3>
          <p>감독: {movie.director}</p>
        </div>
      ))}
    </>
  );
}
