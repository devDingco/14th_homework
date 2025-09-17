"use client";


import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {ChangeEvent} from 'react';
import { CREATE_BOARD, FETCH_BOARD, UPDATE_BOARD } from "./queres";
import { IMyvariables,Idata } from "./types";
import { on } from "events";
import { FetchBoardQuery } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { Modal } from "antd";


export default function useBoardsWrite() {

  const [zipcode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [password, setPassword] = useState<string>("")
      // const [writer, setWriter] = useState<string>("")
      // const [title, setTitle] = useState<string>("")
      // const [contents, setContents] = useState<string>("")

      const [inputs, setInputs] = useState({
        writer: "",
        title: "",
        contents: "",
      })
      const { writer, title, contents } = inputs;
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
  const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
      // if(writer && event.target.value && title && contents){
      //   setIsActive(true)
      // }else{setIsActive(false)}
  }
  // const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
//   const newPassword = event.target.value;
//   setPassword(newPassword);

//   if(writer && title && contents && newPassword){
//     setIsActive(true);
//   } else {
//     setIsActive(false);
//   }
// }
  useEffect(()=>{
    if(inputs.writer && inputs.title && inputs.contents && password){
      setIsActive(true)
    }else{setIsActive(false)
    }
  },[inputs,password])
  
  const onChangeInputs = (event:ChangeEvent<HTMLInputElement>) =>{
    setInputs({
        ...inputs,
        [event.target.id]: event.target.value
      })
    };
  
  //   if(newInputs.contents && newInputs.title && newInputs.writer && password){
  //     setIsActive(true)
  //     }else{setIsActive(false)
  //   }
  //   }
  
      // const onChangeWriter = (event:ChangeEvent<HTMLInputElement>) => {
      //     setWriter(event.target.value)
      //     if(event.target.value && password && title && contents){
      //       setIsActive(true)
      //     }else{setIsActive(false)}
      // }
      // const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
      //     setTitle(event.target.value)
      //     if(writer && password && event.target.value && contents){
      //       setIsActive(true)
      //     }else{setIsActive(false)}
      // }
      // const onChangeContents = (event:ChangeEvent<HTMLInputElement>) => {
      //     setContents(event.target.value)
      //     if(writer && password && title && event.target.value){
      //       setIsActive(true)
      //     }else{setIsActive(false)}
      // }
      const validation = () => {
          if (writer === "") setErrorWriter("필수입력사항입니다");
          else setErrorWriter("");

          if (password === "") setErrorPassword("필수입력사항입니다");
          else setErrorPassword("");
        
          if (title === "") setErrorTitle("필수입력사항입니다");
          else setErrorTitle("");
        
          if (contents === "") setErrorContents("필수입력사항입니다");
          else setErrorContents("");

        };

  //이벤트 핸들러
  const onClickSubmit = async () => {
    if (writer !=="" && password !=="" && title !=="" && contents !=="" ){
      Modal.success({ content: "게시글등록에 성공했습니다" });
    }else return
      
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
  // alert("게시글이 수정되었습니다");
  Modal.success({ content: "게시글이 수정되었습니다" });
  router.push(`/boards/${result.data.updateBoard._id}`);
} catch (error: unknown) {
  if (error instanceof ApolloError) {
    if (error.graphQLErrors?.[0]) {
      // alert(error.graphQLErrors[0].message);
      Modal.error({ content: error.graphQLErrors[0].message });
    } else {
      Modal.error({ content: "알 수 없는 에러가 발생했습니다" });
    }
  } else {
    Modal.error({ content: "알 수 없는 에러가 발생했습니다" });
  }
}
   
    
  };

  return{
    onChangeInputs,
    onChangePassword,
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
