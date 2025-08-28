const Count_up_1 = () => {

    const 카운트증가기능 = () => {
        let 숫자 = Number(document.getElementById("증가할숫자ID").innerText)
        숫자 +=1
        console.log("숫자", 숫자, typeof(숫자))
        document.getElementById("증가할숫자ID").innerText = String(숫자)
    }

    return(
        <>
            <div id="증가할숫자ID">0</div>
            <button  onClick={카운트증가기능}>카운트 증가</button>        
        </>
    )
}
let num=0
const Count_up_2 = () => {
    const [number_, setNumber_] = React.useState(0)
    
    const 카운트증가기능 =() => {
        num +=1
        setNumber_(num)
    }

    return(
        <>
            <div>{number_}</div>
            <button  onClick={카운트증가기능}>카운트 증가</button>        
        </>
    )
}