"use client";

import "./pagination.css";
import "../../global.css";
import { useState } from "react";
import Image from "next/image";
import Icon from "@utils/iconColor";
import type { PaginationProps } from "@/types/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages = 5, initialPage = 1, onChange }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFromUrl = Number(searchParams?.get("page") ?? initialPage);
  const [currentPage, setCurrentPage] = useState(initialFromUrl || 1);

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
    onChange?.(page);
  };

  const WINDOW_SIZE = 5;
  const windowStart = Math.floor((currentPage - 1) / WINDOW_SIZE) * WINDOW_SIZE + 1;
  const windowEnd = Math.min(windowStart + WINDOW_SIZE - 1, totalPages);
  const pages = Array.from({ length: Math.max(0, windowEnd - windowStart + 1) }, (_, i) => windowStart + i);

  return (
    <nav className="pagination_container" aria-label="board pagination">
      {totalPages > 1 && (
        <button
          type="button"
          className="nav_btn me_13_20"
          disabled={currentPage === 1}
          onClick={() => goTo(currentPage - 1)}
        >
          <Icon outline name="left_arrow" black className="left_arrow_icon"/>
        </button>
      )}
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
      {totalPages > 1 && (
        <button
          type="button"
          className="nav_btn me_13_20"
          disabled={currentPage === totalPages}
          onClick={() => goTo(currentPage + 1)}
        >
          <Icon outline name="right_arrow" black className="right_arrow_icon"/>
        </button>
      )}
    </nav>
  );
}


