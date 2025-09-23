'use client';
import { supabase } from '@/commons/libraries/supabase';
import { useState } from 'react';

export default function MyApisList() {
  const [movies, setMovies] = useState([]);
  const onClickFetch = async () => {
    const { data } = await supabase.from('movies').select('*');
    setMovies(data);
  };

  return (
    <>
    
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>영화제목: {movie.title}</h3>
          <p>감독: {movie.director}</p>
        </div>
          <button onClick={onClickFetch}>조회하기</button>
      ))}
    </>
  );
}
