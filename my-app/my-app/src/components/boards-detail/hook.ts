import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FetchBoardDocument } from "../../commons/gql/graphql";

export const useBoardsDetail = () => {
  const router = useRouter();
  const params = useParams();
  //localhost:3000/boards/68bbd349e43aaf002915263b
  // const boardId = params?.boardId;x

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: params.boardId,
    },
  });

  const onClickEdit = () => {
    router.push(`/boards/${data?.fetchBoard._id}/edit`);
  };

  return {
    data,
    onClickEdit,
  };
};
