import React from 'react';
import { createRoot } from 'react-dom/client';

// CSS 파일을 React 컴포넌트 내부에서 직접 정의
const style = `
/* 전체 페이지 스타일 초기화 */
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: #f7f7f7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* 메인 래퍼: 전체 페이지를 감싸는 하나의 박스 */
.main-wrapper {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
}

/* 컨테이너 및 재사용 가능한 클래스 */
.container {
    /* 기존의 container 스타일을 main-wrapper로 통합 */
    padding: 20px 32px;
}

.form-group {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #eee; /* 입력 필드 사이의 가로 구분선 */
}

/* 마지막 form-group은 아래 가로줄 제거 */
.form-group:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
}

.label-required::after {
    content: '*';
    color: #F26D21; /* 주황색 별 */
    margin-left: 4px;
}

.input-field,
.textarea-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s ease-in-out;
}

.input-field:focus,
.textarea-field:focus {
    border-color: #F26D21;
}

.textarea-field {
    resize: vertical;
    min-height: 200px;
}

.button {
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.button:hover {
    transform: translateY(-2px);
}

.button.primary {
    background-color: #4CAF50;
    color: white;
}

.button.secondary {
    background-color: #e0e0e0;
    color: #333;
}

/* 헤더 스타일 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    background-color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
}

.header-logo img {
    height: 40px;
}

.header-nav {
    display: flex;
    align-items: center;
}

.header-nav a {
    text-decoration: none;
    color: #555;
    margin-left: 20px;
    font-weight: 500;
}

.user-profile {
    display: flex;
    align-items: center;
}

.user-profile img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 8px;
}

.user-profile span {
    color: #555;
}

/* 파일 업로드 스타일 */
.file-upload-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.file-upload-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    height: 120px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.file-upload-box:hover {
    background-color: #f0f0f0;
}

.file-upload-box svg {
    margin-bottom: 8px;
    color: #999;
}

.file-upload-box span {
    color: #777;
    font-size: 14px;
}

/* 버튼 컨테이너 스타일 */
.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
}

.button-container .button {
    margin-left: 8px;
}

/* PC 레이아웃 이미지 참고 */
@media (min-width: 781px) {
    .main-wrapper {
        width: 100%;
        max-width: 800px;
        margin: 20px auto;
        padding: 40px;
    }
}
`;

// 스타일을 <style> 태그로 삽입
const styleTag = document.createElement('style');
styleTag.innerHTML = style;
document.head.appendChild(styleTag);

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <img src="./logo_area.png" alt="Triptalk Logo" />
            </div>
            <nav className="header-nav">
                <a href="#">트립토크</a>
                <a href="#">숙박권 구매</a>
                <a href="#">마이 페이지</a>
            </nav>
            <div className="user-profile">
                <img src="./profile_basic.png" alt="User Profile" />
                <span>▼</span>
            </div>
        </header>
    );
};

const PostForm = () => {
    return (
        <>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>게시글 등록</h1>

            <div style={{ display: 'flex', gap: '24px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="label-required">작성자</label>
                    <input type="text" className="input-field" placeholder="작성자를 입력해 주세요." />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="label-required">비밀번호</label>
                    <input type="password" className="input-field" placeholder="비밀번호를 입력해 주세요." />
                </div>
            </div>

            <div className="form-group">
                <label className="label-required">제목</label>
                <input type="text" className="input-field" placeholder="제목을 입력해 주세요." />
            </div>

            <div className="form-group">
                <label className="label-required">내용</label>
                <textarea className="textarea-field" placeholder="내용을 입력해 주세요."></textarea>
            </div>

            <div className="form-group">
                <label>주소</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input type="text" className="input-field" style={{ width: '120px' }} placeholder="01234" />
                    <button className="button primary">우편번호 검색</button>
                </div>
                <input type="text" className="input-field" style={{ marginBottom: '8px' }} placeholder="주소를 입력해 주세요." />
                <input type="text" className="input-field" placeholder="상세주소" />
            </div>

            <div className="form-group">
                <label>유튜브 링크</label>
                <input type="text" className="input-field" placeholder="링크를 입력해 주세요." />
            </div>

            <div className="form-group">
                <label>사진 첨부</label>
                <div className="file-upload-grid">
                    <div className="file-upload-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                        <span>클릭해서 사진 업로드</span>
                    </div>
                    <div className="file-upload-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                        <span>클릭해서 사진 업로드</span>
                    </div>
                    <div className="file-upload-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                        <span>클릭해서 사진 업로드</span>
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button className="button secondary">취소</button>
                <button className="button primary">등록하기</button>
            </div>
        </>
    );
};

const App = () => {
    return (
        <div className="main-wrapper">
            <Header />
            <div className="container">
                <PostForm />
            </div>
        </div>
    );
};

// React 컴포넌트 렌더링
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);