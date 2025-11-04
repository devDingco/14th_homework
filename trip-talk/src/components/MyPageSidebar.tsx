'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, Wallet, ShoppingBag, CreditCard, Lock } from 'lucide-react';

export function MyPageSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [productsOpen, setProductsOpen] = useState(false);
  const [pointUsageOpen, setPointUsageOpen] = useState(false);

  // URL에 따라 자동으로 메뉴 펼치기
  useEffect(() => {
    if (pathname.includes('/products/')) {
      setProductsOpen(true);
    }
    if (pathname.includes('/point-usage/')) {
      setPointUsageOpen(true);
    }
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-80px)] sticky top-0 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">마이페이지</h2>
      </div>

      <nav className="px-3">
        {/* 포인트현황 */}
        <button
          onClick={() => router.push('/mypage/point-status')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/mypage/point-status')
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>포인트현황</span>
        </button>

        {/* 나의상품&북마크 */}
        <div className="mb-1">
          <button
            onClick={() => setProductsOpen(!productsOpen)}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
              pathname.includes('/products/')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <span>나의상품&북마크</span>
            </div>
            {productsOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {productsOpen && (
            <div className="ml-6 mt-1 space-y-1">
              <button
                onClick={() => router.push('/mypage/products/transactions')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  isActive('/mypage/products/transactions')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                거래내역
              </button>
              <button
                onClick={() => router.push('/mypage/products/bookmarks')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  isActive('/mypage/products/bookmarks')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                북마크
              </button>
            </div>
          )}
        </div>

        {/* 포인트사용내역 */}
        <div className="mb-1">
          <button
            onClick={() => setPointUsageOpen(!pointUsageOpen)}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
              pathname.includes('/point-usage/')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <span>포인트사용내역</span>
            </div>
            {pointUsageOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {pointUsageOpen && (
            <div className="ml-6 mt-1 space-y-1">
              <button
                onClick={() => router.push('/mypage/point-usage')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  isActive('/mypage/point-usage')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => router.push('/mypage/point-usage/charge')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  isActive('/mypage/point-usage/charge')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                충전내역
              </button>
              <button
                onClick={() => router.push('/mypage/point-usage/purchase')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  isActive('/mypage/point-usage/purchase')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                구매내역
              </button>
              <button
                onClick={() => router.push('/mypage/point-usage/sales')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  isActive('/mypage/point-usage/sales')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                판매내역
              </button>
            </div>
          )}
        </div>

        {/* 비밀번호변경 */}
        <button
          onClick={() => router.push('/mypage/change-password')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
            isActive('/mypage/change-password')
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Lock className="w-5 h-5" />
          <span>비밀번호변경</span>
        </button>
      </nav>
    </aside>
  );
}
