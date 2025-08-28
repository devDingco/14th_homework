import './BoardsNew.css';
import logo from '../../../assets/icons/logoArea.png';
import add from '../../../assets/icons/add.png';
import { useState } from 'react';

function BoardsNew() {
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

  // 모든 필드가 입력되었는지 확인하는 함수
  const isFormValid = () => {
    return name.trim() !== '' && password.trim() !== '' && title.trim() !== '' && content.trim() !== '';
  };

  //등록하기 버튼 클릭시 실행되는 함수
  const onClicksignUp = () => {
    // 0. 모든 에러메시지 초기화
    let hasError = false;
    // 1. 작성자 이름 검증하기
    if (name.trim() === '') {
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
  };

  return (
    <div>
      <nav>
        <div>
          <img src={logo} alt="로고" />
        </div>
        <div className="navText">
          <div>여행가고 싶을 땐, 여행톡톡</div>
        </div>
      </nav>
      <div className="container">
        <div className="form">
          <div className="titleWrap">
            <h1>여행경험을 공유해주세요!</h1>
          </div>
          <div className="formWrap">
            <h5>작성자</h5>
            <input
              className="inputWrap"
              type="text"
              onChange={onChangeName}
              placeholder="이름을 적어주세요"
            />
            <div className="errorMessageWrap">{nameError}</div>
          </div>
          <div className="formWrap">
            <h5>비밀번호</h5>
            <input
              className="inputWrap"
              type="password"
              onChange={onChangePassword}
              placeholder="비밀번호를 적어주세요"
            />
            <div className="errorMessageWrap">{passwordError}</div>
          </div>
          <div className="formWrap">
            <h5>제목</h5>
            <input
              className="inputWrap"
              type="text"
              onChange={onChangeTitle}
              placeholder="제목을 적어주세요"
            />
            <div className="errorMessageWrap">{titleError}</div>
          </div>
          <div className="formWrap">
            <h5>내용</h5>
            <textarea
              className="textareaWrap"
              onChange={onChangeContent}
              placeholder="내용을 적어주세요"
            />
            <div className="errorMessageWrap">{contentError}</div>
          </div>
          <div className="formWrap">
            <h5>사진첨부</h5>
            <img src={add} alt="사진첨부" />
          </div>
          <div className="buttonWrap">
            <button 
              className={isFormValid() ? 'bottomButton' : 'bottomButton disabled'} 
              onClick={onClicksignUp}
              disabled={!isFormValid()}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardsNew;