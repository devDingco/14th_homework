"use client";

import {  useMutation, useQuery } from "@apollo/client"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD,  } from "./queries";
import { IDaumPostcodeData, IMyvariables, IUseBoardsWriteProps } from "./types";
import { CreateBoardDocument, CreateBoardMutation, CreateBoardMutationVariables, FetchBoardDocument, UpdateBoardDocument, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/graphql/graphql";
import { Modal } from "antd";

export default function useBoardsWrite(props: IUseBoardsWriteProps) {
    const router = useRouter()
    const params = useParams()
    const boardId = String(params.boardId) 
    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId },
        skip: !boardId || !props.isEdit
    })
  
    // const [writer, setWriter] = useState(props.isEdit ? data?.fetchBoard.writer : "");
    // const [password, setPassword] = useState("");
    // const [title, setTitle] = useState(props.isEdit ? data?.fetchBoard.title : "");
    // const [contents, setContents] = useState(props.isEdit ? data?.fetchBoard.contents : "");


    // const boardAddress = props.isEdit && data?.fetchBoard?.boardAddress 
    //     ? data.fetchBoard.boardAddress 
    //     : { zipcode: "", address: "", addressDetail: "" };

    // const [zipcode, setZipcode] = useState(boardAddress.zipcode);
    // const [address, setAddress] = useState(boardAddress.address);
    // const [addressDetail, setAddressDetail] = useState(boardAddress.addressDetail);

    // ✅ 항상 빈 문자열로 state 초기화
    const [inputs, setInputs] = useState({
        writer: "",
        title: "",
        contents: "",
    })

    const [password, setPassword] = useState(""); // 항상 선언
    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");

    useEffect(() => {
        if(props.isEdit && data?.fetchBoard) {
            setInputs({
                writer: data.fetchBoard.writer ?? "",
                title: data.fetchBoard.title ?? "",
                contents: data.fetchBoard.contents ?? "",
            })

            // 개별 state
            setZipcode(data.fetchBoard.boardAddress?.zipcode ?? "");
            setAddress(data.fetchBoard.boardAddress?.address ?? "");
            setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
            setYoutubeUrl(data.fetchBoard.youtubeUrl ?? "");
        }
    }, [props.isEdit, data])

    // 입력값/비밀번호 변경 시 즉시 활성화 상태 재계산
    useEffect(() => {
        if (props.isEdit) {
            setIsActive(inputs.title !== "" && inputs.contents !== "")
        } else {
            setIsActive(
                inputs.writer !== "" &&
                password !== "" &&
                inputs.title !== "" &&
                inputs.contents !== ""
            )
        }
    }, [inputs, password, props.isEdit])

    // const [writer, setWriter] = useState("");   
    // const [title, setTitle] = useState("");
    // const [contents, setContents] = useState("");




    // 인풋에 표시될 값 (useEffect 없이 안전하게)
    // const writerValue = props.isEdit && data?.fetchBoard?.writer ? data.fetchBoard.writer : writer;
    // const titleValue = props.isEdit && data?.fetchBoard?.title ? (title || data.fetchBoard.title) : title;
    // const contentsValue = props.isEdit && data?.fetchBoard?.contents ? (contents || data.fetchBoard.contents) : contents;

    // const writerValue = props.isEdit
    //     ? (writer !== "" ? writer : data?.fetchBoard?.writer ?? "")
    //     : writer;

    // const titleValue = props.isEdit
    //     ? (title !== "" ? title : data?.fetchBoard?.title ?? "")
    //     : title;

    // const contentsValue = props.isEdit
    //     ? (contents !== "" ? contents : data?.fetchBoard?.contents ?? "")
    //     : contents;

    // const zipcodeValue = props.isEdit
    //     ? (zipcode !== "" ? zipcode : data?.fetchBoard?.boardAddress?.zipcode ?? "")
    //     : zipcode;

    // const addressValue = props.isEdit
    //     ? (address !== "" ? address : data?.fetchBoard?.boardAddress?.address ?? "")
    //     : address;

    // const addressDetailValue = props.isEdit
    //     ? (addressDetail !== "" ? addressDetail : data?.fetchBoard?.boardAddress?.addressDetail ?? "")
    //     : addressDetail;

    // // 수정 모드일 때 값 세팅
    // const youtubeUrlValue = props.isEdit
    //     ? (youtubeUrl !== "" ? youtubeUrl : data?.fetchBoard?.youtubeUrl ?? "")
    //     : youtubeUrl;

     
    // && 연산자 사용 시:
    // props.isEdit && data?.fetchBoard.boardAddress.address
    // 두 조건이 모두 true일 때만 값이 나옴 → 즉, 수정 모드이고 데이터가 존재할 때만 기존 주소 보여주기
    // 조건이 하나라도 false면 아무 값도 안 나오거나 false가 됨

    // ? : 삼항 연산자 사용 시:
    // props.isEdit ? data?.fetchBoard.boardAddress.address : ""
    // isEdit만 확인
    // true면 데이터, false면 빈 문자열
    // 데이터가 없으면 undefined가 나올 수 있음 → 이 부분에서 ?.를 같이 써서 안전하게 접근

    // 수정 페이지에서 데이터가 있어야 기존 데이터 보여주기 → &&

    // 단순 조건 분기 (true면 값, false면 빈 문자열) → ? :

    const [inputError, setInputError] = useState("");
    // //useState의 초기값을 props.isEdit에 따라 조건부로 설정
    const [isActive, setIsActive] =  useState(props.isEdit ? true : false);

    const [isModalOpen, setIsModalOpen ] = useState(false)

    const onToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };
    
      const handleComplete = (data: IDaumPostcodeData) => {
        console.log(data)
        setZipcode(data.zonecode);
        setAddress(data.address);
        onToggleModal();
    };

    // // 등록 페이지와 수정 페이지의 isActive 조건 분리
    const onChangeInputs = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {                
        const { id, value } = event.target;
        setInputs((prev) => ({          
            ...prev,
            [id] : value,
        }))
    }

    // const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    //     setWriter(event.target.value);
    //     setIsActive(props.isEdit ? (titleValue && contentsValue) : (event.target.value && password && titleValue && contentsValue));
    // };
    // const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.target.value);
    //     setIsActive(props.isEdit ? (event.target.value && contentsValue) : (writer && password && event.target.value && contentsValue));
    // };
    // const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //     setContents(event.target.value);
    //     setIsActive(props.isEdit ? (titleValue && event.target.value) : (writer && password && titleValue && event.target.value));
    // };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);       
    };

    const onChangeZipcode = (event: ChangeEvent<HTMLInputElement>) => {
        setZipcode(event.target.value);
    };
    const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };
    const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
        setAddressDetail(event.target.value);
    };



    const onChangeYoutubeUrl = (value: string) => {
        setYoutubeUrl(value);
      };

    const [createBoard] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument) 
    const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument)

    const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                    writer: inputs.writer,
                    password: password,
                    title: inputs.title,
                    contents: inputs.contents,
                    boardAddress: {
                        zipcode: zipcode,
                        address: address,
                        addressDetail: addressDetail,
                    },         
                    youtubeUrl, 
                    images: []
                    } ,
                },
            })
            console.log(result.data?.createBoard);

            if (result?.data?.createBoard) {
            setInputError("");
            Modal.success({ content: "게시글 등록이 완료되었습니다." })
            } else {
            Modal.error({ content: "필수입력 사항입니다." })
            }

            router.push(
            `/boards/${result.data?.createBoard._id}`
            )
        } catch(error){
            Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })

        } finally {

        }
    }    


    const onClickUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
        try {

            const enteredPassword = prompt("글을 입력할 때 설정한 비밀번호를 입력해주세요.")
            if(!enteredPassword) return
            
            
            const myvariables: IMyvariables = {
                updateBoardInput: {
                    boardAddress: {
                        zipcode: zipcode,
                        address: address,
                        addressDetail: addressDetail,
                    }
                } ,
                boardId: boardId,
                password: enteredPassword, 
            }

            if(inputs.title !== "") myvariables.updateBoardInput.title = inputs.title
            if(inputs.contents !=="") myvariables.updateBoardInput.contents = inputs.contents
          
            if(data?.fetchBoard.boardAddress) {
                myvariables.updateBoardInput.boardAddress = {
                    zipcode: data.fetchBoard.boardAddress.zipcode,
                    address: data.fetchBoard.boardAddress.address,
                    addressDetail:
                        addressDetail || data.fetchBoard.boardAddress.addressDetail,
                }
            }

            if (youtubeUrl !== "") myvariables.updateBoardInput.youtubeUrl = youtubeUrl;

            const result = await updateBoard({
                variables: {
                    updateBoardInput: myvariables.updateBoardInput,
                    boardId: myvariables.boardId,
                    password: enteredPassword,
                },
                refetchQueries: [
                    {query: FETCH_BOARD, variables: {boardId }},
                ]                                
            })

            console.log(result.errors)

            if (result?.data?.updateBoard) {
                setInputError(""); // 성공하면 에러 메시지 초기화
                Modal.success({ content:"게시글이 수정되었습니다!" })

                router.push(`/boards/${result.data.updateBoard._id}`)
            }

        } catch (error: unknown) {
            // 1. error가 객체인지 확인
            if (typeof error === "object" && error !== null) {
              // 2. graphQLErrors 속성이 있는지 확인
              const maybeGraphQLErrors = (error as { graphQLErrors?: { message: string }[] }).graphQLErrors;
          
              // 3.GraphQL 오류가 있으면 메시지 확인
              if (Array.isArray(maybeGraphQLErrors) && maybeGraphQLErrors.length > 0) {
                if (maybeGraphQLErrors[0].message.includes("비밀번호")) {
                  Modal.error({ content: "비밀번호가 틀렸습니다." })
                  return;
                } else {
                  alert(maybeGraphQLErrors[0].message);
                  return;
                }
              }
            }
          
            // 4. 그 외의 경우 (네트워크 오류 등)
            Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
            
            console.error(error);
        }
          
        // catch(error: unknown){
        //     if(error.graphQLErrors?.[0]?.message.includes("비밀번호")) {
        //         alert("비밀번호가 틀렸습니다.")
        //     } else {
        //         alert("에러가 발생하였습니다. 다시 시도해 주세요.")
        //     }
        // }
    }    

    // //  data가 로드되지 않았을 경우 null을 반환하여 렌더링을 막음
    // if (props.isEdit && !data) return null;

    return {        
        password,
        inputs,
        zipcode,
        address,
        addressDetail,
        youtubeUrl,
        inputError,
        isActive,
        isModalOpen,
        onToggleModal,
        handleComplete,
        onChangePassword,
        onChangeZipcode,
        onChangeAddress,
        onChangeAddressDetail,
        onChangeYoutubeUrl,
        onClickSubmit,
        onClickUpdate,
        onChangeInputs,
    };
  
}
