"use client";

import { useMutation, useQuery } from "@apollo/client"
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD, UPLOAD_FILE,  } from "./queries";
import { IDaumPostcodeData, IMyvariables, IUseBoardsWriteProps } from "./types";
import { CreateBoardDocument, CreateBoardMutation, CreateBoardMutationVariables, FetchBoardDocument, UpdateBoardDocument, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/graphql/graphql";
import { Modal } from "antd";
import { checkValidationFile } from "@/commons/libraries/image-validation";



export default function useBoardsWrite(props: IUseBoardsWriteProps) {

    const [imageUrls, setImageUrls] =useState<string[]>(["", "", ""])
    const fileRef = useRef<(HTMLInputElement | null)[]>([]);
    const [uploadFile] = useMutation(UPLOAD_FILE)

    const onChangeFile = async(event: ChangeEvent<HTMLInputElement>, idx: number) => {
        const file= event.target.files?.[0]
        console.log(file)

        const isValid = checkValidationFile(file)
        if(!isValid) return
        if(!file) return;

        const result = await uploadFile({ variables: { file } })
        console.log(result.data?.uploadFile.url)        
        // setImageUrls(result.data?.uploadFile.url)

        setImageUrls((prev) => {
            const newUrls = [...prev];
            newUrls[idx] = result.data?.uploadFile.url || "";
            return newUrls;
        })
    }

    const onClickImage = (idx: number) => {
        fileRef.current[idx]?.click()
        
    }

    const onClickDeleteImage = (idx: number) => {
        setImageUrls((prev) => {
            const newUrls = [...prev];
            newUrls[idx] = ""; // 해당 위치를 빈 문자열로 교체
            return newUrls;
        })

    }

    const router = useRouter()
    const params = useParams()
    const boardId = String(params.boardId) 
    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId },
        skip: !boardId || !props.isEdit
    })
      

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

             // ✅ 기존 이미지 불러오기
            if (data.fetchBoard.images && data.fetchBoard.images.length > 0) {
                setImageUrls((prev) => {
                    const newUrls = [...prev];
                    (data.fetchBoard.images as string[]).forEach((url, idx) => {
                        newUrls[idx] = url || "";
                    });
                    return newUrls;
                });
            }
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
                    images: imageUrls  
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
                    },
                    images: imageUrls,   // 반드시 포함
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
        onClickImage,
        onChangeFile,
        onClickDeleteImage,  
        imageUrls,
        fileRef
    };
  
}
