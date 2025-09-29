'use client';

import { useQuery } from '@apollo/client';
import { FETCH_BOARDS } from './queries';

export default function BoardsList() {
  const { data, loading, error } = useQuery(FETCH_BOARDS, {
    variables: { boardId: '1' },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.fetchBoard) return <div>No data</div>;

  const board = data.fetchBoard;
  return (
    <div>
      <h2>{board.title}</h2>
      <p>작성자: {board.writer}</p>
      <p>{board.contents}</p>
      {board.image && <img src={board.image} alt={board.title} />}
    </div>
  );
}
