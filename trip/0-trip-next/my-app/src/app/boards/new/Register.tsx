"use client";

import React, { useState } from 'react'
import styles from "./styles.module.css"; // 스타일 다 바꿔주기 - 형식 맞게

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
      <div className={styles.input__wrapper}>
        <div className={styles.input__title__box}>
            <div className={styles.input__title}>{inputTitle}</div>
            <div className={styles.star} style={{ display: display }}>*</div>
        </div>
        <input
          type={type}
          className={styles.input__box}
          placeholder={myPlaceholder} 
          style={{ width: width, height: height }}
          value={value}
          onChange={onChangeValue} />
          <div className={styles.Error} style={{ display: display }}>{Error}</div>
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
      <div className={styles.input__wrapper}>
        <div className={styles.input__title__box}>
            <div className={styles.input__title}>{inputTitle}</div>
            <div className={styles.star} style={{ display: display }}>*</div>
        </div>
        <textarea
          className={styles.input__box}
          placeholder={myPlaceholder} 
          style={{ width: width, height: height }}
          value={value}
          onChange={onChangeValue}></textarea>
        <div className={styles.Error} style={{ display: display }}>{Error}</div>
      </div>
    )
  }

// Picture 컴포넌트
export const Picture: React.FC = () => {
    return (
        <div className={styles.OnePicture}></div>
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
        <button className={styles.버튼}
        style={{borderColor: borderColor,
                backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
                color: disabled ? disabledColor : color,
                cursor: disabled ? 'not-allowed' : 'pointer'}}
        onClick={onClick}
        >{btnTitle}</button>
    )
}