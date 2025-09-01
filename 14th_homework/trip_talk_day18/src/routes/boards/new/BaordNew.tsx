import './BoardNew.css';
import {useState} from 'react'

function BoardNew() {
  const 사진경로 = "/images/add_image.png"
  const 아스타기호 = "/images/_.png"
  // const 사진첨부 = () => {
  // }
  const [name, setName] = useState("")
  const [password, setPassword]= useState("")
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")
 
  // document.getElementById("등록버튼ID").disabled = true
  // document.getElementById("등록버튼ID").style.cssText = " background : var(--gray-300, #C7C7C7); color:white"

  const 작성자입력기능 = (event : React.ChangeEvent<HTMLInputElement>)=>{
    const 작성자이름 = event.target.value
    setName(작성자이름)
    
    if(작성자이름 && password && title && contents){
      (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled = false;
      (document.getElementById("등록버튼ID") as HTMLButtonElement).style.cssText = "background: #2974E5; color: #FFF;"

    }else{
      (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled = true;
      (document.getElementById("등록버튼ID") as HTMLButtonElement).style.cssText = " background : var(--gray-300, #C7C7C7); color:white"

    }
  }
  
  const 비밀번호입력기능 = (event : React.ChangeEvent<HTMLInputElement>) => {
    const 비밀번호 = event.target.value
    setPassword(비밀번호)
    
    if(name && 비밀번호 && title && contents){
      (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled = false;
      (document.getElementById("등록버튼ID") as HTMLButtonElement).style.cssText = "background: #2974E5; color: #FFF;"

    }else{
      (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled = true;
      (document.getElementById("등록버튼ID") as HTMLButtonElement).style.cssText = " background : var(--gray-300, #C7C7C7); color:white"

    }
  }

  const 제목입력기능 = (event : React.ChangeEvent<HTMLInputElement>) => {
    const 제목 = event.target.value
    setTitle(제목)
 
    if(name && password && 제목 && contents){
      (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled = false;
      (document.getElementById("등록버튼ID") as HTMLButtonElement).style.cssText = "background: #2974E5; color: #FFF;"

    }else{
      (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled = true;
      (document.getElementById("등록버튼ID") as HTMLButtonElement).style.cssText = " background : var(--gray-300, #C7C7C7); color:white"

    }
  }

  const 내용입력기능 = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    const 내용 = event.target.value
    setContents(내용)

    if(name && password && title && 내용){
      (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled = false;
      (document.getElementById("등록버튼ID") as HTMLButtonElement).style.cssText = "background: #2974E5; color: #FFF;"

    }else{
      (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled = true;
      (document.getElementById("등록버튼ID") as HTMLButtonElement).style.cssText = " background : var(--gray-300, #C7C7C7); color:white"
    }
  }
 

  return (
    <>
    <div className="게시물등록영역">
            <div className="게시물_등록">게시물 등록</div>
            <div className="작성자_비밀번호_영역">
              <div>
                  <span>작성자</span><img src={아스타기호}/>
                  <input className="작성자" type="text" onChange={작성자입력기능} placeholder="작성자 명을 입력해 주세요."/>
              
              </div>
              <div>
                  <span>비밀번호</span><img src={아스타기호}/>
                  <input className="비밀번호" type="password" onChange={비밀번호입력기능} placeholder="비밀번호를 입력해 주세요."/>
                
              </div>
            </div>
            <div className="제목등록영역">
              <span>제목</span><img src={아스타기호}/>
              <input type="text" onChange={제목입력기능} placeholder="제목을 입력해 주세요."/>
           
            </div>
            <div className="내용_주소_등록영역">
              <div className="내용영역">
                  <span>내용</span><img src={아스타기호}/>
                  <textarea onChange={내용입력기능} placeholder="내용을 입력해 주세요."/>
                 
              </div>
              <div className="주소영역">
                  <div>주소</div>
                  <div className="우편번호">
                      <div className="우편번호노출영역"></div><button className="우편번호검색버튼">우편번호검색</button>
                  </div>
                  <div className="주소노출영역"></div>
                  <input className="상세주소입력영역" type="text" placeholder="상세주소"/>
              </div>
            </div>
            <div className="유튜브링크_첨부영역">
              <div>유튜브 링크</div>
                <input type="text" placeholder="링크를 입력해 주세요."/>
            </div>
            <div className="사진첨부영역">
              <div>사진첨부</div>
                <div className="사진첨부버튼">
                    <img src={사진경로} />
                    <img src={사진경로} />
                    <img src={사진경로} />
                </div>   
            </div>  
            <div className="버튼영역">
              <button className="취소버튼">취소</button>
              <button id ="등록버튼ID" className="등록버튼" >등록하기</button>
          </div>      
        </div>
        
        
    
    </>
  );
}


export default BoardNew;
