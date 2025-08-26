import BoardDetail from "../(detail)/index";

export default async function BoardDetailPage({ params }) {
  const { id } = await params;
  return <BoardDetail id={id} />;
}