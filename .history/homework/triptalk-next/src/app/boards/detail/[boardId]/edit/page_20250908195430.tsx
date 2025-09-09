'use client'; // 이 컴포넌트를 클라이언트에서 실행하도록 설정
// 수정페이지 - 게시글을 수정하는 페이지 컴포넌트
import BoardsWrite from '@/components/boards-write'; // 게시글 작성/수정 공통 컴포넌트
import { gql, useQuery } from '@apollo/client'; // GraphQL 관련 라이브러리
import { useParams } from 'next/navigation'; // Next.js URL 파라미터 훅

// 게시글 수정 페이지 컴포넌트


  return (
    <div>
      {/* BoardsWrite 컴포넌트를 수정 모드로 사용 */}
      {/* isEdit={true}: 수정 모드 활성화 */}
      {/* data={data}: 기존 게시글 데이터 전달 */}
      <BoardsWrite isEdit={true} data={data} />
    </div>
  );
}
