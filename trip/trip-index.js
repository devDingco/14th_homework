// Input 컴포넌트
const RegisterInput = ({ inputTitle, myPlaceholder, width, height }) => {
    return (
      <div className="input-wrapper">
        <div className="input-title">{inputTitle}</div>
        <textarea
          className="input-box"
          placeholder={myPlaceholder} 
          style={{ width: width, height: height }}>
        </textarea>
      </div>
    )
  }

// Picture 컴포넌트
const Picture = () => {
    return (
        <div className="OnePicture"></div>
    )
}

// Button 컴포넌트
const Button = ({backgroundColor, color, btnTitle, borderColor}) => {
    return (
        <button className="버튼"
        style={{backgroundColor: backgroundColor, color: color, borderColor: borderColor}}>{btnTitle}</button>
    )
}

const 등록페이지 = () => {

    // 함수의 리턴은 한개만 할 수 있음 -> 하나로 묶자
    return (
        <div className="등록페이지">

            <div className="타이틀">게시물 등록</div>

            <div className="Section">
                <RegisterInput inputTitle="작성자" myPlaceholder="작성자 명을 입력해 주세요." width="62.0rem" height="4.8rem"/>
                <RegisterInput inputTitle="비밀번호" myPlaceholder="비밀번호를 입력해 주세요." width="62.0rem" height="4.8rem"/>
            </div>

            <div className="Section">
                <RegisterInput inputTitle="제목" myPlaceholder="제목을 입력해 주세요." width="128.0rem" height="4.8rem"/>
            </div>

            <div className="SectionNoLine">
                <RegisterInput inputTitle="내용" myPlaceholder="내용을 입력해 주세요." width="128.0rem" height="33.6rem"/>
            </div>
            
            <div className="SectionColumn">
                <RegisterInput inputTitle="주소" myPlaceholder="01234" width="8.2rem" height="4.8rem"/>
                <button className="검색버튼">우편번호 검색</button>
                <textarea className="input-box" placeholder="주소를 입력해 주세요." style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
                <textarea className="input-box" placeholder="상세주소" style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
            </div>

            <div className="Section">
                <RegisterInput inputTitle="유튜브 링크" myPlaceholder="링크를 입력해 주세요." width="128.0rem" height="4.8rem"/>
            </div>

            <div className="SectionColumnNoLine">
                <div className="input-title">사진 첨부</div>
                <div className="pictureUpload">
                    <Picture /><Picture /><Picture />
                </div>
            </div>
            
            <div className="SectionButton">
                <Button backgroundColor="var(--gray-W)" color="var(--gray-B)" btnTitle="취소" borderColor="var(--gray-B)"/>
                <Button backgroundColor="#2974E5" color="#FFF" btnTitle="등록하기" borderColor="none"/>
            </div>


        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <div>
        <등록페이지 />
    </div>
)