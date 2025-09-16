"use client";

// [1. 필요 부품 가져오기 (import)]
// React와 Next.js, Apollo Client 라이브러리에서 필요한 기능들을 불러옵니다.
import { useQuery, gql, useMutation } from "@apollo/client";
import styles from "./styles.module.css";
import Image from "next/image";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import deleteImage from "@assets/trashbin.png";

// [2. 이미지 관리]
// 컴포넌트 내에서 사용할 이미지를 미리 객체로 정리해두면, 나중에 관리하기 편리합니다.
const IMAGE_SRC = {
  deleteImage: {
    src: deleteImage,
    alt: "삭제버튼",
  },
};

// [3. GraphQL 요청서 작성]
// gql 함수를 사용해, 서버에 어떤 데이터를 요청할지 미리 템플릿(요청서)을 만들어 둡니다.

// [요청서 1] 게시글 목록 조회 (Query)
// 기능: 서버에서 게시글 목록을 불러옵니다. (fetchBoards)
const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

// [요청서 2] 게시글 삭제 (Mutation)
// 기능: 특정 ID의 게시글을 삭제합니다. (deleteBoard)
const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

// [4. 타입 정의 (TypeScript)]
// 서버에서 받아올 데이터(게시글 하나)의 형태를 미리 정의해두면,
// VS Code가 자동으로 오타를 찾아주거나 변수 이름을 추천해줘서 편리합니다.
interface IBoardList {
  _id: string;
  title: string;
  writer: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  images: string[];
  youtubeUrl: string | null;
  __typename: string;
}

// [5. 메인 컴포넌트 함수]
// 이 파일의 실제 내용물이자, 화면에 그려질 부분을 정의하는 함수입니다.
export default function BoardsPage() {

  // [6. 상태(State) 관리]
  // useState를 사용해 '상태'를 만듭니다. 상태가 바뀌면 화면이 자동으로 다시 그려집니다.
  // 기능: 마우스를 올린 게시글의 _id를 기억해두기 위해 사용합니다.
  // 이렇게 해야만 해당 행에만 삭제 버튼이 보이게 할 수 있어요.
  const [hoveredId, setHoveredId] = useState("");

  // [7. 기능 준비 (Hooks)]
  // 필요한 기능들을 훅(hook)을 사용해 미리 준비합니다.
  // useQuery → 데이터 가져오기
  const { data } = useQuery(FETCH_BOARDS); // 👈 서버에 '게시글 목록 조회' 요청서를 보내고, 받은 데이터를 data 변수에 저장합니다.
  
  // useMutation → 삭제 요청하기
  const [deleteBoard] = useMutation(DELETE_BOARD); // 👈 '게시글 삭제' 요청을 보낼 수 있는 함수를 준비합니다.
  const router = useRouter(); // 👈 페이지 이동 기능을 사용할 수 있도록 준비합니다.

  // [8. 이벤트 핸들러 함수]
  // 사용자가 특정 행동(클릭, 마우스 올리기 등)을 했을 때 실행될 함수들을 미리 정의합니다.

  // [이벤트 1] 삭제 아이콘 클릭 시
  const onClickDelete = async (event: MouseEvent<HTMLSpanElement>) => {
    // 삭제 클릭 → 이벤트 전파 막기(stopPropagation) → 삭제 후 목록 갱신
    event.stopPropagation();
    try {
      await deleteBoard({
        variables: { boardId: hoveredId },
        // [핵심!] refetchQueries는 삭제 성공 후, 목록을 다시 불러와서 화면을 갱신하는 기능입니다.
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
    } catch (err: any) {
      console.error("삭제실패:", err.message);
    }
  };

  // [이벤트 2] 게시글 행 클릭 시
  // 게시글 클릭 → 상세 페이지 이동
  const onClickDetail = (id: string) => {
    router.push(`/boards/${id}`);
  };

  // [9. 화면에 그릴 내용 (return JSX)]
  return (
    <div className={styles.boardBody}>
      <div className={styles.boardFrame}>
        <div className={styles.boardInnerBody}>
          <div className={styles.boardHeader}>
            <div className={styles.headerNumber}>번호</div>
            <div className={styles.headerTitle}>제목</div>
            <div className={styles.headerWriter}>작성자</div>
            <div className={styles.headerDate}>날짜</div>
          </div>
          <div className={styles.contentBody}>
            {/* 데이터 흐름: fetchBoards → 목록 표시 / deleteBoard → 삭제 후 refetchQueries */}
            {data?.fetchBoards.map((el: IBoardList, index: number) => (
              // ❗️ 레퍼런스는 div를 사용했지만, 각 행을 button으로 감싸서 클릭 영역을 명확히 하는 것도 좋은 방법입니다.
              <button
                onClick={() => onClickDetail(el._id)}
                key={el._id}
                className={styles.contentContainer}
                onMouseEnter={() => setHoveredId(el._id)} // 상호작용: hover → hoveredId 상태 업데이트 → 삭제 버튼 노출
                onMouseLeave={() => setHoveredId("")}
              >
                <div className={styles.contentNumber}>{index + 1}</div>
                <div className={styles.contentTitle}>{el.title}</div>
                <div className={styles.contentWriter}>{el.writer}</div>
                <div className={styles.contentDate}>
                  {el.createdAt.split("T")[0].replace(/-/g, ".")}
                </div>
                {/* 조건부 렌더링: 현재 hover된 행(hoveredId)의 id와 같을 때만 버튼을 보여줌. */}
                {/* styles.showButton / styles.hidden 으로 CSS 전환. */}
                <span
                  onClick={onClickDelete}
                  className={
                    hoveredId === el._id ? styles.showButton : styles.hidden
                  }
                >
                  <Image
                    src={IMAGE_SRC.deleteImage.src}
                    alt={IMAGE_SRC.deleteImage.alt}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}