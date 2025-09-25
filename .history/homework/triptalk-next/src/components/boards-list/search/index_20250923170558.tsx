import { Router } from 'next/router';

export default function Search() {
  const onClickEdit = () => {
    Router.push('/boards/new');
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
