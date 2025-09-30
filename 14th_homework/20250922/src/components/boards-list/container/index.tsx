import { useRouter, useSearchParams } from "next/navigation";
import { useBoardsList } from "../hook";
import BoardsList from "../list";
import Pagination from "../pagination";
import Search from "../search";
import LoadingComponent from "../loading";
import ErrorComponent from "../error";

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

  const onClickRow = (boardId: string) => { 
    // 현재 페이지 정보를 URL에 포함하여 게시글 상세 페이지로 이동
    const params = new URLSearchParams(searchParams?.toString() || '');
    router.push(`/boards/${boardId}?from=${params.toString()}`); 
  };
  
  const onClickDelete = (boardId: string) => { 
    console.log(`게시글 ID ${boardId} 삭제`); 
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
