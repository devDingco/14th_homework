import { fetchBoardSSR } from "@/commons/apis/board.ssr";
import EditBoard from "../../edit/index";

export default async function EditBoardPage({ params }: { params: { id: string } }) {
  const boardData = await fetchBoardSSR(params.id);
  
  if (!boardData) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return <EditBoard id={params.id} initialData={boardData} />;
}
