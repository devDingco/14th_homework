
import './BoardsNew.css';
import React, { useState } from "react";
import addIcon from "./assets/add.svg";

function BoardsNew () {
// - 변경되는 입력값 새로 저장하는 상태 설정
  const [작성자, set작성자] = useState("");
  const [비밀번호, set비밀번호] = useState("");
  const [제목, set제목] = useState("");
  const [내용, set내용] = useState("");

//입력값에 문제가 있을 때 보여주는 에러메세지 저장하는 상태 설정
  const [작성자에러, set작성자에러] = useState("");
  const [비밀번호에러, set비밀번호에러] = useState("");
  const [제목에러, set제목에러] = useState("");
  const [내용에러, set내용에러] = useState("");


// - 변경되는 입력값 확인후 상태에 저장하기
  const onChange작성자 = (event) => {
    set작성자(event.target.value);
  };

  const onChange비밀번호 = (event) => {
    set비밀번호(event.target.value);
  };
  
  const onChange제목 = (event) => {
    set제목(event.target.value);
  };

  const onChange내용 = (event) => {
    set내용(event.target.value);
  };

// - 등록하기 버튼 눌렀을때 실행되는 함수
 const onClick등록하기 = () => {
    let 에러 = false;      // -> 처음에는 경고 메세지 안떠있는 상태이기 때문에 에러상태가 아님을 지정

    if (작성자.trim() === "") {
      set작성자에러("필수입력 사항입니다");
      에러 = true;
    } else {
      set작성자에러("");
    }

    if (비밀번호.trim() === "") {
      set비밀번호에러 ("필수입력 사항입니다");
      에러 = true;
    } else {
      set비밀번호에러 ("");
    }

    if (제목.trim() === "") {
      set제목에러 ("필수입력 사항입니다");
      에러 = true;
    } else {
      set제목에러 ("");
    }

    if (내용.trim() === "") {
      set내용에러 ("필수입력 사항입니다")
      에러 = true;
    } else {
      set내용에러 ("");
    }

    // 에러가 아니라면 "게시글 등록가능" 창 뜨기
    if (에러 === false) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
 };

  // 내부 컴포넌트 제거하고 단일 JSX로 구성
  return (
    <div className="게시물등록_frame">
      <div className="게시물등록_container">
        <h1>게시물 등록</h1>
        <div className="게시물등록_작성자-비밀번호">
          <div className="게시물등록_사용자인풋">
            <label htmlFor="작성자" className="게시물등록_라벨">작성자</label>
            <input id="작성자" className="게시물등록_플레이스홀더" type="text" placeholder="작성자 명을 입력해 주세요." onChange={onChange작성자} />
            <div className="에러메세지_스타일">{작성자에러}</div>
          </div>
          <div className="게시물등록_사용자인풋">
            <label htmlFor="비밀번호" className="게시물등록_라벨">비밀번호</label>
            <input id="비밀번호" className="게시물등록_플레이스홀더" type="text" placeholder="비밀번호를 입력해 주세요." onChange={onChange비밀번호} />
            <div className="에러메세지_스타일">{비밀번호에러}</div>
          </div>
        </div>
        <hr/>
        <div className="게시물등록_사용자인풋">
          <label htmlFor="제목" className="게시물등록_라벨">제목</label>
          <input id="제목" className="게시물등록_플레이스홀더" type="text" placeholder="제목을 입력해 주세요." onChange={onChange제목} />
          <div className="에러메세지_스타일">{제목에러}</div>
        </div>
        <div className="게시물등록_사용자인풋">
          <label htmlFor="내용" className="게시물등록_라벨">내용</label>
          <textarea id="내용" className="게시물등록_플레이스홀더" placeholder="내용을 입력해 주세요." onChange={onChange내용} />
          <div className="에러메세지_스타일">{내용에러}</div>
        </div>
        <hr/>
        <div className="게시물등록_주소인풋">
          <div className="게시물등록_주소_상단">
            <label className="게시물등록_주소인풋_라벨">주소</label>
            <div className="게시물등록_주소인풋_우편번호">
              <input className="게시물등록_주소인풋_플레이스홀더" type="text" placeholder="01234" />
              <button className="게시물등록_주소인풋_우편번호버튼">우편번호 검색</button>
            </div>
          </div>
          <input className="게시물등록_플레이스홀더" type="text" placeholder="주소를 입력해 주세요." />
          <input className="게시물등록_플레이스홀더" type="text" placeholder="상세주소" />
        </div>
        <hr/>
        <div className="게시물등록_사용자인풋">
          <label htmlFor="유튜브링크" className="게시물등록_라벨">유튜브 링크</label>
          <input id="유튜브링크" className="게시물등록_플레이스홀더" type="text" placeholder="링크를 입력해 주세요" />
        </div>
        <hr/>
        <div className="사진첨부인풋">
          <label>사진첨부</label>
          <div className="게시물등록_사진첨부">
            <label>
              <div className="게시물등록_사진첨부_박스">
                <img src={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
            <label>
              <div className="게시물등록_사진첨부_박스">
                <img src={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
            <label>
              <div className="게시물등록_사진첨부_박스">
                <img src={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
          </div>
        </div>
        <div className="게시물등록_취소-등록하기버튼">
          <button className="버튼인풋" style={{ border:"1px solid #000", backgroundColor:"white", color:"black" }}>취소</button>
          <button className="버튼인풋" style={{ border:"none", backgroundColor:"#2974E5", color:"white" }} onClick={onClick등록하기}>등록하기</button>
        </div>
      </div>
    </div>
  );
};

export default BoardsNew;
