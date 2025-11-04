'use client';

import { useState } from 'react';
import styles from './styles.module.css';

export default function AccommodationSearch() {
  const [activeTab, setActiveTab] = useState<'available' | 'closed'>('available');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'single', label: '1인 전용', icon: '👤' },
    { id: 'apartment', label: '아파트', icon: '🏢' },
    { id: 'hotel', label: '호텔', icon: '🏨' },
    { id: 'camp', label: '캠핑', icon: '⛺' },
    { id: 'room-service', label: '룸 서비스 가능', icon: '🍽️' },
    { id: 'fire', label: '불멍', icon: '🔥' },
    { id: 'spa', label: '반신욕&스파', icon: '💆' },
    { id: 'sea', label: '바다 위 숙소', icon: '🌊' },
    { id: 'planterior', label: '플랜테리어', icon: '🌿' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>여기에서만 예약할 수 있는 숙소</h2>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'available' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('available')}
          >
            예약 가능 숙소
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'closed' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('closed')}
          >
            예약 마감 숙소
          </button>
        </div>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchLeft}>
          <div className={styles.datePicker}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div className={styles.dateText}>YYYY.MM.DD - YYYY.MM.DD</div>
          </div>
          <div className={styles.searchInputWrapper}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="제목을 검색해 주세요."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.searchRight}>
          <button className={styles.searchButton}>검색</button>
          <button className={styles.sellButton}>숙박권 판매하기</button>
        </div>
      </div>

      <div className={styles.filters}>
        {filters.map((filter) => (
          <button key={filter.id} className={styles.filterItem}>
            <span className={styles.filterIcon}>{filter.icon}</span>
            <span className={styles.filterLabel}>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
