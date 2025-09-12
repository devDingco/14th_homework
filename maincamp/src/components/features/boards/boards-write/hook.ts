"use client"

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { ImageUrlArray, IUpdateBoardInput } from "./types";
import { GraphQLError } from "graphql";
import { CreateBoardDocument, FetchBoardDocument, UpdateBoardDocument, UploadFileDocument } from "@/commons/graphql/graphql";

export default function useBoardsWrite({data}:{data?: any}){
    
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
        const [zipcode, setZipcode] = useState(!data? "" : data.fetchBoard.boardAddress?.zipcode)
        const [address, setAddress] = useState(!data? "" : data.fetchBoard.boardAddress?.address)
        const [addressDetail, setAddressDetail] = useState(!data? "" : data.fetchBoard.boardAddress?.addressDetail)
        const [images, setImages] = useState<ImageUrlArray>(!data?[undefined, undefined, undefined]:data?.fetchBoard.images )
        
        // 1-2. 게시글 생성 API 요청 함수
        const [createBoard] = useMutation(CreateBoardDocument)
    
        // 1-3. 게시글 수정 API 요청 함수
        const [updateBoard] = useMutation(UpdateBoardDocument)
    
        // 1-4. 이미지 업로드 API 요청 함수
        const [uploadFile] = useMutation(UploadFileDocument);
    
    
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
          // (1) YoutubeUrl
          const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value
            setYoutubeUrl(value)
          }

          // (2) 주소 입력 API 추가
          const [isModalOpen, setIsModalOpen] = useState(false);

          const onToggleModal = () => {
            // console.log(isModalOpen)
            setIsModalOpen((prev) => !prev)
          }

          const onChangeBoardAddress = (event: ChangeEvent<HTMLInputElement>) => {
            const {id, value} = event.target;
            switch(id){
              case "zipcode": {setZipcode(value);break;}
              case "address": {setAddress(value);break;}
              case "addressDetail": {setAddressDetail(value);break;}
            }
          }

          const boardAddress = {zipcode: zipcode, address: address, addressDetail: addressDetail}

          const handleComplete = (data) => {
            console.log(data); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
            setZipcode(data.zonecode)
            setAddress(data.address)
            setAddressDetail(data.buildingName)
            onToggleModal();
          };
          
          // (3) 파일 업로드 추가
          const onChangeFile = async(event: ChangeEvent<HTMLInputElement>) => {
            const {id, files} = event.target;
            const file = files?.[0];
    
            const handleSetImageUrl = (index: number, url: string|undefined) => {
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
                    images: images.filter(Boolean) as string[],
                  }
                }
              })
              console.log("🚀 ~ onClickBtn ~ result:", result)
              const boardId = result.data?.createBoard._id
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
          const updateBoardInput: IUpdateBoardInput ={}
          if (title!==data.fetchBoard.title && title.length>0) updateBoardInput.title = title;
          if (contents!==data.fetchBoard.contents && title.length>0) updateBoardInput.contents = contents;
          if (youtubeUrl!==data.fetchBoard.youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl;
          if (boardAddress!==data.fetchBoard.boardAddress){
            updateBoardInput.boardAddress = {
                zipcode: zipcode,
                address: address,
                addressDetail: addressDetail
            };
          }
          if (images.filter(Boolean)) {
            updateBoardInput.images = images.filter(Boolean) as string[];
            console.log(updateBoardInput)
          }
          console.log(updateBoardInput)
          console.log(params.boardId);
          
            try{
              const password = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")
              console.log(password);
              
              const result = await updateBoard({
                variables: {
                  updateBoardInput,
                  password,
                  boardId: params.boardId as string,
                },
                refetchQueries: [
                  {
                    query: FetchBoardDocument,
                    variables: { boardId: params.boardId }
                  },
                ]
              })
              console.log(result)
              router.push(
                `/boards/${result.data?.updateBoard._id}`
              )
            } catch (error) {
              const err = error as GraphQLError
              console.log(err.message);
              
              alert(err.message)
            }
            
          }
    
          // 6. 취소 버튼 클릭 시 뒤로 가기
          const onClickCancel = () => {
            router.back()
          }
    
    return{
        onChangeWriter,
        onChangePassword,
        onChangeTitle,
        onChangeContents,
        onChangeBoardAddress,
        onChangeYoutubeUrl,
        onChangeFile,
        onClickCancel,
        isValid,
        onClickUpdate,
        onClickSubmit,
        images: images,
        isModalOpen,
        onToggleModal,
        handleComplete,
        setZipcode,
        setAddress,
        setAddressDetail,
        boardAddress,

    }
}