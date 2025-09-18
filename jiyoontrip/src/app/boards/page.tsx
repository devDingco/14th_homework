"use client";

import BoardsPageComponent from "../components/boards-list/list";
import PaginationComponent from "../components/boards-list/pagination";
import styles from "./styles.module.css";

import useBoardPage from "./hook";

export default function BoardsPage() {
  const boardPage = useBoardPage();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <BoardsPageComponent {...boardPage} />
          <PaginationComponent {...boardPage} />
        </div>
      </div>
    </>
  );
}
