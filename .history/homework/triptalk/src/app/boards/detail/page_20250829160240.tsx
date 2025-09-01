'use client';

import './BoardsDetail.css';
import profile from '../../../assets/icons/profile.png';
import myVideo from '../../../assets/image/video.png';
import link1 from '../../../assets/icons/link1.png';
import location from '../../../assets/icons/location.png';
import sea from '../../../assets/image/sea.png';
import bad from '../../../assets/icons/bad.png';
import good from '../../../assets/icons/good.png';
import list from '../../../assets/icons/list.png';
import pen from '../../../assets/icons/pen.png';

function BoardsDetail() {
  // 그려주는곳
  return (
    <>
      <h1>
        살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
        쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
      </h1>
      <div className="작성자날짜">
        <div className="작성자">
          <img src={profile} alt="" />
          <div>홍길동</div>
        </div>
        <div className="날짜">2024.11.11</div>
      </div>
      <hr />
      <div>
        <div className="링크위치">
          <img src={link1} alt="" />
          <img src={location} alt="" />
        </div>
      </div>
      <img src={sea} alt="" className="바다사진" />
      <div>
        살겠노라 살겠노라. 청산에 살겠노라. 머루랑 다래를 먹고 청산에 살겠노라.
        얄리얄리 얄랑셩 얄라리 얄라 우는구나 우는구나 새야. 자고 일어나 우는구나
        새야. 너보다 시름 많은 나도 자고 일어나 우노라. 얄리얄리 얄라셩 얄라리
        얄라 갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 이끼
        묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐. 얄리얄리 얄라셩 얄라리 얄라
        이럭저럭 하여 낮일랑 지내 왔건만 올 이도 갈 이도 없는 밤일랑 또 어찌 할
        것인가. 얄리얄리 얄라셩 얄라리 얄라 어디다 던지는 돌인가 누구를 맞히려던
        돌인가. 미워할 이도 사랑할 이도 없이 맞아서 우노라. 얄리얄리 얄라셩
        얄라리 얄라 살겠노라 살겠노라. 바다에 살겠노라. 나문재, 굴, 조개를 먹고
        바다에 살겠노라. 얄리얄리 얄라셩 얄라리 얄라 가다가 가다가 듣노라.
        에정지(미상) 가다가 듣노라. 사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는
        것을 듣노라. 얄리얄리 얄라셩 얄라리 얄라 가다 보니 배불룩한 술독에 독한
        술을 빚는구나. 조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌
        하리이까.[1] 얄리얄리 얄라셩 얄라리 얄라
      </div>
      <div className="동영상배경">
        <img src={myVideo} alt="동영상이미지" />
      </div>
      <div className="싫어요좋아요">
        <div className="싫어요">
          <div>
            <img src={bad} alt="" />
          </div>
          <div>24</div>
        </div>

        <div className="좋아요">
          <div>
            <img src={good} alt="" />
          </div>
          <div>12</div>
        </div>
      </div>
      <div className="목록수정">
        <button className="목록버튼">
          <img src={list} alt="" />
          목록으로
        </button>
        <button className="수정버튼">
          <img src={pen} alt="" />
          수정하기
        </button>
      </div>
    </>
  );
}
export default BoardsDetail;
