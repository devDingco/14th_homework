import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  return (
  <div className='컨테이너'>
     <header className='헤더'>
      <section className='헤더-검색섹션'></section>
      <section className='헤더-마이섹션'>
        <h2 className='헤더-마이섹션-타이틀'>마이</h2>
        <div className='헤더-마이섹션-아이콘디브'>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </section>
     </header>
     <main className='메인'>
    <nav className='메인-네비'>
      <ul>
        <li className='메인-네비-리스트'><button>공지사항</button></li>
        <li className='메인-네비-리스트'><button>이벤트</button></li>
        <li className='메인-네비-리스트'><button>FAQ</button></li>
        <li className='메인-네비-리스트'><button>Q&A</button></li>
      </ul>
    </nav>
    <hr className='구분선' />
      <ul className='메인-보드'>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>리뷰 작성은 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src="" alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>리뷰 작성은 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src="" alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>리뷰 작성은 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src="" alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>리뷰 작성은 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src="" alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>리뷰 작성은 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src="" alt="" /></div>
        </li>
        <li className='메인-보드-리스트'>
          <div className='메인-보드-리스트-아티클디브'>
            <h3>Q. 01</h3>
            <p>리뷰 작성은 어떻게 하나요?</p>
          </div>
          <div className='메인-보드-리스트-아이콘디브'><img src="" alt="" /></div>
        </li>
      </ul>
     </main>
     <footer className='푸터'>
      <button className='푸터-버튼'>
        <img src="" alt="" />
        <span>홈</span>
      </button>
      <button className='푸터-버튼'>
        <img src="" alt="" />
        <span>잇츠로드</span>
      </button>
      <button className='푸터-버튼'>
        <img src="" alt="" />
        <span>마이찜</span>
      </button>
      <button className='푸터-버튼'>
        <img src="" alt="" />
        <span>마이</span>
      </button>
     </footer>
  
  </div>
    
     
  );
}

export default App;
