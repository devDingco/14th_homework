import BoardDetail from "../(detail)/index";

export default function BoardDetailPage({ params }) {
  return <BoardDetail id={params.id} />;
}