"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IDaumPostcodeData, IUseBoardsWriteProps } from "@/components/myapis-write/types";

import { Modal, Input, Tag, Tooltip, theme } from "antd";
import { supabase } from "@/commons/libraries/supabase";

export default function useMyBoardWrite(props: IUseBoardsWriteProps) {
    const router = useRouter()
    const params = useParams() // URL 파라미터에서 게시글 ID 추출용
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
            if (!props.isEdit || !boardId || boardId === "undefined") return;

            const { data, error } = await supabase
                .from("myboard")
                .select("id,title,contents,zipcode,address,address_detail,images,tags")
                .eq("id", boardId)
                .single();              // 단일 객체로 반환


            if (error) return

            setInputs({
                title: data.title ?? "",
                contents: data.contents ?? "",
            })
            setZipcode(data.zipcode ?? "")
            setAddress(data.address ?? "")
            setAddressDetail((data as any).address_detail ?? "")
            if (typeof data.images === "string") setSelectedImageUrl(data.images)

            setTags(data.tags ? JSON.parse(data.tags) : []);
        }
        loadForEdit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isEdit, boardId])

    // 입력값/비밀번호 변경 시 즉시 활성화 상태 재계산
    useEffect(() => {
        const allFieldsFilled =    
            inputs.title !== "" && 
            inputs.contents !== "" && 
            zipcode !== "" &&
            address !== "" && 
            addressDetail !== "";

            setIsActive(allFieldsFilled);
    }, [inputs, zipcode, address, addressDetail, props.isEdit])

    

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
                tags,
            },
        ])
        .select() // ← 삽입된 데이터를 반환
        // .maybeSingle();

        if (error) {
            console.error("등록 실패:", error.message)
            setInputError(error.message)
            Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
            return

        } else {
            console.log("등록 성공!");
            setInputError("");
            Modal.success({ content: "게시글 등록이 완료되었습니다." })
            router.push(`/openapis/${insertedData[0].id}`)
        }

    }    

    const onClickUpdate = async () => {
        if (!boardId) {
            console.error("게시물 ID가 누락되었습니다. 수정할 게시물을 찾을 수 없습니다.");
            window.alert("게시물 ID가 없어 수정할 수 없습니다.");
            return;
        }

        try {
            const { data: updatedData, error } = await supabase
            .from("myboard")
            .update({
                title: inputs.title,
                contents: inputs.contents,
                zipcode,
                address,
                address_detail: addressDetail,
                images: selectedImageUrl,
                tags,
            })
            .eq("id", boardId)
            .select()   //  수정 후 데이터 반환
            .single()    



            if(error) {
                console.error("수정실패:",error.message)
                setInputError(error.message)
                Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
                return
            }

            if (!updatedData) {
                Modal.error({ content: "수정된 게시글을 찾을 수 없습니다." });
                return;
            }

            console.log("updatedData:", updatedData)

            setInputError("")
            Modal.success({ content:"게시글이 수정되었습니다!" })

            router.push(`/openapis/${updatedData.id}`);
        } catch (error) { 
            console.error(error);
            Modal.error({ content: "에러가 발생하였습니다. 다시 시도해 주세요." })
        } 

    }
    
    // ====== 태그  ======

    const { token } = theme.useToken();
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<Input>(null);
    const editInputRef = useRef<Input>(null);
  
    useEffect(() => {
      if (inputVisible) {
        inputRef.current?.focus();
      }
    }, [inputVisible]);
  
    useEffect(() => {
      editInputRef.current?.focus();
    }, [editInputValue]);
  
    const handleClose = (removedTag: string) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      console.log(newTags);
      setTags(newTags);
    };
  
    const showInput = () => {
      setInputVisible(true);
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    const handleInputConfirm = () => {
      if (inputValue && !tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
    };
  
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditInputValue(e.target.value);
    };
  
    const handleEditInputConfirm = () => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      setTags(newTags);
      setEditInputIndex(-1);
      setEditInputValue('');
    };
    const tagInputStyle: React.CSSProperties = { 
        width: 64, 
        height: 22, 
        marginInlineEnd: 8, 
        verticalAlign: 'top',        
    };

    const tagPlusStyle: React.CSSProperties = { 
        height: 22, 
        background: token.colorBgContainer, 
        borderStyle: 'dashed', 
    };

    
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
        // 태그 관련 상태 & setter
        tags,
        setTags,
        inputVisible,
        setInputVisible,
        inputValue,
        setInputValue,
        editInputIndex,
        setEditInputIndex,
        editInputValue,
        setEditInputValue,
        inputRef,
        editInputRef,
        tagInputStyle,
        tagPlusStyle,
        handleInputChange,
        handleInputConfirm,
        handleEditInputChange,
        handleEditInputConfirm,
        handleClose,
        showInput

    };
  
    

}
