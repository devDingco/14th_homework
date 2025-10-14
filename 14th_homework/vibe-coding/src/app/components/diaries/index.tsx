'use client';

import styles from './styles.module.css';
import Selectbox from '@/commons/components/selectbox';
import Searchbar from '@/commons/components/searchbar';
import Button from '@/commons/components/button';
import { EMOTION, EMOTION_KEYS } from '@/commons/constants/enum';
import { URLS } from '@/commons/constants/url';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Diaries() {
  const router = useRouter();

  // 필터 옵션 - ENUM 활용
  const filterOptions = [
    { value: 'all', label: '전체' },
    ...EMOTION_KEYS.map((emotion) => ({
      value: emotion.toLowerCase(),
      label: EMOTION[emotion].label,
    })),
  ];

  // 검색 핸들러
  const handleSearch = (value: string) => {
    console.log('검색어:', value);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (value: string | number) => {
    console.log('필터 변경:', value);
  };

  // 일기쓰기 버튼 핸들러 - URL 상수 활용
  const handleWriteDiary = () => {
    router.push(URLS.DIARY_DETAIL.path.replace('[id]', 'new'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.gap32}></div>
      <div className={styles.search}>
        <div className={styles.searchContent}>
          <Selectbox
            variant="primary"
            size="medium"
            theme="light"
            placeholder="전체"
            options={filterOptions}
            onValueChange={handleFilterChange}
            className={styles.filterSelect}
          />
          <Searchbar
            variant="primary"
            size="medium"
            theme="light"
            placeholder="검색어를 입력해 주세요."
            onSearch={handleSearch}
            className={styles.searchInput}
          />
          <Button
            variant="primary"
            size="medium"
            theme="light"
            onClick={handleWriteDiary}
            className={styles.writeButton}
            leftIcon={
              <Image src="/icons/plus_outline_light_m.svg" alt="일기쓰기" width={24} height={24} />
            }
          >
            일기쓰기
          </Button>
        </div>
      </div>
      <div className={styles.gap42}></div>
      <div className={styles.main}></div>
      <div className={styles.gap40}></div>
      <div className={styles.pagination}></div>
      <div className={styles.gap40}></div>
    </div>
  );
}
