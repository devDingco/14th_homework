"use client";


import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {ChangeEvent} from 'react';
import { CREATE_BOARD, FETCH_BOARD, UPDATE_BOARD } from "./queres";
import { IMyvariables,Idata } from "./types";
import { on } from "events";
import { FetchBoardQuery } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";


export default function useBoardsWrite() {

  const [zipcode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [writer, setWriter] = useState<string>("")
      const [password, setPassword] = useState<string>("")
      const [title, setTitle] = useState<string>("")
      const [contents, setContents] = useState<string>("")
  
      const [errorWriter, setErrorWriter] = useState<string>("")
      const [errorPassword, setErrorPassword] = useState<string>("")
      const [errorTitle, setErrorTitle] = useState<string>("")
      const [errorContents, setErrorContents] = useState<string>("")
  
      const [isActive, setIsActive] = useState<boolean>(false)
      
      const router = useRouter();
      const [createBoard] = useMutation(CREATE_BOARD);
      const [updateBoard] = useMutation(UPDATE_BOARD);
      const { boardId } = useParams()

      const onClickMoveList = () =>{
        router.push("/boards")
      }

    
      const handleComplete = (data : Idata) => {
    setZonecode(data.zonecode); 
    setAddress(data.address);   
    setIsModalOpen((prev) => !prev);      
  };
      const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
     const onChangeYoutubeUrl = (e:ChangeEvent<HTMLInputElement>) =>{
       setYoutubeUrl(e.target.value)
  }

      const onChangeAddressDetail = (e:ChangeEvent<HTMLInputElement>) =>{
       setAddressDetail(e.target.value)
  }
      const onChangeWriter = (event:ChangeEvent<HTMLInputElement>) => {
          setWriter(event.target.value)
          if(event.target.value && password && title && contents){
            setIsActive(true)
          }else{setIsActive(false)}
      }
      const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value)
          if(writer && event.target.value && title && contents){
            setIsActive(true)
          }else{setIsActive(false)}
      }
      const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value)
          if(writer && password && event.target.value && contents){
            setIsActive(true)
          }else{setIsActive(false)}
      }
      const onChangeContents = (event:ChangeEvent<HTMLInputElement>) => {
          setContents(event.target.value)
          if(writer && password && title && event.target.value){
            setIsActive(true)
          }else{setIsActive(false)}
      }
      const validation = () => {
          if (writer === "") setErrorWriter("필수입력사항입니다");
          else setErrorWriter("");

          if (password === "") setErrorPassword("필수입력사항입니다");
          else setErrorPassword("");
        
          if (title === "") setErrorTitle("필수입력사항입니다");
          else setErrorTitle("");
        
          if (contents === "") setErrorContents("필수입력사항입니다");
          else setErrorContents("");
  
          if (writer !=="" && password !=="" && title !=="" && contents !=="" )
              alert("게시글이 등록되었습니다")
        };

  //이벤트 핸들러
  const onClickSubmit = async () => {
    const result = await createBoard({
  variables: {
    createBoardInput: {
      writer,
      password,
      title,
      contents,
      youtubeUrl,
      boardAddress:{
        zipcode,
        address,
        addressDetail,
      }
    },
  },
});

    console.log(result);
    router.push(
      `/boards/${result.data.createBoard._id}`
    );
  };

  const onClickUpdate = async () => {
    const checkPassword = prompt("비밀번호를 입력해주세요.");
    if (!checkPassword) return;

   
    const myvariables:IMyvariables = {
  boardId: String(boardId),
  password: checkPassword,
  updateBoardInput: {},
  };

if (title !== "") {
  myvariables.updateBoardInput.title = title;
}
if (contents !== "") {
  myvariables.updateBoardInput.contents = contents;
}
if (youtubeUrl !== "") {
  myvariables.updateBoardInput.youtubeUrl = youtubeUrl;
}
if (address !== "") {
  myvariables.updateBoardInput.boardAddress= {
    zipcode,
    address,
    addressDetail,
  };
}


try {
  const result = await updateBoard({
    variables: myvariables
  });
  alert("게시글이 수정되었습니다");
  router.push(`/boards/${result.data.updateBoard._id}`);
} catch (error: unknown) {
  if (error instanceof ApolloError) {
    if (error.graphQLErrors?.[0]) {
      alert(error.graphQLErrors[0].message);
    } else {
      alert("알 수 없는 에러가 발생했습니다.");
    }
  } else {
    alert("알 수 없는 에러가 발생했습니다.");
  }
}
   
    
  };

  return{
    onChangeContents,
    onChangePassword,
    onChangeTitle,
    onChangeWriter,
    onClickSubmit,
    onClickUpdate,
    validation,
    isActive,
    errorContents,
    errorPassword,
    errorTitle,
    errorWriter,
    writer,
    password,
    title,
    contents,
    onClickMoveList,
    onToggleModal,
    handleComplete,
    isModalOpen,
    address,
    detailAddress,
    zipcode,
    setZonecode,
    setAddress,
    setDetailAddress,
    onChangeAddressDetail,
    addressDetail,
    onChangeYoutubeUrl
  
  }
}
