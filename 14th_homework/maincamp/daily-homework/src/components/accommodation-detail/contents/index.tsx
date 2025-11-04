'use client';

import styles from './styles.module.css';

interface ContentsProps {
  description?: string;
}

export default function Contents({
  description = '살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다 얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 \n새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 리얄리 얄라셩 얄라리 얄라 가던 새 가던 새 본다 \n 믈 아래 가던 새 본다 잉무든 장글란 가지고 믈 아래 가던 새 본다 \n 얄리얄리 얄라셩 얄라리 얄라',
}: ContentsProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>상세 설명</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
