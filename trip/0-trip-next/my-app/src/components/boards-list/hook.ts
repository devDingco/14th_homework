import { useMutation, useQuery } from "@apollo/client";
// import { DELETE_BOARD, FETCH_BOARDS } from "./queries";
import { useRouter } from "next/navigation";
import { DeleteBoardDocument, DeleteBoardMutation, DeleteBoardMutationVariables, FetchBoardsDocument, FetchBoardsQuery, FetchBoardsQueryVariables } from "@/commons/gql/graphql";

export const useBoardList = () => {
    const { data } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(FetchBoardsDocument);
    const router = useRouter();

    const [deleteBoard] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument);

    const onClickDelete = async (boardId: string) => {
      try {
        await deleteBoard({
          variables: { boardId },
          refetchQueries: [{ query: FetchBoardsDocument }],
        });
      } catch (error) {
        console.error(error);
        alert("삭제 중 문제가 발생했습니다.");
      }
    };

    const onClickRouter = (boardId: string) => {
      router.push(`/boards/${boardId}`); // 클릭한 게시글의 id로 이동
    };

    return {data, onClickDelete, onClickRouter}
}