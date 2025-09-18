"use client";

import "./listComponent.css";
import "../../global.css";
import Pagination from "@components/pagination/pagination";
import type { BoardListProps, BoardItem } from "@/types/pagination";
import type { LooseStyle } from "@/types/style";
import Link from "next/link";

const styles = {
  boardList_container: {
    width: "100%",
    maxWidth: "128rem",
    margin: "0 auto",
    gap: "2.4rem",
    display: "flex",
    flexDirection: "column",
    marginBottom: "4rem",
  },
};

export default function ListComponent({ data = [],totalPages = 5, initialPage = 1, onChange }: BoardListProps) {
  return (
    <div style={styles.boardList_container as LooseStyle}>
      
      <div className="boardlist_container">
        <div className="board_table">
          <div className="board_thead me_16_20">
            <div className="th th-num">번호</div>
            <div className="th th-title">제목</div>
            <div className="th th-author">작성자</div>
            <div className="th th-date">날짜</div>
          </div>
          <div className="board_tbody">
            {data.map((row: BoardItem) => (
              <div className="tr" key={row.id}>
                <div className="td td-num me_14_20">{row.no ?? row.id}</div>
                <div className="td td-title">
                  <Link href={`/board/${row.id}`} className="title_link r_16_24">{row.title}</Link>
                </div>
                <div className="td td-author me_14_20">{row.author}</div>
                <div className="td td-date me_14_20">{row.date}</div>
              </div>
            ))}
          </div>
        </div>
        <Pagination totalPages={totalPages} initialPage={initialPage} onChange={onChange} />
      </div>
    </div>
  );
}