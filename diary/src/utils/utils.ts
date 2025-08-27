export const switchTextColor = (category: string) => {
  switch (category) {
    case '슬퍼요':
      return `#28b4e1`;
    case '놀랐어요':
      return `#d59029`;
    case '화나요':
      return `#777777`;
    case '행복해요':
      return `#ea5757`;
    case '기타':
      return `#28b4e1`;
    default:
      return '#fffff';
  }
};

export const formatDate = () => {
  const nowDate = new Date();

  const year = nowDate.getFullYear().toString().slice(2, 4);
  const month = (nowDate.getMonth() + 1).toString().padStart(2, '0');
  const day = nowDate.getDate().toString().padStart(2, '0');

  return `${year}. ${month}. ${day}`;
};
