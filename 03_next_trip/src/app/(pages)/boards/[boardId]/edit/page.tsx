'use client';

import BoardsWrite from '@/components/boards-write';

export default function BoardsEditPage() {
  return (
    <main className='flex h-full w-full max-w-7xl flex-col gap-[16px] p-[16px]'>
      <BoardsWrite isEdit={true} />
    </main>
  );
}
