import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import 검색아이콘 from './images/검색아이콘.png'
import 더보기아이콘 from './images/더보기아이콘.png'
import 홈버튼 from './images/홈버튼.png'
import 잇츠로드버튼 from './images/잇츠로드버튼.png'
import 마이버튼 from './images/마이버튼.png'
import 마이찜버튼 from './images/마이찜버튼.png'
import 프로필사진 from './images/프로필사진.png'
import 프로필더보기 from  './images/프로필더보기.png'




function App() {
  return (
  <div className='컨테이너'>
     <header className='헤더'>
      <section className='헤더-검색섹션'>
        <img width={23} height={23} src={검색아이콘} alt="" />
      </section>
      <section className='헤더-마이섹션'>
        <h2 className='헤더-마이섹션-타이틀'>마이</h2>
        <div className='헤더-마이섹션-아이콘디브'>
          <img src={프로필사진} width={60} height={60} alt="" />
          <p>임정아</p>
          <img src={프로필더보기} alt="" />
        </div>
      </section>
     </header>
     <main className='메인'>
    <nav>
      <ul className='메인-네비'>
        <li className='메인-네비-리스트'>공지사항</li>
        <li className='메인-네비-리스트'>이벤트</li>
        <li className='메인-네비-리스트 선택된'>FAQ</li>
        <li className='메인-네비-리스트'>Q&A</li>
      </ul>
    </nav>
    <hr className='구분선' />
      <ul className='메인-보드'>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>리뷰 작성은 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src={더보기아이콘} alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>리뷰 수정/삭제는 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src={더보기아이콘} alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>아이디/비밀번호를 잊어버렸어요</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src={더보기아이콘} alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>회원탈퇴를 하고싶어요.</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src={더보기아이콘} alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>출발지 설정은 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src={더보기아이콘} alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>비밀번호를 변경하고 싶어요</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src={더보기아이콘} alt="" /></div>
        </li>
      </ul>
     </main>
     <hr className='구분선' />
     <footer className='푸터'>
      <div className='푸터-버튼'>
        <img src={홈버튼} alt="" />
        <span>홈</span>
      </div>
      <div className='푸터-버튼'>
        <img src={잇츠로드버튼} alt="" />
        <span>잇츠로드</span>
      </div>
      <div className='푸터-버튼'>
        <img src={마이찜버튼} alt="" />
        <span>마이찜</span>
      </div>
      <div className='푸터-버튼'>
        <img src={마이버튼} alt="" />
        <span>마이</span>
      </div>
     </footer>
  
  </div>
    
     
  );
}

export default App;
