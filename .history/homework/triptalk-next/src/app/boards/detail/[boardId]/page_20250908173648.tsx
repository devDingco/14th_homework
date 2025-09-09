'use client'; // 이 컴포넌트를 클라이언트에서 실행하도록 설정
// 상세페이지 - 게시글의 상세 내용을 보여주는 페이지 컴포넌트
import BoardsDetail from '@/components/boards-detail'; // 분리한 컴포넌트 import
import { useParams } from 'next/navigation'; // URL 파라미터를 가져오는 Next.js 훅
import { gql, useQuery } from '@apollo/client'; // GraphQL 관련 라이브러리

// 게시글 상세보기 페이지 컴포넌트
export default function BoardsDetailPage() {
  <BoardsDetail />;
}
