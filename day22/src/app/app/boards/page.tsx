
import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardDetailPage() {
  const { boardId } = useParams();

  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: { boardId },
  });

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div>
      <h1>게시글 상세</h1>
      <p>작성자: {data?.fetchBoard?.writer}</p>
      <p>제목: {data?.fetchBoard?.title}</p>
      <p>내용: {data?.fetchBoard?.contents}</p>
    </div>
  );
}
