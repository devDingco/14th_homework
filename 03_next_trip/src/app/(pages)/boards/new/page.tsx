'use client';

import BoardsWrite from '@/components/boards-write';

export default function BoardsNewPage() {
  return (
    <main className='flex h-full w-full flex-col gap-[16px] p-[16px]'>
      <BoardsWrite isEdit={false} />
    </main>
  );
}
