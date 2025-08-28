"use client";

import "./boardList.css";
import "../../../global.css";
import { mocksData } from "../../../common/utils/mocks-data";
import Pagination from "@components/pagination/pagination";
import type { PaginationProps } from "@/types/pagination";

export default function BoardTable({ totalPages = 5, initialPage = 1, onChange }: PaginationProps) {
  return (
    <div className="boardlist_container">
      <div className="board_table">
        <div className="board_thead me_16_20">
          <div className="th th-num">번호</div>
          <div className="th th-title">제목</div>
          <div className="th th-author">작성자</div>
          <div className="th th-date">날짜</div>
        </div>
        <div className="board_tbody">
          {mocksData.mockRows.map((row) => (
            <div className="tr" key={row.id}>
              <div className="td td-num me_14_20">{row.id}</div>
              <div className="td td-title">
                <a href="#" className="title_link r_16_24">{row.title}</a>
              </div>
              <div className="td td-author me_14_20">{row.author}</div>
              <div className="td td-date me_14_20">{row.date}</div>
            </div>
          ))}
        </div>
      </div>
      <Pagination totalPages={totalPages} initialPage={initialPage} onChange={onChange} />
    </div>
  );
}


