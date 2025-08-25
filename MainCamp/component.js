const 사용자인풋 = ({라벨,타입, 플레이스홀더 = "",}) => {
    return(
    <div className="게시물등록_사용자인풋">
     <label className="게시물등록_라벨">{라벨}</label>
     <input className="게시물등록_플레이스홀더" type={타입}  placeholder={플레이스홀더} />
    </div>
    )
};


const 주소인풋 = ({라벨, 플레이스홀더 = "", 플레이스홀더1 = "", 플레이스홀더2 = "",}) => {
    return (
    <div className="게시물등록_주소인풋">
        <div className="게시물등록_주소_상단">
         <label className="게시물등록_주소인풋_라벨">{라벨}</label>
         <div className="게시물등록_주소인풋_우편번호">
          <input className="게시물등록_주소인풋_플레이스홀더" type="text" placeholder={플레이스홀더} />
          <button className="게시물등록_주소인풋_우편번호버튼">우편번호 검색</button>
         </div>
        </div>
        <input className="게시물등록_플레이스홀더" type="text"  placeholder={플레이스홀더1} />
        <input className="게시물등록_플레이스홀더" type="text"  placeholder={플레이스홀더2} />
    </div>
    )
};

const 사진첨부인풋 = ({라벨}) => {
    return (
    <>
    <div className="사진첨부인풋">
        <label>{라벨}</label>
        <div className="게시물등록_사진첨부">
          <div className="게시물등록_사진첨부_박스">
            <img src="./icons/add.svg" />
            <p>클릭해서 사진 업로드</p>
            <input type="file" />
          </div>
          <div className="게시물등록_사진첨부_박스">
            <img src="./icons/add.svg" />
            <p>클릭해서 사진 업로드</p>
            <input type="file" />
          </div>
          <div className="게시물등록_사진첨부_박스">
            <img src="./icons/add.svg" />
            <p>클릭해서 사진 업로드</p>
            <input type="file" />
          </div>
        </div>
    </div>   
    </>
    )
};

const 버튼인풋 = ({버튼_내용}) => {
    return (
      <button className="게시물등록_버튼">{버튼_내용}</button>
    )
};