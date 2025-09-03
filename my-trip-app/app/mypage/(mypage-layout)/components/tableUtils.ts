// 테이블에서 사용하는 공통 유틸리티 함수들

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatAmountSigned = (amount: number) => {
  const sign = amount >= 0 ? '+' : '-';
  const formatted = Math.abs(amount).toLocaleString();
  return `${sign}${formatted}`;
};

export const formatNumber = (value: number) => value.toLocaleString();

// 페이지네이션 계산 유틸리티
export const calculatePagination = (data: any[], currentPage: number, pageSize: number) => {
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);
  
  return {
    totalPages,
    startIndex,
    paginatedData
  };
};

// 포인트 타입별 색상 클래스 결정
export const getPointColorClass = (type: string) => {
  if (type === '충전' || type === '환불') return 'positive';
  if (type === '구매' || type === '사용') return 'negative';
  return 'neutral';
};
