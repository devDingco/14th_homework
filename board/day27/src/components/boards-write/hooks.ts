"use client"

import { useParams, useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"

import { useMutation } from "@apollo/client"
import { CreateBoardDocument, CreateBoardMutation, CreateBoardMutationVariables, UpdateBoardDocument, UpdateBoardMutation, UpdateBoardMutationVariables } from "@/commons/graphql/graphql"
import { IMyvariables } from "./types"
import { FETCH_BOARD } from "../boards-detail/detail/queries"
import { mygraphql, mygraphUpdateql, UPLOAD_FILE } from "./queries"
import { checkVaildationFile } from "@/commons/validation-file"









export default function useBoardsWrite() {
    const boardId = useParams()
    const router = useRouter()

    const [inputs, setInputs] = useState({
        email: "",
        title: "",
        content: ""
    })

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    // const [board, setBoard] = useState<IBoard[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [zonecode, setZonecode] = useState("")
    const [address, setAddress] = useState("")
    const [detailAddress, setDetailAddress] = useState("")
    const [youtube, setYoutube] = useState<string>("")

    const [uploadFile] = useMutation(UPLOAD_FILE);
    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const fileRef = useRef(null);





    const [emailError, setEmailError] = useState("필수입력사항")
    const [passwordError, setPasswordError] = useState("필수입력사항")
    const [titleError, setTitleError] = useState("필수입력사항")
    const [contentError, setContentError] = useState("필수입력사항")
    const [isActive, setIsActive] = useState(false)

    const [boardCreate] = useMutation(mygraphql)
    const [boardUpdate] = useMutation(mygraphUpdateql)

    const onChangeInputs = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value
        });


        if (event.target.id === "email") {
            setEmail(event.target.value);
            setEmailError(event.target.value ? "" : "필수입력사항");
        }
        if (event.target.id === "title") {
            setTitle(event.target.value)
            setTitleError(event.target.value ? "" : "필수입력사항");
        }
        if (event.target.id === "content") {
            setContent(event.target.value)
            setContentError(event.target.value ? "" : "필수입력사항");
        }

        if (
            (event.target.id === "email" ? event.target.value : email) &&
            password &&
            (event.target.id === "title" ? event.target.value : title) &&
            (event.target.id === "content" ? event.target.value : content)
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    // const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    //     setEmail(event.target.value)

    //     if (event.target.value) {
    //         setEmailError("")
    //     } else {
    //         setEmailError("필수입력사항")
    //     }

    //     if (event.target.value && password && title && content) {
    //         setIsActive(true)
    //     } else {
    //         setIsActive(false)
    //     }
    // }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)

        if (event.target.value) {
            setPasswordError("")
        } else {
            setPasswordError("필수입력사항")
        }

        if (email && event.target.value && title && content) {

            setIsActive(true)

        } else {

            setIsActive(false)
        }

    }

    // const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.target.value)

    //     if (event.target.value) {
    //         setTitleError("")
    //     } else {
    //         setTitleError("필수입력사항")
    //     }


    //     if (email && password && event.target.value && content) {
    //         setIsActive(true)
    //     } else {
    //         setIsActive(false)
    //     }
    // }

    // const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //     setContent(event.target.value)

    //     if (event.target.value) {
    //         setContentError("")
    //     } else {
    //         setContentError("필수입력사항")
    //     }

    //     if (email && password && title && event.target.value) {
    //         setIsActive(true)
    //     } else {
    //         setIsActive(false)
    //     }
    // }

    const onToggleModal = (data) => {
        setIsModalOpen((prev) => !prev);
        console.log(data);
        console.log(data.zonecode)
        setAddress(data.address)
        setZonecode(data.zonecode)
    }

    const onChangeDetailaddress = (event) => {
        setDetailAddress(event.target.value)
    }

    const onChangeYoutube = (event: ChangeEvent<HTMLInputElement>) => {
        setYoutube(event.target.value)
        console.log(event.target.value)
    }

    const onClickSignUp = async () => {
        console.log([imageUrl])
        try {
            if (email && password && title && content) {
                const result = await boardCreate({
                    variables: {
                        createBoardInput: {
                            writer: email,
                            password: password,
                            title: title,
                            contents: content,
                            youtubeUrl: youtube,
                            images: imageUrl,

                            boardAddress: {
                                zipcode: zonecode,
                                address: address,
                                addressDetail: detailAddress
                            },
                        }

                    }
                })
                console.log(result)
                const myId = result?.data?.createBoard._id;
                router.push(`/board/detail/${myId}`);
                alert("게시글 등록이 완료되었습니다.")
            }
        } catch (error) {
            console.error(error);
            alert("에러가 발생하였습니다. 다시 시도해주세요.")
        }
    }



    const onClickUpdate = async () => {

     
        const inputPassword = prompt("비밀번호를 입력하세요.")



        const myvariables: IMyvariables = {
            boardId: String(boardId.boardId),
            password: inputPassword ?? "",
            updateBoardInput: {}

        }
        // if(inputPassword) {myvariables.password = inputPassword}
        if (title !== "") myvariables.updateBoardInput.title = title;
        if (content !== "") myvariables.updateBoardInput.contents = content;
        if (youtube !== "") myvariables.updateBoardInput.youtubeUrl = youtube;
        if (imageUrl !== "") {
            myvariables.updateBoardInput.images = imageUrl;
        }
        if (zonecode || address || detailAddress) {
            myvariables.updateBoardInput.boardAddress = {
                zipcode: zonecode,
                address: address,
                addressDetail: detailAddress,
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


    const onChangeFile = async (event) => {
        const file = event.target.files[0]
        console.log("파일정보: " + file);

        const isValid = checkVaildationFile(file);
        if (!isValid) return;

        const result = await uploadFile({
            variables: { file }
        })
        console.log("result: " + result)

        console.log("file: " + result.data?.uploadFile.url)
        setImageUrl(prev => [
            ...prev, result.data?.uploadFile.url
        ])


    }

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
        onChangeInputs,
        // onChangeEmail: onChangeEmail,
        onChangePassword: onChangePassword,
        // onChangeTitle: onChangeTitle,
        // onChangeContent: onChangeContent,
        onClickUpdate: onClickUpdate,
        onClickSignUp: onClickSignUp,
        emailError: emailError,
        passwordError: passwordError,
        titleError: titleError,
        contentError: contentError,
        isActive: isActive,
        onToggleModal,
        isModalOpen,
        zonecode,
        address,
        detailAddress,
        onChangeDetailaddress,
        onChangeYoutube,
        youtube,
        onClickImage,
        fileRef,
        onChangeFile,
        imageUrl,
        onDeleteImage
    }
}