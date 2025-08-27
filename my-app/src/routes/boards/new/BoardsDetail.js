import './BoardsDetail.css';
import React, { useState } from "react";
import 프로필이미지 from "./assets/img.svg";
import 링크 from "./assets/link.svg";
import 위치 from "./assets/location.svg";
import 해변사진 from "./assets/beach.jpg";
import 비디오사진 from "./assets/video.jpg";
import 검정하트 from "./assets/bad.svg";
import 빨강하트 from "./assets/good.svg";

function BoardsDetail () {


 return (
 <>
    <div className='게시글상세화면_프레임'>
     <div className='게시글상세화면_컨테이너'>
      <h1>살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라</h1>
        <div className='바디_정보'>
         <div className='프로필-작성일자'>
          <div className='프로필'>
          <img className='프로필_이미지' src={프로필이미지}/>
          <div className='프로필_이름'>홍길동</div>
          </div>
          <div className='작성일자'>2024.11.11</div>
        </div>
         <div className="링크-위치">
          <img className="링크" src={링크} />
          <img className="위치" src={위치} />
         </div>
        <img className="바디_이미지" src={해변사진} />
        <textarea className="바디_내용" placeholder='야호!'/>
        <div>
         <img className="바디_동영상" src={비디오사진} />
        </div>
        <div className='하단_하트'>
         <div className='하단_검정하트'>
          <img className="하단_검정하트_이미지" src={검정하트} />
          <div className='하단_검정하트_숫자'>24</div>
         </div>
         <div className='하단_빨강하트'>
         <img className="하단_빨강하트_이미지" src={빨강하트} />
         <div className='하단_빨강하트_숫자'>12</div>
         </div>
        </div>
        <div className='하단_목록-수정'>
         <button className='하단_목록으로'>목록으로</button>
         <button className='하단_수정하기'>수정하기</button>
        </div>
     </div>
    </div>
    </div>
 </>
 
 )
};

export default BoardsDetail;