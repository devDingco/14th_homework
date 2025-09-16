"use client"

import Button from '@/components/ui/button/Button'
import { Inputfield, Textareafield } from '@/components/ui/input/Inputfield'
import InputBoardAddress from '@/components/ui/input/InputBoardAddress'
import InputImage from '@/components/ui/input/InputImage'
import styles from './style.module.css'
import useBoardsWrite from './hook'
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Board } from '@/commons/graphql/graphql'




export default function BoardsWrite({isEdit, data}:{isEdit: boolean, data?:{fetchBoard: Board}}){

    const { onChangeWriter, 
        onChangePassword, 
        onChangeTitle, 
        onChangeContents, 
        onChangeBoardAddress, 
        onChangeYoutubeUrl, 
        onClickCancel, 
        onClickUpdate, 
        onClickSubmit, 
        onChangeFile, 
        isValid, 
        images,
        isModalOpen,
        onToggleModal,
        handleComplete,
        boardAddress,
        writer,
        password,
        title,
        contents,
        youtubeUrl
    } = useBoardsWrite({data});
    // const {images, onChangeFile} = useUploadFile(data);

    return(
        <div className={styles.Formfield}>
            {/* 폼 타이틀 */}
            <div className={styles.postForm__title}>게시물 {isEdit? "수정":"등록"}</div>
            {/* 작성자 그룹 */}
            <div className={styles.postForm__writer__group}>
                <Inputfield type='text' label='작성자' required placeholder='작성자 명을 입력해 주세요.' value={writer} isEdit={isEdit} onChange={onChangeWriter}></Inputfield>
                <Inputfield type='password' label='비밀번호' required placeholder='비밀번호를 입력해 주세요.' isEdit={isEdit} onChange={onChangePassword}></Inputfield>
            </div>
            <hr />
            <Inputfield type='text' label='제목'required placeholder='제목을 입력해 주세요.' value={title} onChange={onChangeTitle} ></Inputfield>
            <hr/>
            <Textareafield label='내용' required placeholder='내용을 입력해 주세요.' value={contents} onChange={onChangeContents} ></Textareafield>
            <hr />
            <InputBoardAddress placeholder='주소를 입력해 주세요.' placeholder_2='상세주소' isEdit={isEdit} value={boardAddress} onClick={onToggleModal} onChange={onChangeBoardAddress}></InputBoardAddress>
            {isModalOpen && 
                <Modal 
                    title="주소입력하기" 
                    open={true}
                    styles={{body:{height: 450}}}
                    onOk={onToggleModal}
                    onCancel={onToggleModal}>
                    <DaumPostcodeEmbed onComplete={handleComplete} style={{ height: "100%"}}/>
                </Modal>}
            <hr />
            <Inputfield type='string' label='유튜브 링크' placeholder='링크를 입력해 주세요.' value={youtubeUrl} onChange={onChangeYoutubeUrl}></Inputfield>
            <hr />
            <div className={styles.postForm__attachments__group}>
                <label>사진 첨부</label>
                <div className={styles.image__upload__group}>
                    {images[0] ? <img src={`https://storage.googleapis.com/${images[0]}`} className={styles.upload__image}/>:<InputImage id="0" onChange={onChangeFile} />}
                    {images[1] ? <img src={`https://storage.googleapis.com/${images[1]}`} className={styles.upload__image}/>:<InputImage id="1" onChange={onChangeFile} />}
                    {images[2] ? <img src={`https://storage.googleapis.com/${images[2]}`} className={styles.upload__image}/>:<InputImage id="2" onChange={onChangeFile} />}
                </div>
            </div>
            <div className={styles.postForm__button__group}>
                <Button type="button" variant='FormBtn' onClick={onClickCancel}>취소</Button>
                <Button type="submit" variant='FormBtn' disabled={isEdit? false :isValid} onClick={isEdit? onClickUpdate :onClickSubmit}>{isEdit? "수정" : "등록"}하기</Button>
            </div>
        </div>
    );
}