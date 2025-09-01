export const maskingEmail = (email: string): string => {
  const [userId, domain] = email.split('@');
  const preEmail = userId.slice(0, 4);
  return `${preEmail}***@${domain}`;
};

const email1 = maskingEmail('testrwwefdqwdqw@naver.com');
console.log(email1);
const email2 = maskingEmail('testrwwefdqwdqw@gmail.com');
console.log(email2);

export const randomCode = (): string => {
  const randomFloat = Math.random() * 1000000;
  const intCode = Math.floor(randomFloat);
  const strCode = intCode.toString().padStart(6, '0');
  return strCode;
};
