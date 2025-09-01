'use client';

import Image from 'next/image';
import './main-board.css';
import { mainBoardMock, BoardItem } from './mock';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateRangeInput from '../../commons/date-input/DateRangeInput';

export default function MainBoard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStartAt, setSearchStartAt] = useState('');
  const [searchEndAt, setSearchEndAt] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();

  const handleDelete = (id: number) => {
    alert(`${id}번 트립토크를 삭제하시겠습니까?`);
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

    console.log('검색 조건:', {
      startDate: searchStartAt,
      endDate: searchEndAt,
      keyword: searchKeyword,
    });

    alert(
      `검색 조건: ${searchStartAt ? `${searchStartAt} ~ ${searchEndAt}` : '전체 기간'}, 키워드: ${
        searchKeyword || '없음'
      }`
    );
  };

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
          {mainBoardMock.map((item: BoardItem) => (
            <div key={item.id} className="main_board_item">
              <div className="main_board_item_id l_14_20">{item.id}</div>
              <div className="main_board_item_title me_14_20" onClick={() => router.push(`/board/${item.id}`)}>
                {item.title}
              </div>
              <div className="main_board_item_writer l_14_20">{item.writer}</div>
              <div className="main_board_item_createdAt l_14_20">{item.createdAt}</div>
              <div className="main_board_item_delete" onClick={() => handleDelete(item.id)}>
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
          {[1, 2, 3, 4, 5].map((page) => (
            <div
              key={page}
              className={`main_board_pagination_item r_16_24 ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
          <div
            className="main_board_pagination_item r_16_24"
            onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
          >
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
}
