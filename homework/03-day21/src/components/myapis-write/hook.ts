"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IDaumPostcodeData, IUseBoardsWriteProps } from "@/components/myapis-write/types";

import { Modal } from "antd";
import { supabase } from "@/commons/libraries/supabase";

export default function useMyBoardWrite(props: IUseBoardsWriteProps) {
    const router = useRouter()
    const params = useParams()
    const boardId = props.boardId ?? String(params.boardId)

    // ✅ 항상 빈 문자열로 state 초기화
    const [inputs, setInputs] = useState({
        title: "",
        contents: "",
    })

    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [selectedImageUrl, setSelectedImageUrl] = useState("");

    useEffect(() => {
        const loadForEdit = async () => {
            if (!props.isEdit || !boardId) return
            const { data, error } = await supabase
                .from("myboard")
                .select("id,title,contents,zipcode,address,address_detail,images")
                .eq("id", boardId)
                .single()
            if (error || !data) return
            setInputs({
                title: data.title ?? "",
                contents: data.contents ?? "",
            })
            setZipcode(data.zipcode ?? "")
            setAddress(data.address ?? "")
            setAddressDetail((data as any).address_detail ?? "")
            if (typeof data.images === "string") setSelectedImageUrl(data.images)
        }
        loadForEdit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isEdit, boardId])

    // 입력값/비밀번호 변경 시 즉시 활성화 상태 재계산
    useEffect(() => {
        setIsActive(inputs.title !== "" && inputs.contents !== "")
    }, [inputs, props.isEdit])

    

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

    const onChangeZipcode = (event: ChangeEvent<HTMLInputElement>) => {
        setZipcode(event.target.value);
    };
    const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };
    const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
        setAddressDetail(event.target.value);
    };

    const onClickPickRandomImage = async () => {
        try {
            const UNSPLASH_ACCESS_KEY = "OtoumUusMZDmyc-W6HM2U4JE36sXxFc6Cy7K5iMeeF4";
            const response = await fetch(
                `https://api.unsplash.com/photos/random?query=wallpaper&count=1&client_id=${UNSPLASH_ACCESS_KEY}`
            );
            const data: Array<{ urls: { regular: string } }> = await response.json();
            const url = data?.[0]?.urls?.regular ?? "";
            setSelectedImageUrl(url);
        } catch (error) {
            console.error(error);
            Modal.error({ content: "이미지 불러오기에 실패했어요. 다시 시도해 주세요." })
        }
    }    

    // GraphQL 뮤테이션 제거됨. Supabase 사용.

    const onClickSubmit = async () => {
        const { data: insertedData, error } = await supabase.from("myboard").insert([
            {
                title: inputs.title,
                contents: inputs.contents,
                address,
                address_detail: addressDetail,
                zipcode,
                images: selectedImageUrl,
            },
        ])
        .select() // ← 삽입된 데이터를 반환
        .single() // 단일 row 반환

        if (error) {
            console.error("등록 실패:", error.message)
            setInputError(error.message)
            Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })

        } else {
            console.log("등록 성공!");
            setInputError("");
            Modal.success({ content: "게시글 등록이 완료되었습니다." })
            router.push(`/openapis/${insertedData.id}`)
        }

    }    

    const onClickUpdate = async () => {
        try {
            const { error } = await supabase.from("myboard").update({
                title: inputs.title,
                contents: inputs.contents,
                zipcode,
                address,
                address_detail: addressDetail,
                images: selectedImageUrl,
            })
            .eq("id", boardId )

            if(error) {
                console.error("수정실패:",error.message)
                setInputError(error.message)
                Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
                return
            }

            setInputError("")
            Modal.success({ content:"게시글이 수정되었습니다!" })

            router.push(`/openapis/${boardId}`);
        } catch (error) { 
            console.error(error);
            Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
        } 

    }
        
    return {        
        inputs,
        zipcode,
        address,
        addressDetail,
        selectedImageUrl,
        inputError,
        isActive,
        isModalOpen,
        onToggleModal,
        handleComplete,
        onChangeZipcode,
        onChangeAddress,
        onChangeAddressDetail,
        onClickPickRandomImage,
        onClickSubmit,
        onClickUpdate,
        onChangeInputs,
    };
  
    

}
