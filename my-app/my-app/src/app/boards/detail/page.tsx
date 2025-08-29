"use client";

import styles from "./BoardsDetail.module.css";
// import React, { useState } from "react";
import Image from "next/image";
import 프로필이미지 from "./assets/img.svg";
import 링크 from "./assets/link.svg";
import 위치 from "./assets/location.svg";
import 해변사진 from "./assets/beach.jpg";
import 비디오사진 from "./assets/video.jpg";
import 검정하트 from "./assets/bad.svg";
import 빨강하트 from "./assets/good.svg";
import 목록 from "./assets/list.svg";
import 수정 from "./assets/pencil.svg";

export default function BoardsDetail() {
  return (
    <>
      <div className={styles.게시글상세화면_프레임}>
        <div className={styles.게시글상세화면_컨테이너}>
          <h1>
            살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
            쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
          </h1>
          <div className={styles.바디_정보}>
            <div className={styles.프로필and작성일자}>
              <div className={styles.프로필}>
                <Image
                  className={styles.프로필_이미지}
                  src={프로필이미지}
                  alt="프로필이미지"
                />
                <div className={styles.프로필_이름}>홍길동</div>
              </div>
              <div className={styles.작성일자}>2024.11.11</div>
            </div>
            <div className={styles.링크and위치}>
              <Image className={styles.링크} src={링크} alt="링크" />
              <Image className={styles.위치} src={위치} alt="위치" />
            </div>
            <Image
              className={styles.바디_이미지}
              src={해변사진}
              alt="해변사진"
            />
            <textarea className={styles.바디_내용} placeholder="야호!" />
            <div>
              <Image
                className={styles.바디_동영상}
                src={비디오사진}
                alt="비디오사진"
              />
            </div>
            <div className={styles.하단_하트}>
              <div className={styles.하단_검정하트}>
                <Image
                  className={styles.하단_검정하트_이미지}
                  src={검정하트}
                  alt="검정하트"
                />
                <div className={styles.하단_검정하트_숫자}>24</div>
              </div>
              <div className={styles.하단_빨강하트}>
                <Image
                  className={styles.하단_빨강하트_이미지}
                  src={빨강하트}
                  alt="빨강하트"
                />
                <div className={styles.하단_빨강하트_숫자}>12</div>
              </div>
            </div>
            <div className={styles.하단_목록and수정}>
              <button className={styles.하단_목록으로}>
                <Image src={목록} alt="목록" />
                목록으로
              </button>
              <button className={styles.하단_수정하기}>
                <Image src={수정} alt="수정" />
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export default BoardsDetail;
