'use client';

import './detail.css';
import Image from 'next/image';
import FeedbackForm from '@/commons/feedbackForm/feedbackForm';
import { useRouter, useParams } from 'next/navigation';
import { useGetBoard, useGetBoardComments, useLikeBoard, useDislikeBoard } from '@/hooks/useGraphQL';
import { useState } from 'react';

export default function Detail() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.detail as string;

  const { data, loading, error, refetch } = useGetBoard(boardId);
  const { data: commentsData, loading: commentsLoading, error: commentsError } = useGetBoardComments(boardId);
  const [likeBoard] = useLikeBoard();
  const [dislikeBoard] = useDislikeBoard();

  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);

  if (loading) return <div className="container">로딩 중...</div>;
  if (error) return <div className="container">에러가 발생했습니다: {error.message}</div>;
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
              <Image
                src={`https://storage.googleapis.com/${board.images[0]}`}
                alt="게시글 이미지"
                width={400}
                height={531}
              />
              <br />
            </>
          )}
          {board.contents.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
        {board.youtubeUrl && (
          <div className="detail_content_video_section">
            <iframe
              width="822"
              height="464"
              src={board.youtubeUrl.replace('watch?v=', 'embed/')}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

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
          <div className="detail_content_button_item">
            <Image src="/icons/pencil.png" alt="detail" width={24} height={24} />
            <span className="sb_14_20">수정하기</span>
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
