"use client";
// import { ChangeEvent, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export default function DetailPage() {
  // const [author, setAuthor] = useState("");
  // const [password, setPassword] = useState("");
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  return (
    <>
      <div className={styles.page}>
        <div className={styles.detailContainer}>
          <div className={styles.detailTitle}>
            살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
            쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
          </div>
          <div className={styles.detailAuthor}>
            <div className={styles.detailAuthor__name}>
              <Image
                src="/icons/outline/profile.svg"
                alt="ProfileIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              양지윤
            </div>
            <div className={styles.detailAuthor__date}>2025.08.27 </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.detailLinkLocation}>
            <div className={styles.detailLinkLocation__enroll}>
              <Image
                src="/icons/outline/link.svg"
                alt="LinkIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              <Image
                src="/icons/outline/location.svg"
                alt="LocationIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
            </div>
          </div>
          <div className={styles.detailPhoto}>
            <Image
              src="/images/beach.png"
              alt="BeachImage"
              width={400}
              height={531}
              sizes="100vw"
            />
          </div>
          <div className={styles.detailContent}>
            살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에
            살겠노라. 얄리얄리 얄랑셩 얄라리 얄라 우는구나 우는구나 새야. 자고
            일어나 우는구나 새야. 너보다 시름 많은 나도 자고 일어나 우노라.
            얄리얄리 얄라셩 얄라리 얄라 갈던 밭(사래) 갈던 밭 보았느냐. 물
            아래(근처) 갈던 밭 보았느냐 이끼 묻은 쟁기를 가지고 물 아래 갈던 밭
            보았느냐. 얄리얄리 얄라셩 얄라리 얄라 이럭저럭 하여 낮일랑 지내
            왔건만 올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가. 얄리얄리
            얄라셩 얄라리 얄라 어디다 던지는 돌인가 누구를 맞히려던 돌인가.
            미워할 이도 사랑할 이도 없이 맞아서 우노라. 얄리얄리 얄라셩 얄라리
            얄라 살겠노라 살겠노라. 바다에 살겠노라. 나문재, 굴, 조개를 먹고
            바다에 살겠노라. 얄리얄리 얄라셩 얄라리 얄라 가다가 가다가 듣노라.
            에정지(미상) 가다가 듣노라. 사슴(탈 쓴 광대)이 솟대에 올라서 해금을
            켜는 것을 듣노라. 얄리얄리 얄라셩 얄라리 얄라 가다 보니 배불룩한
            술독에 독한 술을 빚는구나. 조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니
            내 어찌 하리이까.[1] 얄리얄리 얄라셩 얄라리 얄라
          </div>
          <div className={styles.detailVideo}>
            <Image
              src="/images/sofa.png"
              alt="SofaImage"
              width={822}
              height={464}
              sizes="100vw"
            />
          </div>
          <div className={styles.detailHeart}>
            <div className={styles.detailHeart__bad}>
              <Image
                src="/icons/outline/bad.svg"
                alt="BadIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              24
            </div>
            <div className={styles.detailHeart__good}>
              <Image
                src="/icons/outline/RedGood.svg"
                alt="RedGoodIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              12
            </div>
          </div>
          <div className={styles.detailButtonEnroll}>
            <button className={styles.detailButtonList}>
              <Image
                src="/icons/outline/menu.svg"
                alt="MenuIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              목록으로
            </button>
            <button className={styles.detailButtonEdit}>
              <Image
                src="/icons/outline/edit.svg"
                alt="EditIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
