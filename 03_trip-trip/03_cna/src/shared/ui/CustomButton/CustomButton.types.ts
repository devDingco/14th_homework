import { MouseEventHandler } from 'react'

export type CustomButtonType = 'submit' | 'button' | 'reset'
export type CustomButtonColor = 'default' | 'blue' | 'black'

export interface CustomButtonProps {
  type: CustomButtonType
  content: string
  disabled?: boolean
  color: CustomButtonColor
  onClick?: MouseEventHandler<HTMLButtonElement>
}
