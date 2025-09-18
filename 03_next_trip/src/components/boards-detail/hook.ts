import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
// import { FETCH_BOARD } from '@/apis/graphql/board';
import {
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
} from '@/types/gql/graphql';

export const useBoardDetailHook = () => {
  const { boardId } = useParams();
  // const { data, loading, error } = useQuery(FetchBoardDocument, {
  const { data, loading, error } = useQuery<
    FetchBoardQuery,
    FetchBoardQueryVariables
  >(FetchBoardDocument, {
    variables: {
      boardId: String(boardId),
    },
  });

  return {
    data,
    loading,
    error,
    boardId,
  };
};
