import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useBoardsList } from "../hook";
import BoardsList from "../list";
import Pagination from "../pagination";
import Search from "../search";
import LoadingComponent from "../loading";
import ErrorComponent from "../error";
import { DeleteBoardDocument, FETCH_BOARDS_DOCUMENT, FETCH_BOARDS_COUNT_DOCUMENT } from "../queries";

interface BoardsListContainerProps {
  initialPage?: number;
  initialSearch?: string;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export default function BoardsListContainer({
  initialPage = 1,
  initialSearch = "",
  initialStartDate = null,
  initialEndDate = null,
}: BoardsListContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    boards,
    totalPage,
    currentPage,
    searchKeyword,
    boardsLoading,
    countLoading,
    boardsError,
    countError,
    handleSearch,
    handleReset,
    onChangePage,
    refetch,
  } = useBoardsList({
    initialPage,
    initialSearch,
    initialStartDate,
    initialEndDate,
  });

  // 게시글 삭제 mutation
  const [deleteBoard] = useMutation(DeleteBoardDocument, {
    refetchQueries: [
      { 
        query: FETCH_BOARDS_DOCUMENT, 
        variables: { 
          page: currentPage, 
          search: searchKeyword, 
          startDate: initialStartDate, 
          endDate: initialEndDate 
        } 
      },
      { 
        query: FETCH_BOARDS_COUNT_DOCUMENT, 
        variables: { 
          search: searchKeyword, 
          startDate: initialStartDate, 
          endDate: initialEndDate 
        } 
      }
    ],
    onCompleted: () => {
      // 삭제 후 목록 새로고침
      refetch();
    }
  });

  const onClickRow = (boardId: string) => { 
    // 현재 페이지 정보를 URL에 포함하여 게시글 상세 페이지로 이동
    const params = new URLSearchParams(searchParams?.toString() || '');
    router.push(`/boards/${boardId}?from=${params.toString()}`); 
  };
  
  const onClickDelete = async (boardId: string) => { 
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteBoard({ variables: { boardId } });
        alert("게시글이 성공적으로 삭제되었습니다.");
      } catch (mutationError) {
        console.error("게시글 삭제 중 오류 발생:", mutationError);
        alert("게시글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (boardsLoading || countLoading) {
    return <LoadingComponent />;
  }
  
  if (boardsError || countError) {
    return (
      <ErrorComponent 
        error={boardsError || countError} 
        onRetry={refetch} 
      />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Search onSearch={handleSearch} onReset={handleReset} />
      <BoardsList 
        boards={boards} 
        onClickRow={onClickRow} 
        onClickDelete={onClickDelete}
        searchKeyword={searchKeyword}
      />
      <Pagination 
        currentPage={currentPage} 
        totalPage={totalPage} 
        onChangePage={onChangePage} 
      />
    </div>
  );
}
