const Homework__17_2 = () => {

    // 1-1. let 과 document.getElementById() 사용
    // React.useEffect (()=> {

    //     let Button = document.getElementById("counter")
    //     let Result = document.getElementById("result")

    //     Button.addEventListener('click', (event) => {
    //         Result.innerText = Number(Result.innerText) + 1
    //     })
    // })


    // 1-2. state 사용
    const [result, setResult] = React.useState(0)
    const onClickCount = () => {
        setResult(result => result + 1)
    }

    return(
        <>
            {/* 1-1. let과 document.getElementById() */}
            {/* <div id="result">0</div>
            <button id="counter">카운트증가</button> */}

            <div>{result}</div>
            <button onClick={onClickCount}>카운트증가</button>
        </>
    )
}