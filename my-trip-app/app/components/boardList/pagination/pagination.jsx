"use client";

import "./pagination.css";
import "../../../global.css";
import { useState } from "react";
import Image from "next/image";

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
        <Image src="/icons/outline/left_arrow.png" alt="prev" width={24} height={24} />
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
        <Image src="/icons/outline/right_arrow.png" alt="next" width={24} height={24} />
      </button>
    </nav>
  );
}


