"use client"

import { useParams, useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"

import { useMutation, useQuery } from "@apollo/client"
import { CreateBoardDocument, CreateBoardMutation, CreateBoardMutationVariables, UpdateBoardDocument, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/graphql/graphql"
import { IMyvariables } from "./types"
import { FETCH_BOARD } from "../boards-detail/detail/queries"
import { mygraphql, mygraphUpdateql, UPLOAD_FILE } from "./queries"
import { checkVaildationFile } from "@/commons/validation-file"
import { FETCH_USER_LOGGEDIN } from "@/commons/layout/navigation"
import { useForm } from "react-hook-form"
import z from "zod"
import { message } from "antd"
import {zodResolver} from "@hookform/resolvers/zod"


const schema = z.object({
    writer: z.string().min(1, {message:"작성자를 입력해주세요."}),
    password: z.string().min(8, {message:"비밀번호는 8자 이상 입력해주세요"}).max(16, {message:"비밀번호는 16자 이하로 입력해주세요"}),
    title: z.string().min(2, {message:"제목은 2자 이상 입력해주세요"}),
    contents:z.string().min(1, {message:"내용을 입력해주세요"}),
    zipcode: z.string(),
    address: z.string(),
    addressDetail: z.string(),
    youtubeUrl: z.string()

})


export default function useBoardsWrite(isEdit) {

    const { register, handleSubmit, setValue, formState } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const router = useRouter()

    // const { data } = useQuery(FETCH_USER_LOGGEDIN);
 
    const [isModalOpen, setIsModalOpen] = useState(false);
  

    const [uploadFile] = useMutation(UPLOAD_FILE);
    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const fileRef = useRef(null);

    const params = useParams();
    const boardId = params.boardId as string;
    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId },
        skip: !isEdit,
    });
    // const param = useParams()

    const newImages = isEdit
        ? (data?.fetchBoard?.images || []).map((img, index) => ({
            src: img,
            alt: `이미지 ${index + 1}`, // alt 텍스트에 인덱스 + 1 추가
        }))
        : [
            { src: "", alt: "이미지 1" },
            { src: "", alt: "이미지 2" },
            { src: "", alt: "이미지 3" },
        ];

    const [images, setImages] = useState(newImages);


    // 새로고침해도 초기값 유지하기 -> 다음주에 배워요.
    useEffect(() => {
        if (isEdit && data?.fetchBoard) {
            console.log("data?.fetchboard;::", data?.fetchBoard);
            const newImages = (data?.fetchBoard?.images || []).map((img, index) => ({
                src: img,
                alt: `이미지 ${index + 1}`,
            }));
            setValue("writer", data.fetchBoard.writer || "");
            setValue("title", data.fetchBoard.title || "");
            setValue("contents", data.fetchBoard.contents || "");
            setValue("zipcode", data.fetchBoard.boardAddress?.zipcode || "");
            setValue("address", data.fetchBoard.boardAddress?.address || "");
            setValue("addressDetail", data.fetchBoard.boardAddress?.addressDetail || "");
            setValue("youtubeUrl", data.fetchBoard.youtubeUrl || "");
            setImages([...newImages]);
            // 수정 모드에서는 기존 이미지 URL들을 imageUrl에도 세팅
            setImageUrl(data.fetchBoard.images || []);
        }
    }, [data, isEdit, setValue]);

    const [isActive, setIsActive] = useState(false)

    const [boardCreate] = useMutation(mygraphql)
    const [boardUpdate] = useMutation(mygraphUpdateql)



    const onToggleModal = (data) => {
        setIsModalOpen((prev) => !prev);
        console.log(data);
        console.log(data.zonecode)
        setValue("zipcode", data.zonecode)
        setValue("address", data.address)
    }


    const onClickSubmit = async (formData) => {
        console.log([imageUrl])
        try {
          
                const result = await boardCreate({
                    variables: {
                        createBoardInput: {
                            writer: formData.writer,
                            password: formData.password,
                            title: formData.title,
                            contents: formData.contents,
                            youtubeUrl: formData.youtubeUrl,
                            images: imageUrl,


                            boardAddress: {
                                zipcode: formData.zipcode,
                                address: formData.address,
                                addressDetail: formData.addressDetail
                            },
                        }

                    }
                })
                console.log(result)
                const myId = result?.data?.createBoard._id;
                router.push(`/board/detail/${myId}`);
                alert("게시글 등록이 완료되었습니다.")
            
        } catch (error) {
            console.error(error);
            alert("에러가 발생하였습니다. 다시 시도해주세요.")
        }
    }



    const onClickUpdate = async (formdata) => {


        const inputPassword = prompt("비밀번호를 입력하세요.")



        const myvariables: IMyvariables = {
            boardId,
            password: inputPassword ?? "",
            updateBoardInput: {}

        }
        // if(inputPassword) {myvariables.password = inputPassword}
        if (formdata.title !== "") myvariables.updateBoardInput.title = formdata.title;
        if (formdata.contents !== "") myvariables.updateBoardInput.contents = formdata.contents;
        if (formdata.youtubeUrl !== "") myvariables.updateBoardInput.youtubeUrl = formdata.youtubeUrl
        if (imageUrl && imageUrl.length > 0) {
            const filteredImages = imageUrl.filter((url) => url && url !== "");
            myvariables.updateBoardInput.images = filteredImages;
        }
        if (formdata.zipcode || formdata.address || formdata.addressDetail) {
            myvariables.updateBoardInput.boardAddress = {
                zipcode: formdata.zipcode,
                address: formdata.address,
                addressDetail: formdata.addressDetail,
            };
        }

        try {

            const result = await boardUpdate({
                variables: myvariables,
                refetchQueries: [
                    {
                        query: FETCH_BOARD,
                        variables: { boardId: String(boardId.boardId) }
                    }
                ]

            })
            console.log(result)
            const myId = result?.data?.updateBoard._id
            router.push(`/board/detail/${myId}`);
            alert("게시글 수정이 완료되었습니다.")

        } catch (error) {
            console.error(error);
            alert("에러가 발생하였습니다. 다시 시도해주세요.")
        }
    }


    const onChangeFile = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const isValid = checkVaildationFile(file);
        if (!isValid) return;

        const result = await uploadFile({
            variables: { file }
        });

        const url = result.data?.uploadFile.url;

        setImageUrl(prev => {
            const updated = [...prev];
            updated[index] = url; // index 위치에 새 URL 넣기
            return updated;
        });
    };

    const onClickImage = () => {
        fileRef.current?.click()
    }

    const onDeleteImage = (index: number) => {
        setImageUrl((prev) => {
            const updated = [...prev];
            updated[index] = "";
            return updated;
        });
    };




    return {

        onClickUpdate: onClickUpdate,
  
        isActive: isActive,
        onToggleModal,
        isModalOpen,


        onClickImage,
        fileRef,
        onChangeFile,
        imageUrl,
        onDeleteImage,
        handleSubmit,
        register,
        setValue,
        onClickSubmit,
        formState
      
    }
}