"use client"

import Image from 'next/image';
import { useState } from 'react';
import styles from './styles.module.css';

// import 굿아이콘 from "../../../assets/images/굿아이콘.png";
// import 동영상샘플 from "../../../assets/images/동영상샘플.png";
// import 로케이션아이콘 from "../../../assets/images/로케이션아이콘.png";
// import 링크아이콘 from "../../../assets/images/링크아이콘.png";
// import 목록으로아이콘 from "../../../assets/images/목록으로아이콘.png";
// import 배드아이콘 from "../../../assets/images/배드아이콘.png";
// import 사진샘플 from "../../../assets/images/사진샘플.png";
// import 수정하기아이콘 from "../../../assets/images/수정하기아이콘.png";
// import 프로필아이콘 from "../../../assets/images/프로필아이콘.png";


const BoardsDetail = () => {

    
  return (
    <div className={styles.바디}>
      <div className={styles.컨테이너}>
        <main className={styles.메인}>
        <div className={styles['메인-타이틀']}>살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라</div>
          <section className={styles['메인-작성자섹션']}>
            <div className={styles['메인-작성자섹션-이름날짜디브']}>
                <div className={styles['메인-작성자섹션-이름날짜디브-이름디브']}>
                    <Image
        src={"/images/프로필아이콘.png"}
        alt="프로필아이콘"
        width={24}
        height={24}
      />
                    <h2>홍길동</h2>
                </div>
                <h2>2024.11.11</h2>
            </div>
            <hr className={styles.수평선}/>
            <div className={styles['메인-작성자섹션-아이콘디브']}>
                <Image
        src={"/images/링크아이콘.png"}
        alt="링크아이콘"
        width={24}
        height={24}
      />
                <Image
        src={"/images/로케이션아이콘.png"}
        alt="로케이션아이콘"
        width={24}
        height={24}
      />
            </div>
          </section>
          <section className={styles['메인-사진섹션']}>
            <Image
        src={"/images/사진샘플.png"}
        alt='샘플'
        width={400}
        height={531}
      />
          </section>
          <section className={styles['메인-내용섹션']}>
          <div>
  {`살겠노라 살겠노라. 청산에 살겠노라.
머루랑 다래를 먹고 청산에 살겠노라.
얄리얄리 얄랑셩 얄라리 얄라

우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
너보다 시름 많은 나도 자고 일어나 우노라.
얄리얄리 얄라셩 얄라리 얄라

갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
얄리얄리 얄라셩 얄라리 얄라

이럭저럭 하여 낮일랑 지내 왔건만
올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
얄리얄리 얄라셩 얄라리 얄라

어디다 던지는 돌인가 누구를 맞히려던 돌인가.
미워할 이도 사랑할 이도 없이 맞아서 우노라.
얄리얄리 얄라셩 얄라리 얄라

살겠노라 살겠노라. 바다에 살겠노라.
나문재, 굴, 조개를 먹고 바다에 살겠노라.
얄리얄리 얄라셩 얄라리 얄라

가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
얄리얄리 얄라셩 얄라리 얄라

가다 보니 배불룩한 술독에 독한 술을 빚는구나.
조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
얄리얄리 얄라셩 얄라리 얄라`}
</div>
          </section>
          <section className={styles['메인-동영상섹션']}>
            <Image
        src={"/images/동영상샘플.png"}
        alt='동영상 샘플'
        width={822}
        height={464}
      />
          </section>
          <section className={styles['메인-좋아요섹션']}>
            <div className={styles['메인-좋아요섹션-배드디브']}>
                <Image
        src={"/images/배드아이콘.png"}
        alt="배드아이콘"
        width={24}
        height={24}
      />
                <span>24</span>
            </div>
            <div className={styles['메인-좋아요섹션-굿디브']}>
                <Image
        src={"/images/굿아이콘.png"}
        alt="굿아이콘"
        width={24}
        height={24}
      />
                <span>12</span>
            </div>
          </section>
          <section className={styles['메인-수정하기섹션']}>
            <button><Image src={"/images/목록으로아이콘.png"} alt="목록으로아이콘" width={24} height={24} />목록으로</button>
            <button><Image src={"/images/수정하기아이콘.png"} alt="수정하기아이콘" width={24} height={24} />수정하기</button>
          </section>
        </main>
      </div>
    </div>
  )
}

export default BoardsDetail;
