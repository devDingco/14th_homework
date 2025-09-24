'use client';

import { useRouter } from 'next/navigation';

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;
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
