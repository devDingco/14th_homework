import '../../../App.css'
import { useState } from 'react'
import {Link} from 'react-router'

const App = () => {

  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [error, setErrors] = useState({})

  const canSubmit = [writer, password, title, content].every(v => v.trim().length > 0)

  const onChangeWriter = (event) => {
    setWriter(event.target.value)
    // console.log(writer)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
    // console.log(password)
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
    // console.log(title)
  }

  const onChangeContent = (event) => {
    setContent(event.target.value)
    // console.log(textarea)
  }

  const validate = () => {
    const e = {};
    if(!writer.trim()) e.writer = "필수입력 사항 입니다.";
    if(!password.trim()) e.password = "필수입력 사항 입니다.";
    if(!title.trim()) e.title = "필수입력 사항 입니다.";
    if(!content.trim()) e.content = "필수입력 사항 입니다.";

    setErrors(e);
      
    if(Object.keys(e).length === 0) {
        // alert("게시글 등록이 가능한 상태입니다!");
        return true;
    }
    return false;
  };


  return (
    <div className="layout">
      <div className="enroll-subject">
        <div className="enroll-subject-text">게시물 등록</div>
      </div>
      <div className="enroll-row-container">
        <div className="enroll-row-section">
          <div className="enroll-row-flex">
            <div className="flex-half">
              <div className="enroll-form-title">
                <div>작성자 </div>
                <div className="enroll-required-indicator"> *</div>
              </div>
              <input 
                type="text" 
                placeholder="작성자 명을 입력해 주세요." 
                className="enroll-input" 
                value={writer}
                onChange={(e) => {
                  setWriter(e.target.value);
                  if (error.writer) setErrors(prev => ({ ...prev, writer: "" }));
                }
              }/>
              {error.writer && <p className="error">{error.writer}</p>}
              </div>
            <div className="flex-half">
              <div className="enroll-form-title">
                <div>비밀번호</div>
                <div className="enroll-required-indicator"> *</div>
              </div>
              <input 
                type="password" 
                placeholder="비밀번호를 입력해 주세요." 
                className="enroll-input" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error.password) setErrors(prev => ({ ...prev, password: "" }));
              }}/>
              {error.password && <p className="error">{error.password}</p>}
            </div>
          </div>
        </div>

        <div className="enroll-border"></div>

        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>제목</div>

            <div className="enroll-required-indicator"> *</div>
          </div>
          <input 
            type="text" 
            className="enroll-input" 
            placeholder="제목을 입력해 주세요."  
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error.title) setErrors(prev => ({ ...prev, title: "" }));
            }}/>
            {error.title && <p className="error">{error.title}</p>}
          </div>
        <div className="enroll-border"></div>
        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>내용</div>
            <div className="enroll-required-indicator"> *</div>
          </div>
          <textarea 
            placeholder="내용을 입력해 주세요."
            className="enroll-textarea" 
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error.content) setErrors(prev => ({ ...prev, content: "" }));
            }}>
          </textarea>
          {error.content && <p className="error">{error.content}</p>}
          </div>
        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>주소</div>
          </div>
          <div className="enroll-address-firstrow">
            <input text="number" className="zipcode-input" placeholder="12345"/>
            <button className="zipcode-search-button">우편번호 검색</button>
          </div>

          <input placeholder="주소를 입력해주세요." className="enroll-input" type="text"/>
          <input placeholder="상세주소" className="enroll-input" type="text" />
        </div>
        {/* border */}
        <div className="enroll-border"></div>
        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>유튜브 링크</div>
          </div>
          <input className="enroll-input" placeholder="링크를 입력해 주세요." />
        </div>

        {/* border */}
        <div className="enroll-border"></div>

        <div className="enroll-row-section">
          <div>사진 첨부</div>
          <div className="picture-enroll-row">
            <img src="/add image.png" /> 
            <img src="/add image.png" />
            <img src="/add image.png" />
          </div>
        </div>
      </div>
      <div className="enroll-button-container">
        <button className="enroll-cancel-button">취소</button>
        <Link to="/boards/detail">
            <button 
                className="enroll-submit-button" 
                onClick={validate}
                disabled={!canSubmit}
                aria-disabled = {!canSubmit}
            >
                등록하기
            </button>
        </Link>
      </div>
    </div>
  );
};


export default App;
