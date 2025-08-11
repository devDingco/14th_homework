export const switchTextColor = (state: string) => {
  switch (state) {
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
