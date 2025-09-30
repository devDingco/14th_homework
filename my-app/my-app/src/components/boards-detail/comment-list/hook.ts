"use client";

import { FetchBoardCommentsDocument } from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export const useCommentList = () => {
  const [isHasMore, setIsHasMore] = useState<boolean>(true); // 무한스크롤 여부를 state로 관리
  const params = useParams();
  const { data, fetchMore,  } = useQuery(FetchBoardCommentsDocument, {
    variables: { page: 1, boardId: String(params.boardId) },
    
  });
  // page: 1은 ‘처음 실핼할때 기본으로 1번 페이지 데이터를 달라는 거'!
  // 초기 로딩에서는 page: 1로 댓글 첫 10개를 가져옴.
  //  -> 스크롤을 내리면 fetchMore 호출할 때 'page: 2', 'page: 3' ..이런식으로 호출함
  console.log(data);

  return {
    data,
    fetchMore,
    isHasMore,
    setIsHasMore,
  };
};

// <isHasMore가 필요한 이유> => useState(true)로 시작 → 데이터 받아오다 끝났다고 판단되면 false로 꺼버리는 흐름.
//    react-infinite-scroll-component 같은 라이브러리는 **props로 hasMore: boolean**을 요구.
//    즉, “더 불러올 게 있는지”를 컴포넌트가 알아야 하는데, GQL API에서 “마지막 페이지다”라는 신호 x.
//    그래서 보통 클라이언트에서 조건을 보고 직접 false로 꺼줘야 한다.
//    - (ex: 새로 받아온 배열이 빈 배열일 때, or 전체 개수와 현재 길이를 비교했을 때.)
//

// <왜 setIsHasMore까지 리턴?>
//    단순히 상태만 리턴하면 CommentList 같은 UI에서 “언제 멈출지”를 직접 바꿀 수 x.
//    그래서 hook 밖에서 setIsHasMore(false)를 호출할 수 있도록 상태변환값(setIsHasMore)을 같이 노출해 둔 거.

//    흐름 ex)
//     1. 스크롤이 끝나면 → fetchMore 실행.
//     2. fetchMore의 updateQuery에서 새 데이터 길이가 0이면 → setIsHasMore(false) 호출.
//     3. 그러면 <InfiniteScroll hasMore={isHasMore}>가 자동으로 멈춤.

// fetchMore란??
//     1. useQuery 훅을 쓰면 data, loading, error 같은 값과 함께 fetchMore라는 함수도 같이 리턴됨
//     2. 말 그대로 “지금 쿼리한 거 말고, 더(fetch more) 가져와!” 라는 기능.
//     3. 보통 페이지네이션(다음 페이지 불러오기)이나 무한 스크롤에서 쓰임.
