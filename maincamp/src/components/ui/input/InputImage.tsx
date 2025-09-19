import styles from './InputImage.module.css'
import { ChangeEvent} from "react"

export default function InputImage (props:{id?: string, onChange?:(event: ChangeEvent<HTMLInputElement>) => void, className?: string}){

    return(
      <div className={`${styles.add__image} ${props.className}`}>
        <label htmlFor={props.id}>
            <input type="file" id ={props.id} style={{display:"none"}} onChange={props.onChange}/>
            <img src={"/icons/add.svg"} />
            <span className={styles.textDesktop}>클릭해서 사진 업로드</span>
            <span className={styles.textMobile}>사진 업로드</span>
        </label>
      </div>
    )
  }