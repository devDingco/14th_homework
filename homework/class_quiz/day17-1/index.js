import React from "react";

const 텍스트변경 = () => {

    // 1. let + document.getElementById() 방식
    // let 버튼클릭 = document.getElementById("텍스트변경ID");

    // if(버튼클릭) {
    //     버튼클릭.addEventListener("click", function(){
    //         버튼클릭.innerText = "반갑습니다"
    //     })
    // }

    // 2. state를 활용한 방식
    const [텍스트, 텍스트변경함수] = React.useState("안녕하세요")        
    
    const 텍스트변경기능 = () => {
        텍스트변경함수("반갑습니다")
    }   
    
    return (
        <>
            {/* let + document.getElementById() 버튼 */}
            <button id="텍스트변경ID">안녕하세요</button>

            {/* state 버튼 */}
            <button onClick={텍스트변경기능}>{텍스트}</button>
        </>
    )
}

export default 텍스트변경


