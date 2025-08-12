export const formatDate = () => {
  const nowDate = new Date();

  const year = nowDate.getFullYear().toString().slice(2, 4);
  const month = (nowDate.getMonth() + 1).toString().padStart(2, '0');
  const day = nowDate.getDate().toString().padStart(2, '0');

  return `${year}. ${month}. ${day}`;
};
