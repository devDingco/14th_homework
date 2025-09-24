'use client';

import { useRouter } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const onClickEdit = () => {
    router.push('/boards/new');
  };

  return (
    <div>
      <div>
        <input type="date" />
        <input type="text" />
        <button>검색</button>
      </div>
      <button onClick={onClickEdit}>트립토크 등록</button>
    </div>
  );
}
