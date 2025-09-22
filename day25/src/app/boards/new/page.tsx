"use client";

// 1. 우리가 만든 재사용 컴포넌트를 불러옵니다.
import BoardWritePage from "components/boards-write";

// 2. 이 페이지의 목적은 '등록'이므로, 함수의 이름도 명확하게 바꿔주면 더 좋습니다.
export default function BoardsNewPage() { 
      return(
        // '등록 모드'임을 알려주기 위해 isEdit={false}를 props로 전달합니다.
        <BoardWritePage isEdit={false} />
    );
}
