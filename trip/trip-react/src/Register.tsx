import React, { ChangeEvent } from "react";

// Input 컴포넌트

// Input 컴포넌트
interface RegisterInputProps {
  inputTitle: string
  display?: string
  myPlaceholder?: string
  width?: string
  height?: string
  type?: string
  value?: string          // optional
  onChange?: (value: string) => void   // optional
}

export const RegisterInput: React.FC<RegisterInputProps> = ({ inputTitle, display, myPlaceholder, width, height, type = "text", value = "", onChange }) => {
    const [Value, setValue] = React.useState<string>("")
    const [Error, setError] = React.useState<string>("")
    
    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {

        const newValue = event.target.value   // 임시 변수에 담음
        setValue(newValue)   // 상태 업데이트
        onChange?.(newValue) 

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

type RegisterTextProps = {
  inputTitle: string;
  display?: string;
  myPlaceholder: string;
  width: string;
  height: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const RegisterText: React.FC<RegisterTextProps> = ({ inputTitle, display, myPlaceholder, width, height, value = "", onChange}) => {
    const [Value, setValue] = React.useState<string>("")
    const [Error, setError] = React.useState<string>("")
    
    const onChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {

        const newValue = event.target.value   // 임시 변수에 담음
        setValue(newValue)   // 상태 업데이트
        onChange?.(newValue)

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
export const Picture: React.FC = () => {
    return (
        <div className="OnePicture"></div>
    )
}

// Button 컴포넌트

type ButtonProps = {
  backgroundColor: string;
  color: string;
  btnTitle: string;
  borderColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({backgroundColor, color, btnTitle, borderColor, onClick}) => {
    return (
        <button className="버튼"
        style={{backgroundColor: backgroundColor, color: color, borderColor: borderColor}}
        onClick={onClick} // 부모에서 받은 함수 실행
        >{btnTitle}</button>
    )
}