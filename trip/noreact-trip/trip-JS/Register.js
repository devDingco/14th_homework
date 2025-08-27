// Input 컴포넌트
const RegisterInput = ({ inputTitle, display, myPlaceholder, width, height, type, value, onChange }) => {
    const [Value, setValue] = React.useState("")
    const [Error, setError] = React.useState("")
    
    const onChangeValue = (event) => {
        console.log(event.target)

        const newValue = event.target.value   // 임시 변수에 담음
        setValue(newValue)   // 상태 업데이트
        onChange(newValue)   // 부모로 값 전달

        if(newValue === ""){
            setError("필수입력 사항 입니다.")
        } else {
            setError("")
        }
    }

    return (
      <div className="input-wrapper">
        <div className="input-title-box">
            <div className="input-title">{inputTitle}</div>
            <div className="star" style={{ display: display }}>*</div>
        </div>
        <input
          type={type}
          className="input-box"
          placeholder={myPlaceholder} 
          style={{ width: width, height: height }}
          value={value}
          onChange={onChangeValue} />
          <div className="Error" style={{ display: display }}>{Error}</div>
      </div>
    )
  }

// Textarea 컴포넌트
const RegisterText = ({ inputTitle, display, myPlaceholder, width, height, value, onChange}) => {
    const [Value, setValue] = React.useState("")
    const [Error, setError] = React.useState("")
    
    const onChangeValue = (event) => {
        console.log(event.target)

        const newValue = event.target.value   // 임시 변수에 담음
        setValue(newValue)   // 상태 업데이트
        onChange(newValue)   // 부모로 값 전달

        if(newValue === ""){
            setError("필수입력 사항 입니다.")
        } else {
            setError("")
        }
    }

    return (
      <div className="input-wrapper">
        <div className="input-title-box">
            <div className="input-title">{inputTitle}</div>
            <div className="star" style={{ display: display }}>*</div>
        </div>
        <textarea
          className="input-box"
          placeholder={myPlaceholder} 
          style={{ width: width, height: height }}
          value={value}
          onChange={onChangeValue}></textarea>
        <div className="Error" style={{ display: display }}>{Error}</div>
      </div>
    )
  }

// Picture 컴포넌트
const Picture = () => {
    return (
        <div className="OnePicture"></div>
    )
}

// Button 컴포넌트
const Button = ({backgroundColor, color, btnTitle, borderColor, onClick}) => {
    return (
        <button className="버튼"
        style={{backgroundColor: backgroundColor, color: color, borderColor: borderColor}}
        onClick={onClick} // 부모에서 받은 함수 실행
        >{btnTitle}</button>
    )
}