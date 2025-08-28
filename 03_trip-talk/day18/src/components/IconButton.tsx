import { ReactElement } from 'react'
import './CustomButton.css'

export interface IconButtonProps {
  children: ReactElement
  content: string
}
export const IconButton = ({ children, content }: IconButtonProps) => {
  return (
    <button type="button" className="icon-button">
      {children}
      <p>{content}</p>
    </button>
  )
}
