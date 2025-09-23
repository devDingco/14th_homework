import { useParams, useRouter } from "next/navigation";
import {
  DeleteBoardDocument,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "../../../commons/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";
import { Modal } from "antd";
import { IBoardList } from "./types";

export const useBoardList = (props: IBoardList) => {
  const router = useRouter();
  const params = useParams<{ boardId: string }>();
  const [hoveredId, setHoveredId] = useState("");

  // const { data, refetch } = useQuery(FetchBoardsDocument);
  // // -> useQuery(FETCH_BOARDS)를 실행하면 객체 하나가 리턴! => 여러 속성들 중 data랑 refetch만 꺼내서 쓴거임!(구조 분해 할당)
  // const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  // // -> data라는 이름이 중복되니까 dataBoardsCount라는 별칭으로 받아온 거
  // // -> 즉, dataBoardsCount?.fetchBoardsCount → 전체 게시글 개수 값.
  const [deleteBoard] = useMutation(DeleteBoardDocument);

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

  const onClickMoveDetail = (event: MouseEvent<HTMLElement>, id: string) => {
    console.log("이동할 id:", id);
    router.push(`/boards/${id}`);
  };

  return {
    hoveredId,
    onClickMoveDetail,
    onClickDelete,
  };
};

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

//
// , {
// variables: {
//   page: params?.page ? parseInt(String(params.page), 10) : 1,
// useParams()가 반환하는 값은 문자열인데, $page는 Int임.
// -> 문자열을 정수로 변환해야 함!
// + 라우트가 /boards/[page] 형태가 아니라면 params.page 자체가 없을 수도 있기때문에 기본값(예: 1)을 두는 게 안전함
// params.page가 있다면 params.page를 숫자로 변환해서 쓰고, 없다면 자동으로 page=1
