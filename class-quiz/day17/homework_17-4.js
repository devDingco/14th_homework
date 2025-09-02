const Homework__17_4 = () => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    const [emailError, setEmailError] = React.useState("")
    const [passwordError, setPasswordError] = React.useState("")

    const onChangeEmail = (event) => {

        const value = event.target.value

        if(value.includes("@")){
            setEmailError("")
            setEmail(value)
        }else{
            setEmailError("이메일에 @가 없으면 에러입니다.")
            setEmail("")
        }
    }


    const onChangePassword = (event) => {
        const {id , value} = event.target
        if(id==="password"){
            setPassword(password => value)
            if(value === confirmPassword){
                setPasswordError("")
            } else{
                setPasswordError("비밀번호가 일치하지 않습니다.")
            }

        } else if(id==="confirmPassword"){
            setConfirmPassword(confirmPassword => value)
            if(value === password){
                setPasswordError("")
            } else {
                setPasswordError("비밀번호가 일치하지 않습니다.")
            }
        }
    }


    return(
        <>
        <h3>회원가입</h3>
        <div>
            <div>이메일</div>
            <input type="text" placeholder="이메일을 입력해주세요" onChange={onChangeEmail}/>
            <div style={{color:"red"}}>{emailError}</div>
        </div>
        <br/>
        <div>
            <div>비밀번호</div>
            <input type="password" id="password" placeholder="비밀번호를 입력해주세요" onChange={onChangePassword} />
        </div>
        <br/>
        <div>
            <div>비밀번호 확인</div>
            <input type="password" id="confirmPassword" placeholder="비밀번호를 한 번 더 입력해주세요" onChange={onChangePassword} />
            <div style={{color:"red"}}>{passwordError}</div>
        </div>
        </>
    )
}