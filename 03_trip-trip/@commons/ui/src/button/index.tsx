'use client'

import { FieldValues, FormState } from 'react-hook-form'
// import { useFormContext } from 'react-hook-form'
import styles from './styles.module.css'
import React from 'react'

type Button = 'submit' | 'button' | 'reset'
type Variant = 'primary' | 'secondary' | 'outline'
interface IProps {
  type?: Button
  variant?: Variant
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  formState?: FormState<FieldValues>
}

export function Button(props: IProps) {
  const { type = 'button', variant = 'primary', children, leftIcon, rightIcon, formState } = props
  const isDisabled = formState ? !formState.isValid : false
  // const { formState } = useFormContext()

  return (
    <button type={type} className={`${styles.base} ${styles[variant]}`} disabled={isDisabled}>
      {leftIcon && <>{leftIcon}</>}
      {children}
      {rightIcon && <>{rightIcon}</>}
    </button>
  )
}
