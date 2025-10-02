"use client"

import { FieldValues, FormState } from "react-hook-form"
// import { useFormContext } from "react-hook-form"
import styles from "./styles.module.css"

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    formState: FormState<FieldValues>
    children: React.ReactNode
    className?: string; 
    disabled?: boolean; 
    variant?: "primary" | "secondary";   

}

export default function Button({
    formState,
    className,
    disabled,
    type = "submit",   // 기본값은 submit, 필요시 type="button"으로 재정의 가능
    variant = "primary", // 기본값은 primary
    children,
    ...rest            // onClick 등 추가 속성 받기
}: IProps) {
    // 최종 disabled 결정
    const isDisabled = disabled ?? (formState ? !formState.isValid : false);

    // 클래스명 결정
    const finalClassName = `
        ${styles.mybutton} 
        ${variant === "primary" ? styles.primary : styles.secondary} 
        ${isDisabled ? styles.disabled : ""} 
        ${className}
    `;

    return(
        <button 
            type={type}
            className={finalClassName}
            disabled={isDisabled}
            {...rest}
        >
            {children}
        </button>
    )
}