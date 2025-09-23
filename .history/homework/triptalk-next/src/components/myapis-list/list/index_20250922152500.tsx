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
      <button onClick={onClickFetch}>조회하기</button>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>감독: {movie.director}</p>
          <p>후기: {movie.}</p>
        </div>
      ))}
    </>
  );
}
