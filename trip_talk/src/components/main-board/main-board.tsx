'use client';

import Image from 'next/image';
import './main-board.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateRangeInput from '../../commons/date-input/DateRangeInput';
import Pagination from '../../commons/pagination/Pagination';
import { useGetBoards, useDeleteBoard } from '../../hooks/useGraphQL';
import { useLazyQuery } from '@apollo/client';
import { GET_BOARDS } from '../../graphql/queries';
import { Board } from '../../types/graphql';

export default function MainBoardWithGraphQL() {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');

  // 실제 검색에 사용될 조건들 (검색 버튼 클릭 시에만 업데이트)
  const [searchConditions, setSearchConditions] = useState({
    page: 1,
    search: undefined as string | undefined,
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
  });

  const router = useRouter();

  // 초기 데이터 로딩용
  const { data: initialData, loading: initialLoading, error: initialError } = useGetBoards({ page: 1 });

  // 검색용 lazy query
  const [executeSearch, { data: searchData, loading: searchLoading, error: searchError }] = useLazyQuery(GET_BOARDS);

  // 현재 사용할 데이터 결정
  const data = searchData || initialData;
  const loading = searchLoading || initialLoading;
  const error = searchError || initialError;

  // 삭제 뮤테이션 사용
  const [deleteBoard] = useDeleteBoard();

  const handleDelete = async (boardId: string) => {
    if (confirm('트립토크를 삭제하시겠습니까?')) {
      try {
        await deleteBoard({ variables: { boardId } });
        alert('삭제되었습니다.');
        // 현재 검색 조건으로 목록 새로고침
        executeSearch({
          variables: searchConditions,
          fetchPolicy: 'network-only',
        });
      } catch (error) {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  // YYYY-MM-DD 형식을 YYYY.MM.DD 형식으로 변환하는 유틸리티 함수
  const convertToDateString = (dateStr: string): string => {
    if (!dateStr || !dateStr.trim()) return '';

    try {
      // HTML date input에서 오는 YYYY-MM-DD 형식을 YYYY.MM.DD로 변환
      if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          return `${parts[0]}.${parts[1]}.${parts[2]}`;
        }
      }

      // 이미 YYYY.MM.DD 형식이면 그대로 반환
      if (dateStr.includes('.')) {
        return dateStr;
      }

      return '';
    } catch (error) {
      return '';
    }
  };

  const handleDateRangeChange = (startDateValue: string, endDateValue: string) => {
    const convertedStartDate = convertToDateString(startDateValue);
    const convertedEndDate = convertToDateString(endDateValue);

    setStartDate(convertedStartDate);
    setEndDate(convertedEndDate);
  };

  // YYYY.MM.DD 형식을 Date 객체로 변환하는 유틸리티 함수
  const parseDate = (dateStr: string): Date => {
    const parts = dateStr.split('.');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  };

  const handleSearch = () => {
    // 날짜 유효성 검사
    if (startDate && endDate) {
      const start = parseDate(startDate);
      const end = parseDate(endDate);

      if (start > end) {
        alert('시작일은 종료일보다 이후일 수 없습니다.');
        return;
      }
    }

    // 검색 조건 업데이트
    const newConditions = {
      page: 1,
      search: search || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };

    setSearchConditions(newConditions);
    setCurrentPage(1);

    // 검색 실행
    executeSearch({
      variables: newConditions,
      fetchPolicy: 'network-only',
    });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  const boards = data?.fetchBoards || [];

  // 총 페이지 수 계산 (API에서 총 개수를 제공하지 않으므로 추정)
  // 현재 페이지에 10개 미만의 게시글이 있으면 마지막 페이지로 간주
  // 10개 이상이면 다음 페이지가 있을 가능성이 높음
  const totalPages = boards.length < 10 ? currentPage : Math.max(currentPage + 5, 10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newConditions = { ...searchConditions, page };
    setSearchConditions(newConditions);

    // 페이지 변경 시에도 executeSearch 사용
    executeSearch({
      variables: newConditions,
      fetchPolicy: 'network-only',
    });
  };

  return (
    <div className="container main_board">
      <div className="b_28_36">트립토크 게시판</div>
      <div className="main_board_search_wrapper">
        <div className="main_board_search_input_wrapper">
          <DateRangeInput
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={handleDateRangeChange}
            placeholder="YYYY.MM.DD - YYYY.MM.DD"
          />
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="main_board_search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
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
          {boards.map((board: Board, index: number) => (
            <div key={board._id} className="main_board_item">
              <div className="main_board_item_id l_14_20">{(currentPage - 1) * 10 + index + 1}</div>
              <div className="main_board_item_title me_14_20" onClick={() => router.push(`/board/${board._id}`)}>
                {board.title}
              </div>
              <div className="main_board_item_writer l_14_20">{board.writer}</div>
              <div className="main_board_item_createdAt l_14_20">
                {new Date(board.createdAt).toLocaleDateString('ko-KR')}
              </div>
              <div className="main_board_item_delete" onClick={() => handleDelete(board._id)}>
                <Image src={'/icons/delete_icon.svg'} alt="delete" width={24} height={24} />
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="main_board_pagination"
        />
      </div>
    </div>
  );
}
