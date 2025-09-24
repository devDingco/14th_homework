// src/app/boards/page.tsx

"use client";

import Layout from "@/commons/layout";
import BoardsListContainer from "@/components/boards-list/container";

export default function BoardsPage() {
  return (
    <Layout>
      <BoardsListContainer />
    </Layout>
  );
}