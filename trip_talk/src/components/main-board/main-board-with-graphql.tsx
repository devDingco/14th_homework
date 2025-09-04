'use client';

import Image from 'next/image';
import './main-board.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateRangeInput from '../../commons/date-input/DateRangeInput';
import { useGetBoards, useDeleteBoard } from '../../hooks/useGraphQL';
import { Board } from '../../types/graphql';

export default function MainBoardWithGraphQL() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStartAt, setSearchStartAt] = useState('');
  const [searchEndAt, setSearchEndAt] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();

  // GraphQL 쿼리 사용
  const { data, loading, error, refetch } = useGetBoards({
    page: currentPage,
    searchStartAt,
    searchEndAt,
    searchKeyword,
  });

  // 삭제 뮤테이션 사용
  const [deleteBoard] = useDeleteBoard();

  const handleDelete = async (boardId: string) => {
    if (confirm('트립토크를 삭제하시겠습니까?')) {
      try {
        await deleteBoard({ variables: { boardId } });
        alert('삭제되었습니다.');
        refetch(); // 목록 새로고침
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setSearchStartAt(startDate);
    setSearchEndAt(endDate);
  };

  const handleSearch = () => {
    if (searchStartAt && !searchEndAt) {
      alert('종료일을 선택해주세요.');
      return;
    }
    refetch(); // 검색 조건으로 쿼리 재실행
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  const boards = data?.fetchBoards || [];

  return (
    <div className="container main_board">
      <div className="b_28_36">트립토크 게시판</div>
      <div className="main_board_search_wrapper">
        <div className="main_board_search_input_wrapper">
          <DateRangeInput
            startDate={searchStartAt}
            endDate={searchEndAt}
            onDateRangeChange={handleDateRangeChange}
            placeholder="YYYY.MM.DD - YYYY.MM.DD"
          />
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="main_board_search_input"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="main_board_search_button sb_18_24" onClick={handleSearch}>
            검색
          </button>
        </div>
        <div className="main_board_write_button" onClick={() => router.push('/board/new')}>
          <Image src={'/icons/write_icon.png'} alt="write" width={24} height={24} />
          <span className="sb_18_24">트립토크 등록</span>
        </div>
      </div>
      <div className="main_board_content_wrapper">
        <div className="main_board_header">
          <div className="main_board_header_id me_16_20">번호</div>
          <div className="main_board_header_title me_16_20">제목</div>
          <div className="main_board_header_writer me_16_20">작성자</div>
          <div className="main_board_header_createdAt me_16_20">날짜</div>
        </div>
        <div className="main_board_content_list">
          {boards.map((board: Board) => (
            <div key={board._id} className="main_board_item">
              <div className="main_board_item_id l_14_20">{board._id}</div>
              <div className="main_board_item_title me_14_20" onClick={() => router.push(`/board/${board._id}`)}>
                {board.title}
              </div>
              <div className="main_board_item_writer l_14_20">{board.writer}</div>
              <div className="main_board_item_createdAt l_14_20">{new Date(board.createdAt).toLocaleDateString()}</div>
              <div className="main_board_item_delete" onClick={() => handleDelete(board._id)}>
                <Image src={'/icons/delete_icon.svg'} alt="delete" width={24} height={24} />
              </div>
            </div>
          ))}
        </div>
        <div className="main_board_pagination">
          <div
            className="main_board_pagination_item r_16_24"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            &lt;
          </div>
          <div className="main_board_pagination_item r_16_24">{currentPage}</div>
          <div className="main_board_pagination_item r_16_24" onClick={() => setCurrentPage(currentPage + 1)}>
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
}
