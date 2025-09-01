'use client';

import { useEffect, useState } from 'react';
import './point-transaction-layout.css';
import { usePathname, useRouter } from 'next/navigation';

export default function PointTransactionLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (pathname.includes('/mypage/point/charge')) {
      setActiveTab('charge');
    } else if (pathname.includes('/mypage/point/purchase')) {
      setActiveTab('purchase');
    } else if (pathname.includes('/mypage/point/sales')) {
      setActiveTab('sales');
    } else if (pathname.includes('/mypage/point/all')) {
      setActiveTab('all');
    } else {
      setActiveTab(null);
    }
  }, [pathname]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(
      tab === 'all'
        ? '/mypage/point/all'
        : tab === 'charge'
        ? '/mypage/point/charge'
        : tab === 'purchase'
        ? '/mypage/point/purchase'
        : '/mypage/point/sales'
    );
  };

  return (
    <div className="p_t_wrapper">
      <div
        className={`p_t_item ${activeTab === 'all' ? 'active sb_16_24' : 'me_16_24'}`}
        onClick={() => handleTabClick('all')}
      >
        전체
      </div>
      <div
        className={`p_t_item ${activeTab === 'charge' ? 'active sb_16_24' : 'me_16_24'}`}
        onClick={() => handleTabClick('charge')}
      >
        충전내역
      </div>
      <div
        className={`p_t_item ${activeTab === 'purchase' ? 'active sb_16_24' : 'me_16_24'}`}
        onClick={() => handleTabClick('purchase')}
      >
        구매내역
      </div>
      <div
        className={`p_t_item ${activeTab === 'sales' ? 'active sb_16_24' : 'me_16_24'}`}
        onClick={() => handleTabClick('sales')}
      >
        판매내역
      </div>
    </div>
  );
}
