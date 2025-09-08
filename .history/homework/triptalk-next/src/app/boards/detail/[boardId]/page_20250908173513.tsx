'use client'; // 이 컴포넌트를 클라이언트에서 실행하도록 설정
// 상세페이지 - 게시글의 상세 내용을 보여주는 페이지 컴포넌트
import BoardsDetail from '@/components/boards-detail'; // 분리한 컴포넌트 import
import { useParams } from 'next/navigation'; // URL 파라미터를 가져오는 Next.js 훅
import { gql, useQuery } from '@apollo/client'; // GraphQL 관련 라이브러리

// 게시글 상세 정보를 가져오기 위한 GraphQL 쿼리
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id          # 게시글 고유 ID
      writer       # 작성자명
      title        # 제목
      contents     # 내용
      youtubeUrl   # 유튜브 링크
      likeCount    # 좋아요 수
      dislikeCount # 싫어요 수
      images       # 첨부 이미지들

      createdAt    # 생성일
      updatedAt    # 수정일
      deletedAt    # 삭제일
    }
  }
`;

// 게시글 상세보기 페이지 컴포넌트
export default function BoardsDetail() {
  const router = useRouter(); // 페이지 이동을 위한 라우터 훅
  const params = useParams(); // URL에서 boardId 파라미터 추출
  
  // GraphQL 쿼리를 사용해서 게시글 상세 데이터 가져오기
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId, // URL 파라미터로 받은 게시글 ID 전달
    },
  });
  
  // 수정 페이지로 이동하는 함수
  const onClickEdit = () => {
    router.push(`/boards/detail/${params.boardId}/edit`);
  };
  
  // 목록 페이지로 이동하는 함수
  const onClickList = () => {
    router.push('/boards');
  };
  // JSX 렌더링 부분 - 실제로 화면에 보여지는 UI
  return (
    <div className="container">
      {/* 게시글 제목 */}
      <h1 className={styles.h1}>{data?.fetchBoard.title}</h1>
      
      {/* 작성자와 작성일 정보 */}
      <div className={styles.작성자날짜}>
        {/* 작성자 정보 (프로필 아이콘 + 작성자명) */}
        <div className={styles.작성자}>
          <Image src="/icons/profile.png" alt="프로필" width={24} height={24} />
          <div>{data?.fetchBoard.writer}</div>
        </div>
        
        {/* 작성일 (한국어 날짜 형식으로 변환) */}
        <div className={styles.날짜}>
          {data?.fetchBoard.createdAt &&
            new Date(data.fetchBoard.createdAt).toLocaleDateString('ko-KR')}
        </div>
      </div>
      <hr className={styles.hr} /> {/* 구분선 */}
      
      {/* 링크와 위치 아이콘 섹션 */}
      <div>
        <div className={styles.링크위치}>
          <Image src="/icons/link1.png" alt="링크" width={24} height={24} />
          <Image src="/icons/location.png" alt="위치" width={24} height={24} />
        </div>
      </div>
      
      {/* 대표 이미지 */}
      <Image
        src="/icons/sea.png"
        alt="게시글 대표 이미지"
        className={styles.바다사진}
        width={400}
        height={531}
      />
      
      {/* 게시글 본문 내용 */}
      <div>{data?.fetchBoard.contents}</div>
      {/* 동영상 섹션 (현재는 정적 이미지) */}
      <div className={styles.동영상배경}>
        <Image
          src="/icons/video.png"
          alt="동영상 플레이어"
          width={822}
          height={464}
        />
      </div>
      
      {/* 좋아요/싫어요 버튼 섹션 */}
      <div className={styles.싫어요좋아요}>
        {/* 싫어요 버튼과 카운트 */}
        <div className={styles.싫어요}>
          <div>
            <Image src="/icons/bad.png" alt="싫어요" width={24} height={24} />
          </div>
          <div>24</div> {/* 하드코딩된 값 - 실제로는 data?.fetchBoard.dislikeCount 사용 권장 */}
        </div>

        {/* 좋아요 버튼과 카운트 */}
        <div className={styles.좋아요}>
          <div>
            <Image src="/icons/good.png" alt="좋아요" width={24} height={24} />
          </div>
          <div>12</div> {/* 하드코딩된 값 - 실제로는 data?.fetchBoard.likeCount 사용 권장 */}
        </div>
      </div>
      {/* 하단 버튼 섹션 */}
      <div className={styles.목록수정}>
        {/* 목록으로 돌아가기 버튼 */}
        <button onClick={onClickList} className={styles.목록버튼}>
          <Image src="/icons/list.png" alt="목록" width={16} height={16} />
          목록으로
        </button>
        
        {/* 게시글 수정하기 버튼 */}
        <button onClick={onClickEdit} className={styles.수정버튼}>
          <Image src="/icons/pen.png" alt="수정" width={16} height={16} />
          수정하기
        </button>
      </div>
    </div>
  );
}
