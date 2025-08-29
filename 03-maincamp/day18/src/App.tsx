import './App.css';
import { ChangeEvent, useState } from 'react';



const App = () => {


    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const [errorName, setErrorName] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [errorContents, setErrorContents] = useState("")
    
    const onChangeName = (event:ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const onChangeContents = (event:ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value)
    }
    const validation = () => {
        if (name === "") setErrorName("필수입력사항입니다");
        else setErrorName("");
      
        if (password === "") setErrorPassword("필수입력사항입니다");
        else setErrorPassword("");
      
        if (title === "") setErrorTitle("필수입력사항입니다");
        else setErrorTitle("");
      
        if (contents === "") setErrorContents("필수입력사항입니다");
        else setErrorContents("");

        if (name !=="" && password !=="" && title !=="" && contents !=="" )
            alert("게시글 등록이 가능한 상태입니다!")
      };
    
  return (
      <div className="container">
      <header>
          <h1>게시물등록</h1>
      </header>
      <main>
          <section className="메인__작성자비밀번호섹션">
              <section className="메인__작성자비밀번호섹션__작성자섹션">
                  <h2>작성자<img src="./assets/images/별표.png"/></h2>
                  <input onChange={onChangeName} type="text" placeholder="작성자 명을 입력해주세요"/>
                  <div className='color-red Font-h2'>{errorName}</div>
              </section>
              <section className="메인__작성자비밀번호섹션__비밀번호섹션">
                  <h2>비밀번호<img src="./assets/images/별표.png"/></h2>
                  <input onChange={onChangePassword} type="text" placeholder="비밀번호를 입력해주세요"/>
                  <div className='color-red Font-h2'>{errorPassword}</div>
              </section>
          </section>
          <hr/>
          <section className="메인__제목섹션">
              <h2>제목<img src="./assets/images/별표.png"/></h2>
              <input onChange={onChangeTitle} type="text" placeholder="제목 입력해주세요"/>
              <div className='color-red Font-h2'>{errorTitle}</div>
          </section>
          <hr/>
          <section className="메인__내용섹션">
              <h2>내용<img src="./assets/images/별표.png"/></h2>
              <input onChange={onChangeContents} type="text" placeholder="내용을 입력해주세요"/>
              <div className='color-red Font-h2'>{errorContents}</div>
          </section>
          <section className="메인__주소섹션">
              <article className="메인__주소섹션__상단아티클">
                  <h2>주소</h2>
                  <div className="메인__주소섹션__상단아티클__내용">
                      <input value="01234" type="text" disabled/>
                      <button>우편번호 검색</button>
                  </div>
              </article>
              <input type="text" placeholder="주소를 입력해주세요"/>
              <input type="text" placeholder="상세주소"/>
          </section>
          <hr/>
          <section className="메인__유뷰트링크섹션">
              <h2>유튜브링크</h2>
              <input type="text" placeholder="링크를 입력해주세요"/>
          </section>
          <hr/>
          <section className="메인__사진첨부섹션">
              <h2>사진첨부</h2>
              <article className="메인__사진첨부섹션__아티클">
                  <button><img src="./assets/images/사진업로드.png"/></button>
                  <button><img src="./assets/images/사진업로드.png"/></button>
                  <button><img src="./assets/images/사진업로드.png"/></button>
              </article>
          </section>
          <section className="메인__등록하기섹션">
              <button className="메인__등록하기섹션__취소버튼">취소</button>
              <button onClick={validation} className="메인__등록하기섹션__등록하기버튼">등록하기</button>
          </section>

      </main>
   </div>
      
  )
}

export default App;
