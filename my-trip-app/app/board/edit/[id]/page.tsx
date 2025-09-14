import { fetchBoardSSR } from "@/commons/apis/board.ssr";
import BoardEdit from "../../../(components)/boardEdit";

export default async function EditBoardPage({ params }: { params: { id: string } }) {
  const boardData = await fetchBoardSSR(params.id);
  
  if (!boardData) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return <BoardEdit id={params.id} initialData={boardData} />;
}
