import { useRouter } from "next/navigation";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "../../../commons/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";
import { Modal } from "antd";

export const useBoardList = () => {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState("");
  // const params = useParams<{ boardId: string }>();
  const { data, refetch } = useQuery(FetchBoardsDocument);

  // const [modalContent, setModalContent] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  // ??다시 보기! 잘 모르겠다!

  // , {
  // variables: {
  //   page: params?.page ? parseInt(String(params.page), 10) : 1,
  // useParams()가 반환하는 값은 문자열인데, $page는 Int임.
  // -> 문자열을 정수로 변환해야 함!
  // + 라우트가 /boards/[page] 형태가 아니라면 params.page 자체가 없을 수도 있기때문에 기본값(예: 1)을 두는 게 안전함
  // params.page가 있다면 params.page를 숫자로 변환해서 쓰고, 없다면 자동으로 page=1

  const onClickDelete = async (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    await deleteBoard({
      variables: { boardId: hoveredId },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
    Modal.success({
      title: "삭제 완료",
      content: "게시글이 성공적으로 삭제되었습니다.",
    });
  };

  const onClickMoveDetail = async (
    event: MouseEvent<HTMLElement>,
    id: String
  ) => {
    event.stopPropagation();

    router.push(`/boards/${id}`);
  };

  return {
    data,
    refetch,
    hoveredId,
    onClickMoveDetail,
    onClickDelete,
  };
};
