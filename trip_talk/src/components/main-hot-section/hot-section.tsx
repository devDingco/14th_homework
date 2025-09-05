'use client';

import Image from 'next/image';
import './hot-section.css';
import { useGetBoardsOfTheBest } from '@/hooks/useGraphQL';
import { BoardOfTheBest } from '@/types/graphql';
import { useState, useEffect } from 'react';

// 날짜 포맷팅 함수
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// 프로필 이미지 생성 함수 (작성자 이름 기반)
const getProfileImage = (writer: string): string => {
  const profileImages = [
    '/images/profile/profile01.png',
    '/images/profile/profile02.png',
    '/images/profile/profile03.png',
    '/images/profile/profile04.png',
    '/images/profile/profile05.png',
  ];

  // 작성자 이름의 해시값을 기반으로 프로필 이미지 선택
  const hash = writer.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return profileImages[hash % profileImages.length];
};

// 메인 이미지 처리 함수
const getMainImage = (boardImages: string[] | undefined, index: number): string => {
  // 기본 이미지들
  const defaultImages = [
    '/images/hot/hot01.png',
    '/images/hot/hot02.png',
    '/images/hot/hot03.png',
    '/images/hot/hot04.png',
  ];

  // API에서 받은 이미지가 있으면 변환, 없으면 기본 이미지 사용
  if (boardImages && boardImages.length > 0 && boardImages[0]) {
    const imagePath = boardImages[0];
    // 상대 경로를 절대 URL로 변환
    if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
      return `https://storage.googleapis.com/${imagePath}`;
    }
    return imagePath;
  }

  return defaultImages[index % defaultImages.length];
};

export default function HotSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading, error } = useGetBoardsOfTheBest();

  // 클라이언트 사이드에서만 렌더링
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="container hot_section">
        <div className="b_28_36">오늘 핫한 트립토크</div>
        <div className="hot_section_content">
          <div>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container hot_section">
        <div className="b_28_36">오늘 핫한 트립토크</div>
        <div className="hot_section_content">
          <div>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('핫한 트립토크 데이터 로딩 실패:', error);
    return (
      <div className="container hot_section">
        <div className="b_28_36">오늘 핫한 트립토크</div>
        <div className="hot_section_content">
          <div>데이터를 불러올 수 없습니다.</div>
        </div>
      </div>
    );
  }

  const boards: BoardOfTheBest[] = data?.fetchBoardsOfTheBest || [];

  return (
    <div className="container hot_section">
      <div className="b_28_36">오늘 핫한 트립토크</div>
      <div className="hot_section_content">
        {boards.slice(0, 4).map((board: BoardOfTheBest, index: number) => (
          <div key={board._id} className="hot_section_item">
            <Image
              src={getMainImage(board.images, index)}
              alt={board.title}
              width={112}
              height={152}
              style={{ borderRadius: '0.5rem' }}
            />
            <div className="hot_section_item_content">
              <div className="hot_section_item_content_title">
                <div className="b_16_24">{board.title}</div>
                <div className="hot_section_item_profile">
                  <Image src={getProfileImage(board.writer)} alt={board.writer} width={24} height={24} />
                  <div className="hot_section_item_profile_name l_14_20">{board.writer}</div>
                </div>
              </div>
              <div className="hot_section_item_content_footer">
                <div className="hot_section_item_content_footer_like">
                  <Image src={'/icons/like_icon.png'} alt="like" width={24} height={24} />
                  <span className="hot_menu_like r_14_20">{board.likeCount}</span>
                </div>
                <div className="hot_menu_date l_12_20">{formatDate(board.createdAt)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
