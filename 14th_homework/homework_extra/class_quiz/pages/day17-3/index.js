const Validation_1 = () => {

    const 인증번호전송기능 = () => {
        
        let 인증번호 = String(Math.floor((Math.random()*1000000))).padStart(6,0)
        document.getElementById("인증번호ID").innerText = 인증번호
    }

    return(
        <>
            <div id="인증번호ID">000000</div>
            <button  onClick={인증번호전송기능}>인증번호전송</button>        
        </>
    )
}

const Validation_2 = () => {
    const [val_num, setValNum] = React.useState("000000")
    
    const 인증번호전송기능 =() => {
        let 인증번호 = String(Math.floor((Math.random()*1000000))).padStart(6,0)
        setValNum(인증번호)
    }

    return(
        <>
        <div>{val_num}</div>
        <button  onClick={인증번호전송기능}>인증번호전송</button>        
    </>
    )
}