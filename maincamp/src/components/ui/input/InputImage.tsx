import { useMutation } from '@apollo/client';
import styles from './InputImage.module.css'
import { ChangeEvent, useState } from "react"
import { UPLOAD_FILE } from '@/graphql/queries/file';

export default function InputImage (props:{id?: string, onChange?:(event: ChangeEvent<HTMLInputElement>) => void}){

    return(
      <div className={styles.add__image}>
        <label htmlFor={props.id}>
            <input type="file" id ={props.id} style={{display:"none"}} onChange={props.onChange}/>
            <img src={"/icons/add.svg"} />
            <span>클릭해서 사진 업로드</span>
        </label>
      </div>
    )
  }