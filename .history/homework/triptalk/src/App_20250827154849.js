import './App.css';
import logo from './assets/icons/logoArea.png';
import add from './assets/icons/add.png';
import { useState } from 'react';

function App() {
  //입력값을 저장하는 state
  const [name, setName] = useState(''); //사용자가 입력한 이름
  const [password, setPassword] = useState(''); //사용자가 입력한 비밀번호
  const [title, setTitle] = useState(''); //사용자가 입력한 제목
  const [content, setContent] = useState(''); //사용자가 입력한 내용

  // 입력값에 문제가 있을 경우 보여줄 에러메시지 state
  const [nameError, setNameError] = useState(''); //이름 에러메시지
  const [passwordError, setPasswordError] = useState(''); //비밀번호 에러메시지
  const [titleError, setTitleError] = useState(''); //제목 에러메시지
  const [contentError, setContentError] = useState(''); //내용 에러메시지

  //변경값 확인하여 state에 저장
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  //등록하기 버튼 클릭시 실행되는 함수
  const onChangesignUp = () => {
    // 0. 모든 에러메시지 초기화
    let hasError = false;
    // 1. 작성자 이름 검증하기
    if (name.trim === '') {
      setNameError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setNameError('');
    }

    // 2. 비밀번호 검증하기
    if (password.length === 0) {
      setPasswordError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setPasswordError('');
    }
    // 3. 제목 검증하기
    if (title.trim() === '') {
      setTitleError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setTitleError('');
    }

    // 4. 내용 검증하기
    if (content.trim() === '') {
      setContentError('필수입력 사항입니다.');
      hasError = true;
    } else {
      setContentError('');
    }
    //5. 성공알람 보여주는곳
    if (hasError === false) {
      alert('게시물이 등록되었습니다!');
    }

    // 그려주는곳
    return (
      <div>
        <nav>
          <div>
            <img src={logo} alt="로고" />
          </div>
          <div className="네비">
            <div>트립토크</div>
            <div>숙박권구매</div>
            <div>마이 페이지</div>
          </div>
        </nav>
        <h2>게시물 등록</h2>
        <div className="작성자비밀번호컨테이너">
          <div className="작성자컨테이너">
            <div>작성자</div>
            <input
              type="text"
              placeholder="작성자 명을 입력해주세요."
              onChange={onChangeName}
            ></input>
          </div>
          <div className="비밀번호컨테이너">
            <div>비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
            ></input>
          </div>
        </div>
        <hr />
        <div className="제목컨테이너">
          <div>제목</div>
          <input
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          ></input>
        </div>
        <hr />
        <div className="내용컨테이너">
          <div>내용</div>
          <textarea
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
          ></textarea>
        </div>
        <div>
          <div className="주소컨테이너">
            <div>주소</div>

            <div className="우편번호">
              <input type="text" placeholder="01234"></input>
              <button>우편번호 검색</button>
            </div>
            <div className="상세주소컨테이너">
              <input type="text" placeholder="주소를 입력해 주세요."></input>
              <input type="text" placeholder="상세주소"></input>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="유튜브컨테이너">
            <div>유튜브 링크</div>
            <input type="text" placeholder="링크를 입력해 주세요"></input>
          </div>
        </div>
        <hr />
        <div className="사진첨부컨테이너">
          <div>사진첨부</div>
          <div className="사진첨부">
            <button>
              <img src={add} alt="업로드" />
              <br />
              클릭해서 사진 업로드
            </button>
            <button>
              <img src={add} alt="업로드" />
              <br />
              클릭해서 사진 업로드
            </button>
            <button>
              <img src={add} alt="업로드" />
              <br />
              클릭해서 사진 업로드
            </button>
          </div>
        </div>
        <div className="취소등록버튼">
          <button className="취소버튼">취소</button>
          <button className="등록하기버튼">등록하기</button>
        </div>
      </div>
    );
  };
}

export default App;
