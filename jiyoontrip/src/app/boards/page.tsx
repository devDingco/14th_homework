"use client";

import { Pagination } from "antd";
import BannerComponent from "../components/boards-list/banner";
import BoardsPageComponent from "../components/boards-list/list";

export default function BoardsPage() {
  return (
    <>
      <BannerComponent />
      <BoardsPageComponent />
      <Pagination />
    </>
  );
}
