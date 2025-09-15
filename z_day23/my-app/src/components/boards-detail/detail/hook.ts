import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { IUseBoardDetail } from "./types";
import {
  FetchBoardDetailDocument,
  FetchBoardDetailQuery,
  FetchBoardDetailQueryVariables,
} from "@/commons/graphql/graphql";

export const useBoardDetail = (): IUseBoardDetail => {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;

  const { loading, data, error } = useQuery<
    FetchBoardDetailQuery,
    FetchBoardDetailQueryVariables
  >(FetchBoardDetailDocument, {
    variables: {
      boardId: String(boardId),
    },
  });

  const onClickUpdateMove = () => {
    router.push(`/boards/${boardId}/edit`);
  };

  const onClickMoveToList = () => {
    router.push(`/boards/`);
  };

  return {
    data,
    loading,
    error,
    onClickUpdateMove,
    onClickMoveToList,
  };
};
