import BoardDetail from '@/components/boards-detail';
// import { useBoardDetailHook } from '@/hooks/useBoardDetailHook';
// import { Suspense } from 'react';

export default function BoardsDetailPage() {
  return (
    <main className='flex flex-col'>
      {/* {loading && <p className='flex-grow text-4xl'>로딩중...</p>}
      {error && <p className='text-7xl'>에러가 발생했습니다</p>}
      {data && <BoardDetail data={data} boardId={boardId} />} */}
      <BoardDetail />
    </main>
  );
}
