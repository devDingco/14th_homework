"use client"

import Image from 'next/image';
import styles from './styles.module.css';
import useBoardsDetail from './hook';
import { use } from 'react';


export default function BoardsDetail() {
  const {onClickMove,onclickMoveList,data} = useBoardsDetail()
    
  return (
    <div className={styles.바디}>
      <div className={styles.컨테이너}>
        <main className={styles.메인}>
        <div className={styles['메인-타이틀']}>{data?.fetchBoard?.title || "로딩중..."}</div>
          <section className={styles['메인-작성자섹션']}>
            <div className={styles['메인-작성자섹션-이름날짜디브']}>
                <div className={styles['메인-작성자섹션-이름날짜디브-이름디브']}>
                    <Image
        src={"/images/프로필아이콘.png"}
        alt="프로필아이콘"
        width={24}
        height={24}
      />
                    <h2>{data?.fetchBoard?.writer || "로딩중..."}</h2>
                </div>
                <h2>{data?.fetchBoard?.createdAt || "로딩중..."}</h2>
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
  {data?.fetchBoard?.contents || "로딩중..."}
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
                <span>24</span>
            </div>
          </section>
          <section className={styles['메인-수정하기섹션']}>
            <button onClick={onclickMoveList}><Image src={"/images/목록으로아이콘.png"} alt="목록으로아이콘" width={24} height={24} />목록으로</button>
            <button onClick={onClickMove}><Image src={"/images/수정하기아이콘.png"} alt="수정하기아이콘" width={24} height={24} />수정하기</button>
          </section>
        </main>
      </div>
    </div>
  )
}