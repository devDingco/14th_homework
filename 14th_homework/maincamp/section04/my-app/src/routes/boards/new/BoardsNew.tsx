import "../../../App.css";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router";

type Errors = {
  writer? : string;
  password? : string;
  title? : string;
  content? : string;
}

const App: React.FC = () => {
  const [writer, setWriter] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [error, setErrors] = useState<Errors>({});

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (error.writer) setErrors((prev) => ({ ...prev, writer: "" }));
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (error.writer) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (error.writer) setErrors((prev) => ({ ...prev, title: "" }));
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (error.writer) setErrors((prev) => ({ ...prev, writer: "" }));
  };


  const validate = (): boolean => {
    const e: Errors = {};
    if (!writer.trim()) e.writer = "필수입력 사항 입니다.";
    if (!password.trim()) e.password = "필수입력 사항 입니다.";
    if (!title.trim()) e.title = "필수입력 사항 입니다.";
    if (!content.trim()) e.content = "필수입력 사항 입니다.";

    setErrors(e);

    const ok = Object.keys(e).length === 0;
    if (ok) alert("게시글 등록이 가능한 상태입니다!");
    return ok;
  };

  const canSubmit = [writer, password, title, content].every(
    (v) => v.trim().length > 0
  );

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
                onChange={onChangeWriter}
              />
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
                onChange={onChangePassword}
              />
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
            onChange={onChangeTitle}
          />
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
            onChange={onChangeContent}
          />
          {error.content && <p className="error">{error.content}</p>}
        </div>
        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>주소</div>
          </div>
          <div className="enroll-address-firstrow">
          <input
              type="number"
              className="zipcode-input"
              placeholder="12345"
            />
            <button className="zipcode-search-button">우편번호 검색</button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className="enroll-input"
            type="text"
          />
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
            aria-disabled={!canSubmit}
          >
            등록하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default App;
