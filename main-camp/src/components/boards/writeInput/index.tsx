"use client"
import { ChangeEventHandler, FunctionComponent } from "react"
import styles from './style.module.css'

type Props = {
    isEdit: boolean,
    data?: any,
    label: string,
    placeholder?: string,
    errMsg?: string
    setState?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
}

const WriteInput:FunctionComponent<Props> = (props) => {
    let inputComponent
    switch (props.label) {
        case "작성자": {
            inputComponent = 
            <div className={`${styles.input_frame_620w_80h} flex_column`}>
                <label className={`${styles.label_620w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>{props.label}<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                {props.isEdit 
                    ? <input className={`${styles.input_620w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder} disabled style={{ background: "rgba(242, 242, 242, 1)" }} defaultValue={props.data?.fetchBoard.writer}></input>
                    : <input className={`${styles.input_620w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder}></input>
                }
                <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{props.errMsg}</p>
            </div>
            break
        }
        case "비밀번호": {
            inputComponent = 
            <div className={`${styles.input_frame_620w_80h} flex_column`}>
                <label className={`${styles.label_620w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>{props.label}<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                {props.isEdit
                    ? <input className={`${styles.input_620w_48h} input_g_border_gray r_16_24`} type="password" onChange={props.setState} placeholder='**********' disabled style={{ background: "rgba(242, 242, 242, 1)"}} defaultValue={props.data?.fetchBoard.password}></input>
                    : <input className={`${styles.input_620w_48h} input_g_border_gray r_16_24`} type="password" onChange={props.setState} placeholder={props.placeholder}></input>
                }
                <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{props.errMsg}</p>
            </div>
            break
        }
        case "제목": {
            inputComponent =
            <div className={`${styles.input_frame_12800w_80h} flex_column`}>
                <label className={`${styles.label_1280w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>{props.label}<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                {props.isEdit
                    ? <input className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder} defaultValue={props.data?.fetchBoard.title}></input>
                    : <input className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder}></input>
                }
                <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{props.errMsg}</p>
            </div>
            break
        }
        case "내용": {
            inputComponent =
            <div className={`${styles.input_frame_1280w_336h} flex_column`}>
                <label className={`${styles.label_620w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>{props.label}<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                {props.isEdit
                    ? <textarea className={`${styles.textarea_1280w_336h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder} defaultValue={props.data?.fetchBoard.contents}></textarea>
                    : <textarea className={`${styles.textarea_1280w_336h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder}></textarea>
                }
                <p className={`me_16_24`} style={{ color: "rgba(246, 106, 106, 1)" }}>{props.errMsg}</p>
            </div>
            break
        }
        case "주소": {
            inputComponent =
            <>
                <div className={`${styles.input_frame_220w_80h} flex_column`}>
                    <label className={`${styles.label_220w_24h} me_16_24`}>{props.label}</label>
                    <div className={`${styles.input_frame_220w_48h} flex_row`}>
                        <input className={`${styles.input_82w_48h} input_g_border_gray r_16_24`} placeholder="01234"></input>
                        <button className={`${styles.zip_btn} ${styles.sb_18_24}`} style={{ whiteSpace: "nowrap" }}>우편번호 검색</button>
                    </div>
                </div>
                <div>
                    <input className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} placeholder={props.placeholder}></input>
                </div>
                <div>
                    <input className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} placeholder="상세주소"></input>
                </div>
            </>
            break
        }
        case "유튜브 링크": {
            inputComponent =
            <div className={`${styles.input_frame_1280w_80h} flex_column`}>
                <label className={`${styles.label_1280w_24h} me_16_24`}>{props.label}</label>
                <input className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} placeholder={props.placeholder}></input>
            </div>
            break
        }
        case "사진 첨부": {
            inputComponent =
            <div>
                <label className={`${styles.label_1280w_24h}`}>{props.label}</label>
                <div></div>
            </div>
            break
        }
        default:
    }
    return (
        inputComponent
    )
}

export default WriteInput