import React, { useState } from 'react';
import './App.css';
// src 폴더에 있는 이미지들을 import 합니다.
import logo from './logo_area.png';
import profile from './profile_basic.png';

// Header 컴포넌트
const Header = () => {
    return (
        <header className="header">
            <div className="header-logo-and-nav">
                {/* 로고 이미지 경로를 import한 변수로 변경 */}
                <img src={logo} alt="Triptalk Logo" className="header-logo" />
                <nav className="header-nav">
                    <a href="#">트립토크</a>
                    <a href="#">숙박권 구매</a>
                    <a href="#">마이 페이지</a>
                </nav>
            </div>
            <div className="user-profile">
                {/* 프로필 이미지 경로를 import한 변수로 변경 */}
                <img src={profile} alt="User Profile" />
            </div>
        </header>
    );
};

// PostForm 컴포넌트
const PostForm = () => {
    // 4개의 입력값 상태 관리
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 유효성 검사 오류 메시지 상태 관리
    const [errors, setErrors] = useState({
        author: '',
        password: '',
        title: '',
        content: '',
    });

    // "등록하기" 버튼 클릭 핸들러
    const handleSubmit = () => {
        // 모든 입력값의 유효성을 검사합니다.
        let hasError = false;
        const newErrors = { author: '', password: '', title: '', content: '' };

        if (!author) {
            newErrors.author = '필수입력 사항입니다.';
            hasError = true;
        }
        if (!password) {
            newErrors.password = '필수입력 사항입니다.';
            hasError = true;
        }
        if (!title) {
            newErrors.title = '필수입력 사항입니다.';
            hasError = true;
        }
        if (!content) {
            newErrors.content = '필수입력 사항입니다.';
            hasError = true;
        }

        // 오류 상태를 업데이트합니다.
        setErrors(newErrors);

        // 오류가 없다면 성공 메시지를 표시합니다.
        if (!hasError) {
            alert('게시글 등록이 가능한 상태입니다!');
        }
    };

    return (
        <div className="content-container">
            <h1 className="post-title">게시글 등록</h1>

            {/* 작성자, 비밀번호 입력 필드 그룹 */}
            <div className="form-group first-group form-row-group">
                <div className="flex-1">
                    <label className="label-required">작성자</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="작성자를 입력해 주세요."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    {errors.author && <div className="error-message">{errors.author}</div>}
                </div>
                <div className="flex-1">
                    <label className="label-required">비밀번호</label>
                    <input
                        type="password"
                        className="input-field"
                        placeholder="비밀번호를 입력해 주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
            </div>

            {/* 나머지 폼 그룹들 */}
            <div className="form-column-container">
                {/* 제목 폼 그룹 */}
                <div className="form-group">
                    <label className="label-required">제목</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="제목을 입력해 주세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <div className="error-message">{errors.title}</div>}
                </div>

                {/* 내용 폼 그룹 */}
                <div className="form-group no-border">
                    <label className="label-required">내용</label>
                    <textarea
                        className="textarea-field"
                        placeholder="내용을 입력해 주세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    {errors.content && <div className="error-message">{errors.content}</div>}
                </div>

                {/* 주소 폼 그룹 */}
                <div className="form-group">
                    <label>주소</label>
                    <div className="flex-gap-8 mb-8">
                        <input type="text" className="input-field w-120" placeholder="01234" />
                        <button className="button secondary">우편번호 검색</button>
                    </div>
                    <input type="text" className="input-field mb-8" placeholder="주소를 입력해 주세요." />
                    <input type="text" className="input-field" placeholder="상세주소" />
                </div>

                {/* 유튜브 링크 폼 그룹 */}
                <div className="form-group">
                    <label>유튜브 링크</label>
                    <input type="text" className="input-field" placeholder="링크를 입력해 주세요." />
                </div>

                {/* 사진 첨부 폼 그룹 (마지막 그룹이므로 줄이 없음) */}
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
            </div>

            <div className="button-container">
                <button className="button secondary">취소</button>
                <button className="button primary" onClick={handleSubmit}>등록하기</button>
            </div>
        </div>
    );
};

// 메인 앱 컴포넌트
function App() {
    return (
        <div className="main-container">
            <Header />
            <PostForm />
        </div>
    );
}

export default App;
