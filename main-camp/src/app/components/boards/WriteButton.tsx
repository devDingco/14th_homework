"use client"
import { FunctionComponent, MouseEventHandler, useState } from 'react'
import styles from './style.module.css'

type Props = {
    state: {
        writer: string,
        password: string | number,
        title: string,
        content: string
    },
    p?: string,
    setState?: MouseEventHandler | undefined
}

const WriteButton:FunctionComponent<Props> = (props) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    const valObj = props.state

    if (isActive) {
        if (valObj.writer === "" || valObj.password === "" || valObj.title === "" || valObj.content === "") {
            setIsActive(false)
        }
    } else {
        if (valObj.writer && valObj.password && valObj.title && valObj.content) {
            setIsActive(true)
        }
    }

    let btnComponent
    switch (props.p) {
        case "취소": {
            btnComponent =
            <button className={`${styles.write_cancel_btn} sb_18_24`} style={{ whiteSpace: "nowrap" }}>{props.p}</button>
            break
        }
        case "등록하기": {
            btnComponent =
            <button className={`${styles.write_confirm_btn} sb_18_24`} onClick={props.setState} style={{ background: isActive === true ? "rgba(41, 116, 229, 1)" : "rgba(199, 199, 199, 1)" }}>{props.p}</button>
            break
        }
        default:
    }
    return (
        btnComponent
    )
}

export default WriteButton