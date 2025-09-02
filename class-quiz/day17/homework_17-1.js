const Homework__17_1 = () => {
    

    // 1-1 let과 document.getElementByID() 사용
    // React.useEffect (()=> {

    //     let Button = document.getElementById("hello")

    //     Button.addEventListener('click', (event) => {
    //         document.getElementById(event.target.id).innerText ="반갑습니다"
    //     })
    // })


    // 1-2 state 사용
    const [message, setMessage] = React.useState("안녕하세요")
    const onClickButton = () => {
        setMessage("반갑습니다")
    }
    
    return(
        <>
            {/* 1-1 let과 document.getElementById() 사용 */}
            {/* <button id="hello">안녕하세요</button> */}

            {/* 1-2  state 사용 */}
            <button onClick={onClickButton}>{message}</button>
        </>

    )
}
