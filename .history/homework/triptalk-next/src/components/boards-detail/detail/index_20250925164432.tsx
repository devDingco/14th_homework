/**
 * 게시글 상세보기 페이지 컴포넌트
 *
 * 주요 기능:
 * 1. 게시글 상세 정보 표시 (제목, 작성자, 내용, 이미지 등)
 * 2. 업로드된 이미지들을 순서대로 표시
 * 3. 유튜브 동영상 embed 재생
 * 4. 좋아요/싫어요 기능
 * 5. 목록으로 돌아가기, 수정하기 버튼
 *
 * 사용 방법: URL의 boardId 파라미터로 특정 게시글 조회
 * 예: /boards/detail/[boardId]
 */
'use client'; // 이 컴포넌트를 클라이언트에서 실행하도록 설정
import styles from './BoardsDetail.module.css'; // CSS 모듈 스타일 import
import Image from 'next/image'; // Next.js 최적화된 이미지 컴포넌트
import useBoardsDetail from './hooks';
import TooltipLocation from '../tooltip';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 유튜브 URL을 embed URL로 변환하는 함수
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return '';

  // https://www.youtube.com/watch?v=VIDEO_ID 형태
  if (url.includes('v=')) {
    const videoId = url.split('v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // https://youtu.be/VIDEO_ID 형태
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // 이미 embed URL인 경우
  if (url.includes('embed/')) {
    return url;
  }

  return '';
};

// 게시글 상세보기 페이지 컴포넌트
export default function BoardsDetail() {
  const router = useRouter(); // 로그인 안한사람 막는 코드
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 후 이용 가능합니다!!!');
      router.push('/boards/login');
    }
  }, []);

  const {
    data, // hooks에서 데이터 가져오기
    onClickList, // 목록으로 돌아가기 버튼 클릭 핸들러
    onClickEdit, // 게시글 수정하기 버튼 클릭 핸들러
  } = useBoardsDetail();
  // JSX 렌더링 부분 - 실제로 화면에 보여지는 UI
  return (
    <div className="container">
      {/* 게시글 제목 */}
      <h1 className={styles.h1}>{data?.fetchBoard.title}</h1>
      {/* 작성자와 작성일 정보 */}
      <div className={styles.작성자날짜}>
        {/* 작성자 정보 (프로필 아이콘 + 작성자명) */}
        <div className={styles.작성자}>
          <Image src="/icons/profile.svg" alt="프로필" width={24} height={24} />
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
          <TooltipLocation address={data?.fetchBoard.boardAddress?.address}>
            <Image
              src="/icons/location.png"
              alt="위치"
              width={24}
              height={24}
            />
          </TooltipLocation>
        </div>
      </div>
      {/* 게시글 이미지들 표시 */}
      <div>
        {/*
          배열 렌더링의 핵심 패턴:
          1. map() 함수로 배열의 각 요소를 순회
          2. key={index}로 React의 리스트 렌더링 최적화
          3. Google Cloud Storage URL 조합
          4. 동적 alt 텍스트 생성
        */}
        {data?.fetchBoard.images?.map((imageUrl: string, index: number) => (
          <Image
            key={index} // React 리스트 렌더링 최적화를 위한 고유 키
            src={`https://storage.googleapis.com/${imageUrl}`} // GCS 전체 URL 조합
            alt={`게시글 이미지 ${index + 1}`} // 접근성을 위한 동적 alt 텍스트
            width={400}
            height={300}
            className={styles.게시글이미지}
          />
        ))}
      </div>
      {/* 게시글 본문 내용 */}
      <div>{data?.fetchBoard.contents}</div>
      {/* 동영상 섹션 */}
      {data?.fetchBoard.youtubeUrl ? (
        <div className={styles.동영상배경}>
          <iframe
            width="822"
            height="464"
            src={getYouTubeEmbedUrl(data.fetchBoard.youtubeUrl)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className={styles.동영상배경}>
          <Image
            src="/icons/video.png"
            alt="동영상 플레이어"
            width={822}
            height={464}
          />
        </div>
      )}
      {/* 좋아요/싫어요 버튼 섹션 */}
      <div className={styles.싫어요좋아요}>
        {/* 싫어요 버튼과 카운트 */}
        <div className={styles.싫어요}>
          <div>
            <DislikeOutlined style={{ fontSize: '24px' }} />
          </div>
          <div>24</div>{' '}
          {/* 하드코딩된 값 - 실제로는 data?.fetchBoard.dislikeCount 사용 권장 */}
        </div>

        {/* 좋아요 버튼과 카운트 */}
        <div className={styles.좋아요}>
          <div>
            <LikeOutlined style={{ fontSize: '24px' }} />
          </div>
          <div>12</div>{' '}
          {/* 하드코딩된 값 - 실제로는 data?.fetchBoard.likeCount 사용 권장 */}
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
