import BoardDetail from "../../(components)/boardDetail";
import { fetchBoardSSR } from "../../commons/apis/board.ssr";
import ErrorModal from "../../(components)/modal/ErrorModal";

export default async function BoardDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetchBoardSSR(id);
  if (!data) {
    return <ErrorModal message="게시글 데이터를 불러올 수 없어요. 잠시 후 다시 시도해 주세요." />;
  }
  return <BoardDetail
    id={id}
    initialData={{
      title: data.title ?? "",
      authorName: data.writer ?? "",
      createdAt: data.createdAt ?? "",
      coverImage: Array.isArray(data.images) && data.images.length ? (data.images[0]!.startsWith("http") ? data.images[0]! : `https://storage.googleapis.com/${data.images[0]!.startsWith("/") ? data.images[0]!.slice(1) : data.images[0]}`) : "",
      contents: data.contents ?? "",
      badCount: data.dislikeCount ?? 0,
      likeCount: data.likeCount ?? 0,
      youtubeUrl: data.youtubeUrl ?? "",
      address: data.boardAddress?.address ?? "",
      detailAddress: data.boardAddress?.addressDetail ?? "",
      zipcode: data.boardAddress?.zipcode ?? "",
    }}
  />;
}