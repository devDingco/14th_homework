"use client";

import BoardsNew from "@/components/boards-write";

export default function BoardComponentNewPage() {
  return (
    // <>
    //   <h1>등록페이지</h1>
    //   제목: <input type="text"></input>
    //   내용: <input type="text"></input>
    //   <button>등록하기</button>
    // </>
    <BoardsNew isEdit={false} />
  );
}
