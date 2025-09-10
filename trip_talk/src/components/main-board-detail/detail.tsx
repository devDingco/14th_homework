'use client';

import './detail.css';
import Image from 'next/image';
import FeedbackForm from '@/commons/feedbackForm/feedbackForm';
import { useRouter, useParams } from 'next/navigation';
import {
  useGetBoard,
  useGetBoardComments,
  useLikeBoard,
  useDislikeBoard,
  useGetUserLoggedIn,
} from '@/hooks/useGraphQL';
import { useState } from 'react';

export default function Detail() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.detail as string;

  // Hook들을 최상단에 배치
  const { data, loading, error, refetch } = useGetBoard(boardId);
  const { data: commentsData, loading: commentsLoading, error: commentsError } = useGetBoardComments(boardId);
  const { data: userData } = useGetUserLoggedIn();
  const [likeBoard] = useLikeBoard();
  const [dislikeBoard] = useDislikeBoard();

  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);

  console.log('Detail 컴포넌트 - boardId:', boardId);
  console.log('Detail 컴포넌트 - params:', params);

  // boardId 유효성 검사
  if (!boardId || boardId === 'undefined' || boardId === 'null') {
    return <div className="container">잘못된 게시글 ID입니다.</div>;
  }

  console.log('Detail 컴포넌트 - GraphQL 응답:', { data, loading, error });

  if (loading) return <div className="container">로딩 중...</div>;
  if (error) {
    console.error('GraphQL 에러:', error);
    return <div className="container">에러가 발생했습니다: {error.message}</div>;
  }
  if (!data?.fetchBoard) return <div className="container">게시글을 찾을 수 없습니다.</div>;

  const board = data.fetchBoard;
  const comments = commentsData?.fetchBoardComments || [];

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      await likeBoard({ variables: { boardId } });
      // 게시글 데이터 다시 가져와서 좋아요 수 업데이트
      refetch();
    } catch (error) {
      console.error('좋아요 실패:', error);
      alert('좋아요에 실패했습니다.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = async () => {
    if (isDisliking) return;
    setIsDisliking(true);

    try {
      await dislikeBoard({ variables: { boardId } });
      // 게시글 데이터 다시 가져와서 싫어요 수 업데이트
      refetch();
    } catch (error) {
      console.error('싫어요 실패:', error);
      alert('싫어요에 실패했습니다.');
    } finally {
      setIsDisliking(false);
    }
  };

  const handleEditClick = () => {
    // 게시글 데이터를 수정 페이지로 전달
    const editData = {
      title: board.title,
      contents: board.contents,
      writer: board.writer,
      images: board.images,
      youtubeUrl: board.youtubeUrl,
      boardAddress: board.boardAddress,
    };

    // URL 파라미터로 데이터 전달 (큰 데이터는 sessionStorage 사용)
    sessionStorage.setItem('editBoardData', JSON.stringify(editData));
    router.push(`/board/edit/${boardId}`);
  };

  console.log(board);

  return (
    <div className="container">
      <div className="detail_header">
        <div className="b_28_36">{board.title}</div>
        <div className="detail_header_info">
          <div className="detail_header_info_profile">
            <Image src={board.user?.picture || '/images/profile/profile06.png'} alt="profile" width={24} height={24} />
            <span className="detail_header_info_name l_14_20">{board.user?.name || board.writer}</span>
          </div>
          <div className="detail_header_info_date l_14_20">{new Date(board.createdAt).toLocaleDateString('ko-KR')}</div>
        </div>
      </div>
      <div className="detail_content_wrapper">
        {board.boardAddress && (
          <div className="detail_address me_14_20">
            {board.boardAddress.address} {board.boardAddress.addressDetail}
          </div>
        )}
        <div className="detail_content r_16_24">
          {board.images && board.images.length > 0 && (
            <>
              {board.images.map((image: string, index: number) => (
                <Image
                  key={index}
                  src={`https://storage.googleapis.com/${image}`}
                  alt="게시글 이미지"
                  width={400}
                  height={531}
                />
              ))}
              <br />
            </>
          )}
          {board.contents.split('\n').map((line: string, index: number) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
        {board.youtubeUrl &&
          (() => {
            // YouTube URL을 embed URL로 변환하는 함수
            const getYouTubeEmbedUrl = (url: string) => {
              try {
                // 다양한 YouTube URL 형식 처리
                let videoId = '';

                if (url.includes('youtube.com/watch?v=')) {
                  videoId = url.split('watch?v=')[1].split('&')[0];
                } else if (url.includes('youtu.be/')) {
                  videoId = url.split('youtu.be/')[1].split('?')[0];
                } else if (url.includes('youtube.com/embed/')) {
                  videoId = url.split('embed/')[1].split('?')[0];
                } else {
                  return null;
                }

                return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0`;
              } catch (error) {
                console.error('YouTube URL 파싱 실패:', error);
                return null;
              }
            };

            const embedUrl = getYouTubeEmbedUrl(board.youtubeUrl);

            if (!embedUrl) {
              return (
                <div className="detail_content_video_section">
                  <div
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#666',
                      background: '#f5f5f5',
                      borderRadius: '8px',
                    }}
                  >
                    올바르지 않은 YouTube URL입니다.
                  </div>
                </div>
              );
            }

            return (
              <div className="detail_content_video_section">
                <iframe
                  width="822"
                  height="464"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onError={(e) => {
                    console.error('유튜브 영상 로드 실패:', e);
                    const iframe = e.target as HTMLIFrameElement;
                    iframe.style.display = 'none';
                    const errorDiv = document.createElement('div');
                    errorDiv.textContent = '유튜브 영상을 불러올 수 없습니다.';
                    errorDiv.style.cssText =
                      'padding: 20px; text-align: center; color: #666; background: #f5f5f5; border-radius: 8px;';
                    iframe.parentNode?.insertBefore(errorDiv, iframe);
                  }}
                />
              </div>
            );
          })()}

        <div className="detail_content_like_section">
          <div
            className="detail_like_wrapper"
            onClick={handleDislike}
            style={{
              cursor: isDisliking ? 'not-allowed' : 'pointer',
              opacity: isDisliking ? 0.6 : 1,
            }}
          >
            <Image src="/icons/bad.png" alt="detail" width={24} height={24} />
            <span className="detail_like_count dislike r_14_20">{board.dislikeCount}</span>
          </div>
          <div
            className="detail_like_wrapper"
            onClick={handleLike}
            style={{
              cursor: isLiking ? 'not-allowed' : 'pointer',
              opacity: isLiking ? 0.6 : 1,
            }}
          >
            <Image src="/icons/good.png" alt="detail" width={24} height={24} />
            <span className="detail_like_count r_14_20">{board.likeCount}</span>
          </div>
        </div>
        <div className="detail_content_button_section">
          <div className="detail_content_button_item">
            <Image src="/icons/hamburger.png" alt="detail" width={24} height={24} />
            <span className="sb_14_20" onClick={() => router.push('/')}>
              목록으로
            </span>
          </div>
          <div className="detail_content_button_item" onClick={handleEditClick}>
            <Image src="/icons/pencil.png" alt="detail" width={24} height={24} />
            <span className="sb_14_20" style={{ cursor: 'pointer' }}>
              수정하기
            </span>
          </div>
        </div>
      </div>
      <FeedbackForm
        type="댓글"
        boardId={boardId}
        comments={comments}
        commentsLoading={commentsLoading}
        commentsError={commentsError}
      />
    </div>
  );
}
