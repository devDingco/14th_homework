const Validation_= () => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [password_confirm, setPasswordConfirm] = React.useState("")
    const [에러문구_이메일, set에러문구_이메일] = React.useState("")
    const [에러문구_비밀번호, set에러문구_비밀번호] = React.useState("")


    const 이메일입력값 = (event) =>{
        setEmail(event.target.value)
        if(! event.target.value || event.target.value.includes("@")){
            set에러문구_이메일("")
        }
    }

    const 비밀번호입력값 = (event) =>{
        setPassword(event.target.value)
        if(password_confirm === event.target.value){
            set에러문구_비밀번호("")
        }
    }

    const 비밀번호확인입력값 = (event) =>{
        setPasswordConfirm(event.target.value)
        if(password === event.target.value){
            set에러문구_비밀번호("")
        }

    }

    const 유효성검증 = () =>{
        if(! email.includes("@")){
            set에러문구_이메일("이메일에 @가 없으면 에러입니다.")
        }
        if(password !== password_confirm ){
            set에러문구_비밀번호("비밀번호와 비밀번호확인이 다르면 에러입니다.")
        }
    }

    return(
        <>
            이메일 : <input type="text" onChange={이메일입력값}/>
            <div style={{color : "red"}}>{에러문구_이메일}</div>
            비밀번호 : <input type="password" onChange={비밀번호입력값}/><br/>
            비밀번호확인 : <input type="password" onChange={비밀번호확인입력값}/>
            <div style={{color : "red"}}>{에러문구_비밀번호}</div>
            <button onClick={유효성검증}>가입하기</button>
        </>
    )
}

