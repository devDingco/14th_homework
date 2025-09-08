'use client';

import BoardForm from '@/components/Form/BoardForm';

export default function BoardsNewPage() {
  return (
    <main className='flex h-full w-full flex-col gap-[16px] p-[16px]'>
      <BoardForm isEdit={false} />
    </main>
  );
}
