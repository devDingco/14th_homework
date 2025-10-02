
"use client";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_BOARD } from "components/boards-write/queries";
import { useRouter } from "next/navigation";
import { FetchBoardDocument } from "commons/graphql/graphql";

export const useBoardDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.boardId.toString();
  // 보여줄 board 정보 받아오기
  const { data , loading} = useQuery(FetchBoardDocument, {
    variables: { boardId: id },
  });
  //수정하기 페이지로 이동
  const goToEditPage = () => {
    router.push(`${id}/edit`);
  };

  return {
      board: data?.fetchBoard, // data 안에 들어있는 실제 게시글 정보는 data.fetchBoard 입니다.
      loading, // 받아온 loading 상태를 그대로 넘겨줍니다.
      goToEditPage,
    };
  };

