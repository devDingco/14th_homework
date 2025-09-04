// 목데이터 파일
// 각 테이블 컴포넌트에서 사용할 샘플 데이터

// 상품 테이블용 목데이터
export const productData = [
  { id: 240, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매완료' },
  { id: 241, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매중' },
  { id: 242, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매중' },
  { id: 243, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매완료' },
  { id: 244, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매중' },
  { id: 245, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매완료' },
  { id: 246, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매중' },
  { id: 247, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매중' },
  { id: 248, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매중' },
  { id: 249, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', status: '판매중' },
];

export const bookMarkData = [
  { id: 230, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '홍길동', status: null },
  { id: 231, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '김철수', status: null },
  { id: 232, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '이영희', status: null },
  { id: 233, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '박민수', status: null },
  { id: 234, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '최지영', status: null },
  { id: 235, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '정수현', status: null },
  { id: 236, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '강민호', status: null },
  { id: 237, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '윤서연', status: null },
  { id: 238, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '조현우', status: null },
  { id: 239, name: '파르나스 호텔 제주', price: 326000, date: '2024-12-16', seller: '한예린', status: null },
];

// 전체 거래내역 (통합) - 시간순으로 모든 거래가 섞여서 표시
export const allTransactionData = [
  { id: 1,
    date: '2024-12-16',
    type: '충전',
    product: '포인트 충전',
    amount: 1000000,
    balance: 1000000,
    seller: null,
  },
  {
    id: 2,
    date: '2024-12-16',
    type: '구매',
    product: '파르나스 호텔 제주',
    amount: -500000,
    balance: 500000,
    seller: '홍길동',
  },
  {
    id: 3,
    date: '2024-12-15',
    type: '판매',
    product: '바나나 우유 대추',
    amount: 300000,
    balance: 800000,
    seller: null,
  },
  { id: 4, 
    date: '2024-12-15', 
    type: '충전', 
    product: '포인트 충전', 
    amount: 800000, 
    balance: 500000, 
    seller: null,
  },
  {
    id: 5,
    date: '2024-12-14',
    type: '구매',
    product: '파리바게뜨 앙버터 호두',
    amount: -200000,
    balance: 500000,
    seller: '김철수',
  },
  {
    id: 6,
    date: '2024-12-14',
    type: '판매',
    product: '유니버스 호텔 코인',
    amount: 150000,
    balance: 700000,
    seller: null,
  },
  { id: 7, date: '2024.12.13',
     type: '충전',
     product: '포인트 충전',
     amount: 500000,
     balance: 550000,
     seller: null,
  },
  {
    id: 8,
    date: '2024-12-13',
    type: '구매',
    product: '파르나스 호텔 제주',
    amount: -400000,
    balance: 150000,
    seller: '이영희',
  },
  {
    id: 9,
    date: '2024-12-12',
    type: '판매',
    product: '바나나 우유 대추',
    amount: 250000,
    balance: 250000,
    seller: null,
  },
  { id: 10, date: '2024-12-12', type: '충전', product: '포인트 충전', amount: 600000, balance: 300000, seller: null },
  {
    id: 11,
    date: '2024-12-11',
    type: '구매',
    product: '파리바게뜨 앙버터 호두',
    amount: -100000,
    balance: 300000,
    seller: '박민수',
  },
  {
    id: 12,
    date: '2024-12-11',
    type: '판매',
    product: '유니버스 호텔 코인',
    amount: 180000,
    balance: 400000,
    seller: null,
  },
  { id: 13, date: '2024-12-10', type: '충전', product: '포인트 충전', amount: 400000, balance: 220000, seller: null },
  {
    id: 14,
    date: '2024-12-10',
    type: '구매',
    product: '파르나스 호텔 제주',
    amount: -300000,
    balance: 220000,
    seller: '최지영',
  },
  {
    id: 15,
    date: '2024-12-09',
    type: '판매',
    product: '바나나 우유 대추',
    amount: 120000,
    balance: 520000,
    seller: null,
  },
];

// 포인트 충전 내역만
export const chargeData = allTransactionData.filter((item) => item.type === '충전');

// 상품 구매 내역만
export const purchaseData = allTransactionData.filter((item) => item.type === '구매');

// 상품 판매 내역만
export const saleData = allTransactionData.filter((item) => item.type === '판매');
