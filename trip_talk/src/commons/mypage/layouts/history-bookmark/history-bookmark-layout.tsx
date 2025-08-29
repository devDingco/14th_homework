'use client';

import { useState, useEffect } from 'react';
import './history-bookmark-layout.css';
import { useRouter, usePathname } from 'next/navigation';

export default function HistoryBookmarkLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (pathname.includes('/mypage/bookmarks')) {
      setActiveTab('bookmark');
    } else if (pathname.includes('/mypage/history')) {
      setActiveTab('history');
    } else {
      setActiveTab(null);
    }
  }, [pathname]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(tab === 'history' ? '/mypage/history' : '/mypage/bookmarks');
  };

  return (
    <div className="h_b_wrapper">
      <div className="h_b_top">
        <span
          className={`${activeTab === 'history' ? 'active sb_16_24' : 'me_16_24'}`}
          onClick={() => handleTabClick('history')}
        >
          나의 상품
        </span>
        <span
          className={`${activeTab === 'bookmark' ? 'active sb_16_24' : 'me_16_24'}`}
          onClick={() => handleTabClick('bookmark')}
        >
          북마크
        </span>
      </div>
      <div className="h_b_bottom">
        <input type="text" className="h_b_input r_16_24" placeholder="필요한 내용을 검색해 주세요." />
        <button className="h_b_search_btn sb_18_24">검색</button>
      </div>
    </div>
  );
}
