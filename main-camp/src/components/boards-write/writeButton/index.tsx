"use client"

import styles from './style.module.css'
import { IWriteButtonProps } from './type'
import useWriteButton from './hook'
import { useEffect } from 'react'
import { useIsEdit } from '@/commons/provider/isEditProvider'

const WriteButton = (props: IWriteButtonProps) => {
    const {
        isActive,
        activeButton,
    } = useWriteButton()

    const { postData } = useIsEdit()

    useEffect(() => {
        activeButton(postData)
    },[postData.writer, postData.password, postData.title, postData.contents])

    let btnComponent
    switch (props.p) {
        case "취소": {
            btnComponent =
            <button className={`${styles.write_cancel_btn} sb_18_24`} style={{ whiteSpace: "nowrap" }}>{props.p}</button>
            break
        }
        case "등록하기": {
            btnComponent =
            // <button className={`${styles.write_confirm_btn} sb_18_24`} onClick={props.onClickHandler ? () => props.onClickHandler : undefined} style={{ background: isActive === true ? "rgba(41, 116, 229, 1)" : "rgba(199, 199, 199, 1)" }}>{props.p}</button>
            <button className={`${styles.write_confirm_btn} sb_18_24`} 
                onClick={async () => {
                    if (props.onClickHandler && postData) {
                        await props.onClickHandler(postData)
                    }
                }}  
                style={{ background: isActive === true ? "rgba(41, 116, 229, 1)" : "rgba(199, 199, 199, 1)" }}>{props.p}
            </button>
            break
        }
        case "수정하기": {
            btnComponent =
            <button className={`${styles.write_confirm_btn} sb_18_24`}  
                onClick={async () => {
                    if (props.onClickHandler && postData) {
                        await props.onClickHandler(postData)
                    }
                }} 
                style={{ background: "rgba(41, 116, 229, 1)" }}>{props.p}
            </button>
            break
        }
        default:
    }
    return (
        btnComponent
    )
}

export default WriteButton