const Homework__17_3 = () => {

    // 1-1. let과 document.getElementById() 사용
    // React.useEffect (() => {
    //     let authButton = document.getElementById("authButton")
    //     let authNumber = document.getElementById("authNumber")
    //     authButton.addEventListener('click', () => {
    //         let randomNum = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    //         authNumber.innerText = randomNum
    //     })
    // })

    // 1-2. state 사용
    const [authNum, setAuthNum] = React.useState("000000")
    const generateAuthNum = () => {
        let randomNum = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
        setAuthNum(authNum => randomNum)
    }

    

    return(
        <>
        {/* 1-1. let과 document.getElementById() 사용 */}
        {/* <div>인증번호 6자리 : <span id="authNumber">000000</span></div>
        <button id="authButton">인증번호전송</button> */}

        {/* 1-2. state 사용 */}
        <div>인증번호 6자리: {authNum}</div>
        <button onClick={generateAuthNum}>인증번호전송</button>
        </>
    )
}