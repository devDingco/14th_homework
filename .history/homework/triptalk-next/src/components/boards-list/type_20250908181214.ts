interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

// 게시글 목록을 가져올 때의 데이터 타입 정의
interface FetchBoardsData {
  fetchBoards: Board[]; // Board 배열
}
