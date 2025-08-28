const Button_1 = () => {
    const 버튼바꾸기 = () => {
        document.getElementById("버튼1ID").innerText = "반갑습니다"
    }

   

    return (
        <button id="버튼1ID" onClick={버튼바꾸기}>안녕하세요</button>
    )
}

const Button_2 = () => {
    let [button_, setButton_] = React.useState("안녕하세요")

    const onChangeButton_ = (event) =>{
        console.log("1", button_)
        if(button_ === "안녕하세요"){
            setButton_("반갑습니다")
            console.log("2",button_)
        }
        else{setButton_("안녕하세요")}
    }


    return(
        <button onClick={onChangeButton_}>{button_}</button>
    )
}
