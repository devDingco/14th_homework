import { useQuery } from "@apollo/client";
import { FETCH_BOARD_COMMENTS } from "./queries";
import { IFetchBoardCommentsResult } from "./types";

export const useCommentList = (boardId: string) => {
  const { data, loading, error } = useQuery<IFetchBoardCommentsResult>(
    FETCH_BOARD_COMMENTS,
    {
      variables: { boardId, page: 1 },
    }
  );

  return { data, loading, error };
};
