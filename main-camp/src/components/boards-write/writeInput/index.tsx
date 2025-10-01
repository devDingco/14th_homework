"use client"

import { useIsEdit } from '@/commons/provider/isEditProvider'
import styles from './style.module.css'
import { IWriteInputProps } from "./type"
import { MouseEvent } from 'react'
import { validateSDL } from 'graphql/validation/validate'

const WriteInput = (props: IWriteInputProps) => {
    
    const { isEdit, postData } = useIsEdit()

    const handlePostcodeClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        props.setIsModalOpen!(true)
    }

    let inputComponent
    switch (props.label) {
        case "작성자": {
            inputComponent = 
            <div className={`${styles.input_frame_620w_80h} flex_column`}>
                <label className={`${styles.label_620w_24h} me_16_24 flex_row`} style={{ whiteSpace: "nowrap" }}>{props.label}<p className={`me_16_24`} style={{ color:"rgba(246, 106, 106, 1)" }}>*</p></label>
                {isEdit 
                    ? <input className={`${styles.input_620w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder} disabled style={{ background: "rgba(242, 242, 242, 1)" }} value={postData.writer || ""}></input>
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
                {isEdit
                    ? <input className={`${styles.input_620w_48h} input_g_border_gray r_16_24`} type="password" onChange={props.setState} placeholder='**********' disabled style={{ background: "rgba(242, 242, 242, 1)"}}></input>
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
                {isEdit
                    ? <input className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder} value={postData.title || ""}></input>
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
                {isEdit
                    ? <textarea className={`${styles.textarea_1280w_336h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder} value={postData.contents || ""}></textarea>
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
                        <input id="zipcode" className={`${styles.input_82w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder="01234" value={postData.boardAddress?.zipcode || ""}></input>
                        <button className={`${styles.zip_btn} ${styles.sb_18_24}`} style={{ whiteSpace: "nowrap" }} onClick={handlePostcodeClick}>우편번호 검색</button>
                    </div>
                </div>
                <div>
                    <input id="address" className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder} value={postData.boardAddress?.address || ""} ></input>
                </div>
                <div>
                    <input id="addressDetail" className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder="상세주소" value={postData.boardAddress?.addressDetail || ""} ></input>
                </div>
            </>
            break
        }
        case "유튜브 링크": {
            inputComponent =
            <div className={`${styles.input_frame_1280w_80h} flex_column`}>
                <label className={`${styles.label_1280w_24h} me_16_24`}>{props.label}</label>
                <input className={`${styles.input_1280w_48h} input_g_border_gray r_16_24`} onChange={props.setState} placeholder={props.placeholder} value={postData.youtubeUrl || ""}></input>
            </div>
            break
        }
        case "사진 첨부": {
            inputComponent =
            <div className={`${styles.input_frame_1280w_192h} flex_column`}>
                <label className={`${styles.label_1280w_24h}`}>{props.label}</label>
                <ul className={`${styles.ul_512w_160h} flex_row`}>
                    {
                        new Array(3).fill("image").map((_,i:number) => {
                            return (
                                postData.images?.[i]
                                ?
                                <li key={i} className={`${styles.input_image_frame}`}>
                                    <img className={`${styles.input_image}`}src={`https://storage.googleapis.com/${postData.images?.[i]}`} />
                                    <img onClick={() =>{
                                            if (props.onClickImageDelete)
                                                props.onClickImageDelete(i)
                                        }} 
                                        src="/svg/close.png" 
                                        className={`${styles.input_image_delete}`} 
                                    />
                                </li>
                                :
                                <>               
                                    <li key={i}
                                        id={`${i}`} 
                                        onClick={() => {
                                            if (props.onClickImage)
                                            props.onClickImage(i)
                                        }} 
                                        className={`${styles.li_160w_160h} flex_column flex_justi_center flex_align_items_center`}
                                    >   
                                        <img src="/svg/add.png" style={{ width: "40px" }}alt="사진 업로드" />    
                                        <p className='r_16_24' style={{ color: "rgba(119, 119, 119, 1)"}}>클릭해서 사진 업로드</p>
                                        <input
                                        id={String(i)}
                                        style={{ display: "none" }}
                                        type="file"
                                        onChange={props.setState}
                                        ref={(v) => {
                                            if (props.fileRef)
                                            (props.fileRef.current[i] = v) 
                                        }}
                                        accept="image/jpeg,image/png" // 선택 자체가 안되게 막기
                                    />
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
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