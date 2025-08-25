"use client";

import "./pagination.css";
import "../../../global.css";
import { useState } from "react";
import Image from "next/image";
import Icon from "@utils/iconColor";

export default function Pagination({ totalPages = 5, initialPage = 1, onChange }) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goTo = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onChange && onChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination_container" aria-label="board pagination">
      <button
        type="button"
        className="nav_btn me_13_20"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
      >
        <Icon outline name="left_arrow" black className="left_arrow_icon"/>
      </button>
      <ul className="page_list">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`page_btn me_13_20 ${currentPage === page ? "is-active" : ""}`}
              onClick={() => goTo(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="nav_btn me_13_20"
        disabled={currentPage === totalPages}
        onClick={() => goTo(currentPage + 1)}
      >
        <Icon outline name="right_arrow" black className="right_arrow_icon"/>
      </button>
    </nav>
  );
}


