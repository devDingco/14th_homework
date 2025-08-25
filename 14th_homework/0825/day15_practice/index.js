// index.js

const { createElement, useState } = React;
const { createRoot } = ReactDOM;

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
        <div className="container">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
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
        </div>
    );
};

const 게시글등록페이지 = () => {
    return (
        <div className="main-wrapper">
            <Header />
            <PostForm />
        </div>
    );
};

// React 컴포넌트 렌더링
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(createElement(게시글등록페이지));
