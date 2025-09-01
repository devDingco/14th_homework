import styles from './InputImage.module.css'

export default function InputImage (){
    return(
      <div className={styles.add__image}>
        <label htmlFor="upload__image">
            <input id="upload__image" type="file" style={{display:"none"}}/>
            <img src="/icons/add.svg" />
            클릭해서 사진 업로드
        </label>
      </div>
    )
  }