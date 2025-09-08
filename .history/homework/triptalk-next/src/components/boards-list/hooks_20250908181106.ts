export default function BoardsList() {
  // 게시글 목록 데이터를 가져오는 훅 (자동으로 실행됨)
  const { data } = useQuery<FetchBoardsData>(FETCH_BOARDS);
  console.log(data);

  // 게시글 삭제 뮤테이션 훅 (필요할 때 실행)
  const [deleteBoard] = useMutation(DELETE_BOARD);

  // 페이지 이동을 위한 라우터
  const router = useRouter();

  // 개발자 도구에서 데이터 확인
  console.log(data?.fetchBoards);

  // 게시글 제목을 클릭했을 때 상세 페이지로 이동하는 함수
  const onClickTitle = (boardId: string) => {
    router.push(`/boards/detail/${boardId}`);
  };

  // 삭제 버튼을 클릭했을 때 실행되는 함수
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    // event.currentTarget을 사용해서 실제 button 요소 가져오기
    // (event.target은 Image 컴포넌트를 가리킬 수 있음)
    const button = event.currentTarget as HTMLButtonElement;
    const boardId = button.id; // 버튼의 id 속성에서 게시글 ID 가져옴

    console.log('삭제할 게시글 ID:', boardId); // 디버그용 로그
    alert('게시글이 삭제 되었습니다.');

    // boardId가 비어있으면 삭제 중단
    if (!boardId) {
      alert('게시글 ID를 찾을 수 없습니다.');
      return;
    }

    try {
      // 삭제 뮤테이션 실행
      await deleteBoard({
        variables: {
          boardId: boardId,
        },
        refetchQueries: [{ query: FETCH_BOARDS }], // 삭제 후 목록 다시 불러오기
      });
      alert('게시글이 삭제되었습니다.'); // 성공 알림
    } catch (error) {
      console.error('삭제 실패:', error); // 에러 로그
      alert('삭제에 실패했습니다.'); // 실패 알림
    }
  };
