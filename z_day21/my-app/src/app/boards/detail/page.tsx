import styles from "./styles.module.css";

export default function BoardsDetail() {
  return (
    <>
      <div className={styles.boards}>
        <div className={styles.boards_detail}>
          <div className={styles.boards_body}>
            <div className={styles.boards_body_main}>
              <div className={styles.제목_font}>
                살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
              </div>
              <div className={styles.글쓴이_날짜}>
                <div className={styles.글쓴이_날짜_좁은거}>
                  <div className={(styles.글쓴이, styles.글쓴이_font)}>
                    <img src="/images/profile.png" alt=""></img>
                    <div className={styles.글쓴이_name}>홍길동</div>
                  </div>
                  <div className={(styles.날짜, styles.날짜_font)}>
                    2024.11.11
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.복붙_위치_위치조정}>
                  <div className={styles.복붙_위치}>
                    <img src="/images/copy.png" alt=""></img>
                    <img src="/images/location.png" alt=""></img>
                  </div>
                </div>
              </div>
              <div>
                <img src="/images/beach.png" alt=""></img>
              </div>
              <div className={styles.content}>
                살겠노라 살겠노라. 청산에 살겠노라.
                <br />
                머루랑 다래를 먹고 청산에 살겠노라.
                <br />
                얄리얄리 얄랑셩 얄라리 얄라
                <br />
                <br />
                우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
                <br />
                너보다 시름 많은 나도 자고 일어나 우노라.
                <br />
                얄리얄리 얄라셩 얄라리 얄라
                <br />
                <br />
                갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
                <br />
                이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
                <br />
                얄리얄리 얄라셩 얄라리 얄라
                <br />
                <br />
                이럭저럭 하여 낮일랑 지내 왔건만
                <br />
                올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
                <br />
                얄리얄리 얄라셩 얄라리 얄라
                <br />
                <br />
                어디다 던지는 돌인가 누구를 맞히려던 돌인가.
                <br />
                미워할 이도 사랑할 이도 없이 맞아서 우노라.
                <br />
                얄리얄리 얄라셩 얄라리 얄라
                <br />
                <br />
                살겠노라 살겠노라. 바다에 살겠노라.
                <br />
                나문재, 굴, 조개를 먹고 바다에 살겠노라.
                <br />
                얄리얄리 얄라셩 얄라리 얄라
                <br />
                <br />
                가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
                <br />
                사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
                <br />
                얄리얄리 얄라셩 얄라리 얄라
                <br />
                <br />
                가다 보니 배불룩한 술독에 독한 술을 빚는구나.
                <br />
                조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
                <br />
                얄리얄리 얄라셩 얄라리 얄라
                <br />
              </div>
              <div className={styles.video_div}>
                <img src="/images/video.png" alt=""></img>
              </div>
              <div className={styles.bad_good}>
                <div className={(styles.bad, styles.good_bad_font)}>
                  <img src="/images/bad.png" alt=""></img>
                  24
                </div>
                <div className={(styles.good, styles.good_bad_font)}>
                  <img src="/images/good.png" alt=""></img>
                  12
                </div>
              </div>
              <div className={styles.buttons}>
                <button className={(styles.button, styles.button_font)}>
                  <img src="/images/list.png" alt=""></img>목록으로
                </button>
                <button className={(styles.button, styles.button_font)}>
                  <img src="/images/fix.png" alt=""></img>수정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
