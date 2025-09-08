"use client"

import Button from '@/components/ui/button/Button'
import { Inputfield, Textareafield } from '@/components/ui/input/Inputfield'
import InputBoardAddress from '@/components/ui/input/InputBoardAddress'
import InputImage from '@/components/ui/input/InputImage'
import styles from './index.module.css'
import { useState } from 'react'
import { ChangeEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'
import { CREATE_BOARD, UPDATE_BOARD } from '@/graphql/mutations/board'
import { UPLOAD_FILE } from '@/graphql/queries/file'
import { FETCH_BOARD, FETCH_BOARDS_AND_COUNT } from '@/graphql/queries/board'

type ImageUrlArray = (string | null | undefined)[]

export default function BoardsWrite({isEdit, data}:{isEdit: boolean, data?:any}){
    // 0. 세팅
    const router = useRouter();
    const params = useParams();

    /* 게시물 등록 유효성 검사 */
    // 1. 작성자, 비밀번호, 제목, 컨텐츠 작성 시 setState로 상태 변경
    const [writer, setWriter] = useState(!data? "" : data.fetchBoard.writer)
    const [password, setPassword] = useState(!data? "" : data.fetchBoard.password)
    const [title, setTitle] = useState(!data? "" : data.fetchBoard.title)
    const [contents, setContents] = useState(!data? "" : data.fetchBoard.contents)
    const [youtubeUrl, setYoutubeUrl] = useState(!data? "" : data.fetchBoard.youtubeUrl)
    const [zipcode, setZipcode] = useState(!data? "" : data.fetchBoard.zipcode)
    const [address, setAddress] = useState(!data? "" : data.fetchBoard.address)
    const [addressDetail, setAddressDetail] = useState(!data? "" : data.fetchBoard.addressDetail)
    const [images, setImages] = useState<ImageUrlArray>(!data? [undefined,undefined,undefined] : data.fetchBoard.images)


    
    // 1-2. 게시글 생성 API 요청 함수
    const [createBoard] = useMutation(CREATE_BOARD)

    // 1-3. 게시글 수정 API 요청 함수
    const [updateBoard] = useMutation(UPDATE_BOARD)

    // 1-4. 이미지 업로드 API 요청 함수
    const [uploadFile] = useMutation(UPLOAD_FILE);


    // 2. 필수 작성 요소 작성 여부에 따른 버튼 활성화
    const [isValid, setIsValid] = useState(true)

    // 3. Change Event에 따른 유효성 검증
    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        
        setWriter(value)
    
        if(value && password && title && contents){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        setPassword(value)
    
        if(writer && value && title && contents){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setTitle(value)
    
        if(writer && password && value && contents){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }
      const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        setContents(value)
    
        if(writer && password && title && value){
          setIsValid(false)
        } else{
          setIsValid(true)
        }
      }

      // 3-1. 필수 요소 아닌 ChangeEvent 추가
      const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setYoutubeUrl(value)
      }

      const onChangeBoardAddress = (event: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        switch(id){
          case "zipcode": {setZipcode(value);break;}
          case "address": {setAddress(value);break;}
          case "addressDetail": {setAddressDetail(value);break;}
        }
      }

      const onChangeFile = async(event: ChangeEvent<HTMLInputElement>) => {
        const {id, files} = event.target;
        const file = files?.[0];

        const handleSetImageUrl = (index: number, url: string) => {
          setImages(
            prevUrls => {
              const NewUrls = [...prevUrls]
              console.log(NewUrls)
              NewUrls[index] = url
              return NewUrls
            }
          )
          console.log(images)
        }
        
        const result = await uploadFile({
          variables:{
            file
          }
        }
      );

        const fileUrl = result.data?.uploadFile.url

        switch(id){
          case "0":{handleSetImageUrl(Number(id), fileUrl);break;}
          case "1":{handleSetImageUrl(Number(id), fileUrl);break;}
          case "2":{handleSetImageUrl(Number(id), fileUrl);break;}
        }
        
      }

      // 4. 등록하기 버튼
      const onClickSubmit = async () => {
        try{
          const result = await createBoard({
            variables:{
              createBoardInput:{
                writer: writer,
                password: password,
                title: title,
                contents: contents,
                youtubeUrl: youtubeUrl,
                boardAddress: {
                  zipcode: zipcode,
                  address: address,
                  addressDetail: addressDetail,
                },
                images: images.filter(Boolean),
              }
            }
          })
          console.log("🚀 ~ onClickBtn ~ result:", result)
          const boardId = result.data.createBoard._id
          router.push(
            `/boards/${boardId}`
          )

        } catch (error) {
          alert("에러가 발생하였습니다. 다시 시도해 주세요.");
        } 
      }

      // 5. 수정하기 버튼
      // 수정 버튼 클릭 시 updateBoard 진행
      const onClickUpdate = async() => {
              // 5-1. 수정된 사항만 업데이트 될 수 있도록 variables 설정
      const updateBoardInput ={}
      if (title!==data?.fetchBoard.title) updateBoardInput.title = title;
      if (contents!==data?.fetchBoard.contents) updateBoardInput.contents = contents;
      if (youtubeUrl!==data?.fetchBoard.youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl;
      if (zipcode !== data.fetchBoard.zipcode || address!==data.fetchBoard.address || addressDetail!==data.fetchBoard.addressDetail){
        updateBoardInput.boardAddress = {};
        if (zipcode!==data.fetchBoard.zipcode) updateBoardInput.boardAddress.zipcode = zipcode;
        if (address!==data.fetchBoard.address) updateBoardInput.boardAddress.address = address;
        if (addressDetail!==data.fetchBoard.addressDetail) updateBoardInput.boardAddress.addressDetail = addressDetail;
      }
      if (images.filter(Boolean)) {
        updateBoardInput.images = images.filter(Boolean);
        console.log(updateBoardInput)
      }
      console.log(updateBoardInput)
        try{
          const password = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateBoardInput,
              password: password,
              boardId: params.boardId,
            },
            refetchQueries: [
              {
                query: FETCH_BOARD,
                variables: { boardId: params.boardId }
              },
            ]
          })
          console.log(result)
          router.push(
            `/boards/${result?.data.updateBoard._id}`
          )
        } catch (error) {
          alert(error.message)

        }
        
      }

      // 6. 취소 버튼 클릭 시 뒤로 가기
      const onClickCancel = () => {
        router.back()
      }

    return(
        <div className={styles.Formfield}>
            {/* 폼 타이틀 */}
            <div className={styles.postForm__title}>게시물 등록</div>
            {/* 작성자 그룹 */}
            <div className={styles.postForm__writer__group}>
                <Inputfield type='text' label='작성자' required placeholder='작성자 명을 입력해 주세요.' defaultValue={data?.fetchBoard.writer} isEdit={isEdit} onChange={onChangeWriter}></Inputfield>
                <Inputfield type='password' label='비밀번호' required placeholder='비밀번호를 입력해 주세요.' isEdit={isEdit} onChange={onChangePassword}></Inputfield>
            </div>
            <hr />
            <Inputfield type='text' label='제목'required placeholder='제목을 입력해 주세요.' defaultValue={data?.fetchBoard.title} onChange={onChangeTitle} ></Inputfield>
            <hr/>
            <Textareafield label='내용' required placeholder='내용을 입력해 주세요.' defaultValue={data?.fetchBoard.contents} onChange={onChangeContents} ></Textareafield>
            <hr />
            <InputBoardAddress placeholder='주소를 입력해 주세요.' placeholder_2='상세주소' defaultValue={data?.fetchBoard} onChange={onChangeBoardAddress}></InputBoardAddress>
            <hr />
            <Inputfield type='string' label='유튜브 링크' placeholder='링크를 입력해 주세요.' defaultValue={data?.fetchBoard.youtubeUrl} onChange={onChangeYoutubeUrl}></Inputfield>
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