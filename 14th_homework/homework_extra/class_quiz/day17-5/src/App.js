import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
  
function App() {
  const 아이콘1 = '/images/Group.png'
  const 아이콘2 = '/images/Rectangle1.png'
  const 엑스버튼 = '/images/ic-20-delete-white.png'
  const 세로막대 = '/images/Line.png'
  const 카톡아이콘 = '/images/kakao.png'
  
  const [이메일, 이메일입력] =  useState("")
  const [비밀번호, 비밀번호입력] = useState("")
  const [유효성메시지_이메일, 유효성메시지_이메일_노출] = useState("")
  const [유효성메시지_비밀번호, 유효성메시지_비밀번호_노출] = useState("")
  
  const 이메일입력값 = (event)=>{
    이메일입력(event.target.value)
    if(이메일){
      유효성메시지_이메일_노출("")
    }
  }
  const 비밀번호입력값 = (event)=>{
    비밀번호입력(event.target.value)
    if(비밀번호){
      유효성메시지_비밀번호_노출("")
    }
  }

  const 로그인_유효성검사 = () =>{
       let a =0
       let b =0

       if(!이메일){
          유효성메시지_이메일_노출("이메일을 입력해 주세요.")
        }else if(! 이메일.includes("@")){
          유효성메시지_이메일_노출("이메일주소를 다시 확인해 주세요.'@'가 반드시 포함되어야 합니다.")
        }else{
          a = 1
        } 

        if(!비밀번호){
          유효성메시지_비밀번호_노출("비밀번호를 입력해 주세요.")
        }else if(비밀번호.length < 8 || 비밀번호.length >16){
          유효성메시지_비밀번호_노출("비밀번호는 8~16자 이어야 합니다.")
        }else{
          b = 1
        }

        if(a+b ===2){
          alert("로그인성공!!")
        }
  }

  return (
    <div className="전체영역">
      <div className="중앙제목">
        <img className="아이콘1" src={아이콘1} width="66.24px" height="82.08px"/>
        <img className="아이콘2" src={아이콘2} width="72px" height="24px"/>
        <div className="제목">잇츠로드</div>
      </div>
      <div className="이메일영역">
        <input type="text" onChange={이메일입력값}/>
        <img src={엑스버튼}/>
      </div>
      <div className="유효성메시지">{유효성메시지_이메일}</div>
      <div className="비밀번호영역">
        <input type="password" onChange={비밀번호입력값}/>
        <img src={엑스버튼}/>
      </div>
      <div className="유효성메시지">{유효성메시지_비밀번호}</div>
      <div>
        <button onClick={로그인_유효성검사}>로그인</button>
      </div>
      <div>
        <button>이메일 찾기</button><img src={세로막대}/><button>비밀번호 찾기</button><img src={세로막대}/><button>회원가입</button>
      </div>
      <div>
        <img src={카톡아이콘}/>
        <button>카카오톡으로 로그인</button>
      </div>
    </div>
  );
}

export default App;
