import React, { useState } from 'react';
import './BoardsNew.css';

// Register 관련 컴포넌트들 불러오기
import { RegisterInput, RegisterText, Picture, Button } from './Register';

const BoardsNew = () => {
  const [writer, setWriter] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = () => {
    if (writer && password && title && content) {
      alert("게시글 등록이 완료되었습니다!");
    } else {
      alert("모든 필수 입력값을 채워주세요.");

    }
  };

  // 함수의 리턴은 한개만 할 수 있음 -> 하나로 묶자
  return (
      <div className="등록페이지">

          <div className="타이틀">게시물 등록</div>

          <div className="Section">
              <RegisterInput inputTitle="작성자" myPlaceholder="작성자 명을 입력해 주세요." width="62.0rem" height="4.8rem"
                              value={writer} onChange={(val) => setWriter(val)} />
              <RegisterInput inputTitle="비밀번호" myPlaceholder="비밀번호를 입력해 주세요." width="62.0rem" height="4.8rem" type="password"
                              value={password} onChange={(val) => setPassword(val)}/>
          </div>

          <div className="Section">
              <RegisterInput inputTitle="제목" myPlaceholder="제목을 입력해 주세요." width="128.0rem" height="4.8rem"
                              value={title} onChange={(val) => setTitle(val)}/>
          </div>

          <div className="SectionNoLine">
              <RegisterText inputTitle="내용" myPlaceholder="내용을 입력해 주세요." width="128.0rem" height="33.6rem"
                              value={content} onChange={(val) => setContent(val)}/>
          </div>
          
          <div className="SectionColumn">
              <RegisterInput inputTitle="주소" display="none" myPlaceholder="01234" width="8.2rem" height="4.8rem"/>
              <button className="검색버튼">우편번호 검색</button>
              <textarea className="input-box" placeholder="주소를 입력해 주세요." style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
              <textarea className="input-box" placeholder="상세주소" style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
          </div>

          <div className="Section">
              <RegisterInput inputTitle="유튜브 링크" display="none" myPlaceholder="링크를 입력해 주세요." width="128.0rem" height="4.8rem"/>
          </div>

          <div className="SectionColumnNoLine">
              <div className="input-title">사진 첨부</div>
              <div className="pictureUpload">
                  <Picture /><Picture /><Picture />
              </div>
          </div>
          
          <div className="SectionButton">
              <Button backgroundColor="var(--gray-W)" color="var(--gray-B)" btnTitle="취소" borderColor="var(--gray-B)"/>
              <Button backgroundColor="#2974E5" color="#FFF" btnTitle="등록하기" borderColor="none" onClick={handleSubmit}
                    disabled={!(writer && password && title && content)}/>
          </div>


      </div>
  )
}

export default BoardsNew;
