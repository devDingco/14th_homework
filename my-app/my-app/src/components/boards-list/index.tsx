import styles from "../boards-list/style.module.css";
import Image from "next/image";
// import { IBoardList } from "./types";
import deleteIcon from "./assets/delete.svg";
import { useBoardList } from "../boards-list/hook";

export default function BoardList() {
  const { data, onClickMoveDetail, onClickDelete } = useBoardList();

  return (
    <div className={styles.BoardFrame}>
      <div className={styles.BoardFrame_Header}>
        <div className={styles.BoardFrame_Header_number}>번호</div>
        <div className={styles.BoardFrame_Header_title}>제목</div>
        <div className={styles.BoardFrame_Header_writer}>작성자</div>
        <div className={styles.BoardFrame_Header_date}>날짜</div>
      </div>

      <div className={styles.FetchBoardFrame}>
        <div>
          <div className={styles.FetchBoard}>
            {data?.fetchBoard?.map(
              (
                el: {
                  _id: string;
                  title: string;
                  writer: string;
                  createdAt: string;
                  contents: string;
                  youtubeUrl: string;
                  likeCount: number;
                  dislikeCount: number;
                  images: string[];
                  updatedAt: string;
                  boardAddress: {
                    _id: string;
                    zipcode: string;
                    address: string;
                    addressDetail: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string;
                  };
                },
                index: number
              ) => (
                <div
                  key={el._id}
                  id={el._id}
                  className={styles.FetchBoard_list}
                  onClick={(event) => onClickMoveDetail(event, el?._id)}
                >
                  <div className={styles.FetchBoard_number}>{index + 1}</div>
                  <div className={styles.FetchBoard_title}>{el.title}</div>
                  <div className={styles.FetchBoard_writer}>{el.writer}</div>
                  <div className={styles.FetchBoard_date}>
                    {el.createdAt.split("T")[0]}
                  </div>
                  <Image
                    id={el._id}
                    src={deleteIcon}
                    alt="deleteIcon"
                    onClick={onClickDelete}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

// export default BoardsNew;

//입력값에 문제가 있을 때 보여주는 에러메세지 저장하는 상태 설정
// const [writererror, setWriterError] = useState("");
// const [passworderror, setPasswordError] = useState("");
// const [titleerror, setTitleError] = useState("");
// const [contenterror, setContentError] = useState("");

// - 등록하기 버튼 눌렀을때 실행되는 함수
// const onClickSignup = () => {
//   let error = false; // -> 처음에는 경고 메세지 안떠있는 상태이기 때문에 에러상태가 아님을 지정

//   if (writer.trim() === "") {
//     setWriterError("필수입력 사항입니다");
//     error = true;
//   } else {
//     setWriterError("");
//   }

//   if (password.trim() === "") {
//     setPassword("필수입력 사항입니다");
//     error = true;
//   } else {
//     setPasswordError("");
//   }

//   if (title.trim() === "") {
//     setTitle("필수입력 사항입니다");
//     error = true;
//   } else {
//     setTitleError("");
//   }

//   if (content.trim() === "") {
//     setContentError("필수입력 사항입니다");
//     error = true;
//   } else {
//     setContentError("");
//   }

//   // 에러가 아니라면 "게시글 등록가능" 창 뜨기
//   if (error === false) {
//     alert("게시글 등록이 가능한 상태입니다!");
//   }
// };

// // // 내부 컴포넌트 제거하고 단일 JSX로 구성
// // import styles from "./게시물등록.module.css";
