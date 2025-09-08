import { MouseEventHandler, ReactElement } from 'react'
import styles from './CustomButton.module.css'

export interface IconButtonProps {
  children: ReactElement
  content: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}
export const IconButton = ({ children, content, onClick }: IconButtonProps) => {
  return (
    <button type="button" className={styles['icon-button']} onClick={onClick}>
      {children}
      <p>{content}</p>
    </button>
  )
}
