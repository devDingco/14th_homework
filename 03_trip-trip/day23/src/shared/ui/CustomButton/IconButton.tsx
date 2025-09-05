import { ReactElement } from 'react'
import styles from './CustomButton.module.css'

export interface IconButtonProps {
  children: ReactElement
  content: string
}
export const IconButton = ({ children, content }: IconButtonProps) => {
  return (
    <button type="button" className={styles['icon-button']}>
      {children}
      <p>{content}</p>
    </button>
  )
}
