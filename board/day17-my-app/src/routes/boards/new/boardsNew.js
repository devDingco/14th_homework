import { Link } from "react-router"
import { useState } from 'react'
import '../../../App.css';

const BoardNew = () => {

    
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")


  const [emailError, setEmailError] = useState("필수입력사항")
  const [passwordError, setPasswordError] = useState("필수입력사항")
  const [titleError, setTitleError] = useState("필수입력사항")
  const [contentError, setContentError] = useState("필수입력사항")
  const [isActive, setIsActive] = useState(false)


  const onChangeEmail = (event) => {
    setEmail(event.target.value)

    if(event.target.value){
        setEmailError("")
    }else{
        setEmailError("필수입력사항")
    }

    if(event.target.value && password && title && content){
        setIsActive(true)
    }else{
        setIsActive(false)
    }
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)

    if(event.target.value){
        setPasswordError("")
    }else{
        setPasswordError("필수입력사항")
    }

    if(email && event.target.value && title && content){
        
        setIsActive(true)

    }else{
        
        setIsActive(false)
    }

  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)

    if(event.target.value){
        setTitleError("")
    }else{
        setTitleError("필수입력사항")
    }
    

    if(email && password && event.target.value && content){
        setIsActive(true)
    }else{
        setIsActive(false)
    }
  }

  const onChangeContent = (event) => {
    setContent(event.target.value)

    if(event.target.value){
        setContentError("")
    }else{
        setContentError("필수입력사항")
    }

    if(email && password && title && event.target.value){
        setIsActive(true)
    }else{
        setIsActive(false)
    }
  }

  const onClickSignUp = () => {
    
    if (email && password  && title && content) {
      alert("게시글 등록이 가능한 상태입니다.")
    }
  }







  return (
    <>
      <div id="head">게시물 등록</div>
      <div id="main">
        <div className="메인">
          <div className="메인__1__1">
            <div>작성자 <span className="필수">*</span> </div>
            <input type="text" placeholder="작성자 명을 입력해 주세요." className="메인1__인풋" onChange={onChangeEmail}></input>
            <div className='errorMassage'>{emailError}</div>
          </div>
          <div className="메인__1__1">
            <div>비밀번호 <span className="필수">*</span></div>
            <input type="password" placeholder="비밀번호를 입력해 주세요." className="메인1__인풋" onChange={onChangePassword}></input>
            <div className='errorMassage'>{passwordError}</div>
          </div>
        </div>
        <hr></hr>
        <div id="메인__제목" className="메인__1__1">
          <div>제목 <span className="필수">*</span></div>
          <input type="text" placeholder="제목을 입력해 주세요." onChange={onChangeTitle}></input>
          <div className='errorMassage'>{titleError}</div>
        </div>
        <hr></hr>

        <div id="메인__내용" className="메인__1__1">
          <div>내용 <span className="필수">*</span></div>
          <textarea placeholder="내용을 입력해 주세요." onChange={onChangeContent}></textarea>
          <div className='errorMassage'>{contentError}</div>
        </div>


        <div id="메인__주소" className="메인__1__1">
          <div className="메인__1__1" id="메인__주소__검색">
            <div>주소</div>
            <div id="메인__주소__주소검색">
              <input type="number" placeholder="01234" id="주소검색인풋"></input>
              <button id="주소검색버튼">우편번호 검색</button>
            </div>
          </div>
          <div>
            <input type="text" placeholder="주소를 입력해 주세요."></input>
          </div>
          <div>
            <input type="text" placeholder="상세주소"></input>
          </div>
        </div>
        <hr></hr>

        <div id="메인__유튜브링크" className="메인__1__1">
          <div>유튜브 링크</div>
          <input type="text" placeholder="링크를 입력해주세요."></input>
        </div>
        <hr></hr>

        <div className="메인__1__1">
          <div>사진 첨부</div>
          <div id="사진첨부목록">
            <div className="사진첨부리스트">
              <img src="../assets/icons/add.png"></img>
              <div>클릭해서 사진 업로드</div>
            </div>
            <div className="사진첨부리스트">
              <img src="../assets/icons/add.png"></img>
              <div>클릭해서 사진 업로드</div>
            </div>
            <div className="사진첨부리스트">
              <img src="../assets/icons/add.png"></img>
              <div>클릭해서 사진 업로드</div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <button id="푸터취소버튼">취소</button>
        <button id="푸터등록버튼" onClick={onClickSignUp} disabled={!isActive} style={{ backgroundColor: isActive ? "blue" : "gray" }}>등록하기</button>

      </div>

    </>

  );
    
}

export default BoardNew