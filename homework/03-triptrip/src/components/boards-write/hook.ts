"use client";

import { useMutation, useQuery } from "@apollo/client"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD, UPLOAD_FILE,  } from "./queries";
import { IDaumPostcodeData, IUseBoardsWriteProps } from "./types";
import { CreateBoardDocument, CreateBoardMutation, CreateBoardMutationVariables, FetchBoardDocument, UpdateBoardDocument, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/graphql/graphql";
import { Modal } from "antd";
import { checkValidationFile } from "@/commons/libraries/image-validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchema } from "./schema";
import z from "zod";
  

export default function useBoardsWrite(props: IUseBoardsWriteProps) {

    const router = useRouter()
    const params = useParams()
    const boardId = String(params.boardId) 

    const schema = getSchema(props.isEdit);
    type SchemaType = z.infer<typeof schema>;

    // ✅ React Hook Form 설정
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        formState: { errors, isValid },
        reset
      } = useForm<SchemaType>({
        resolver: zodResolver(getSchema(props.isEdit)),
        mode: "onChange",
        defaultValues: {
          writer: "" ,
          password: "",
          title: "",
          contents: "",
          youtubeUrl: "",
          zipcode: "",
          address: "",
          addressDetail: "",
        },
      });

    // ✅ 이미지 업로드 관련
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

    // 이미지 삭제 
    const onClickDeleteImage = (idx: number) => {
        setImageUrls((prev) => {
            const newUrls = [...prev];
            newUrls[idx] = ""; // 해당 위치를 빈 문자열로 교체
            return newUrls;
        })

    }  
      

    // ✅ 게시글 데이터 불러오기 (수정 시)
    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId },
        skip: !boardId || !props.isEdit,
    });

    useEffect(() => {
        if(props.isEdit && data?.fetchBoard) {
            reset({
                writer: data.fetchBoard.writer ?? "",
                title: data.fetchBoard.title ?? "",
                contents: data.fetchBoard.contents ?? "",
                youtubeUrl: data.fetchBoard.youtubeUrl ?? "",
                zipcode: data.fetchBoard.boardAddress?.zipcode ?? "",
                address: data.fetchBoard.boardAddress?.address ?? "",
                addressDetail: data.fetchBoard.boardAddress?.addressDetail ?? "",
              });

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
    }, [props.isEdit, data, setValue, reset])   

    
    // 우편번호 검색 모달
    const [isModalOpen, setIsModalOpen ] = useState(false)

    const onToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };
    
      const handleComplete = (data: IDaumPostcodeData) => {
        console.log(data)
        setValue("zipcode", data.zonecode);
        setValue("address", data.address);
        onToggleModal();
    };

    // 등록하기
    const [createBoard] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument)     

    const onSubmit: SubmitHandler<SchemaType> = async (formData) => {
        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                      writer: formData.writer || "",
                      password: formData.password || "",
                      title: formData.title,
                      contents: formData.contents,
                      youtubeUrl: formData.youtubeUrl || "",
                      images: imageUrls,
                      boardAddress: {
                        zipcode: formData.zipcode || "",
                        address: formData.address || "",
                        addressDetail: formData.addressDetail || "",
                      },
                    },
                  },
            })
            console.log(result.data?.createBoard);


            
            Modal.success({ content: "게시글 등록이 완료되었습니다." })
            router.push( `/boards/${result.data?.createBoard._id}`)
            }  catch(error){
            Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
        } 
    } 
    
    // 수정하기
    const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument)

    const onUpdate = async() => {
        const enteredPassword = prompt("글을 입력할 때 설정한 비밀번호를 입력해주세요.")
        if(!enteredPassword) return

        const values = getValues();

        try {

            const result = await updateBoard({
                variables: {
                  boardId,
                  password: enteredPassword,
                  updateBoardInput: {
                    title: values.title,
                    contents: values.contents,
                    youtubeUrl: values.youtubeUrl,
                    images: imageUrls,
                    boardAddress: {
                      zipcode: values.zipcode,
                      address: values.address,
                      addressDetail: values.addressDetail,
                    },
                  },
                },
                refetchQueries: [{ query: FETCH_BOARD, variables: { boardId } }],
            });

            Modal.success({ content: "게시글이 수정되었습니다." });
            router.push(`/boards/${result.data?.updateBoard._id}`);
        } catch (error) {
            Modal.error({ content: "수정 중 에러가 발생했습니다." });
        }
                 
 
    }    

    // 취소버튼
    const onCancel = () => {
        if (props.isEdit) {
          // 수정 페이지면 해당 게시글 상세페이지로
          router.push(`/boards/${params.boardId}`);
        } else {
          // 등록 페이지면 게시글 목록으로
          router.push("/boards");
        }
    };

    return {        
        register,
        handleSubmit,
        control,
        formState: { errors, isValid }, 
        onSubmit,
        onUpdate,
        onToggleModal,
        handleComplete,
        isModalOpen,
        onClickImage,
        onChangeFile,
        onClickDeleteImage,
        imageUrls,
        fileRef,
        onCancel,
    };
  
}
