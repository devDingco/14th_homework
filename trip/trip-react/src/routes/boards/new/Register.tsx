import React, { useState } from 'react'

// Input Props 타입
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

// Input 컴포넌트
export const RegisterInput: React.FC<RegisterInputProps> = ({ inputTitle, display = "block", myPlaceholder, width, height, type = "text", value, onChange }) => {
    const [Value, setValue] = useState("")
    const [Error, setError] = useState("")
    
    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target)

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

// Text Props 타입
interface RegisterTextProps {
  inputTitle: string
  display?: string
  myPlaceholder?: string
  width?: string
  height?: string
  value: string
  onChange: (value: string) => void
}

// Textarea 컴포넌트
export const RegisterText: React.FC<RegisterTextProps> = ({ inputTitle, display = "block", myPlaceholder, width, height, value, onChange}) => {
    const [Value, setValue] = useState("")
    const [Error, setError] = useState("")
    
    const onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event.target)

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

// Button Props 타입
interface ButtonProps {
  backgroundColor: string
  color: string
  btnTitle: string
  borderColor?: string
  onClick?: () => void
  disabled?: boolean
  disabledBackgroundColor?: string
  disabledColor?: string
}

// Button 컴포넌트
export const Button: React.FC<ButtonProps> = ({backgroundColor, color, btnTitle, borderColor, onClick, disabled,
                        disabledBackgroundColor = "#C7C7C7", // 비활성일 때 공통 색상
                        disabledColor = "#E4E4E4"            // 비활성 글씨 색상               
}) => {
    return (
        <button className="버튼"
        style={{borderColor: borderColor,
                backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
                color: disabled ? disabledColor : color,
                cursor: disabled ? 'not-allowed' : 'pointer'}}
        onClick={onClick}
        >{btnTitle}</button>
    )
}