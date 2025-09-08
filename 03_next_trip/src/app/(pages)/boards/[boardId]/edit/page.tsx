'use client';

import BoardForm from '@/components/Form/BoardForm';

export default function BoardsEditPage() {
  return (
    <main className='flex h-full w-full max-w-7xl flex-col gap-[16px] p-[16px]'>
      <BoardForm isEdit={true} />
    </main>
  );
}
