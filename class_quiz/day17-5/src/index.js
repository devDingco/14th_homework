import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="컨테이너">
        <header className="헤더">
            <img className="헤더-아이콘1" src="./assets/images/아이콘1.png" alt="" />
            <img className="헤더-아이콘2" src="./assets/images/아이콘2.png" alt="" />
            <h1 className="헤더-타이틀">잇츠로드</h1>
        </header>
        <main className="메인">
            <section className="메인-인풋섹션">
                <input type="email" className="메인-인풋섹션-인풋" placeholder="이메일을 입력해주세요" />
                <img src="./assets/images/닫기버튼.png" alt="" />
                <div></div>
            </section>
            <section className="메인-인풋섹션">
                <input type="password" className="메인-인풋섹션-인풋" placeholder="비밀번호를 입력해주세요" />
                <img src="./assets/images/닫기버튼.png" alt="" />
                <div></div>
            </section>
            <section className="메인-버튼섹션" id="로그인버튼">
                <button className="메인-버튼섹션-버튼 메인-버튼섹션-로그인버튼색상">로그인</button>
            </section>
            <section className="메인-텍스트섹션">
                <h2 className="메인-텍스트섹션-텍스트">이메일찾기</h2>
                <hr className="메인-텍스트섹션-선"/>
                <h2 className="메인-텍스트섹션-텍스트">비밀번호찾기</h2>
                <hr className="메인-텍스트섹션-선"/>
                <h2 className="메인-텍스트섹션-텍스트">회원가입</h2>
            </section>
            <section className="메인-버튼섹션" id="카카오톡로그인버튼">
                <img src="./assets/images/카카오톡아이콘.png" alt="" />
                <button className="메인-버튼섹션-버튼 메인-버튼섹션-카카오톡로그인버튼색상">
                    카카오톡으로 로그인
                </button>
            </section>
        </main>
    </div>
);
