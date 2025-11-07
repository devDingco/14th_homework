"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FETCH_BOARD,
  CREATE_BOARD,
  UPDATE_BOARD,
  UPLOAD_FILE,
} from "./queries";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { z } from "zod";

export default function useBoardWrite() {
  const router = useRouter();
  const 내주소변수 = useParams();
  const isEditMode = !!내주소변수.boardId;

  // 수정 모드일 때는 password를 optional로 만드는 동적 schema
  const dynamicSchema = isEditMode
    ? schema.extend({
        password: z.string().optional(),
      })
    : schema;

  const { register, handleSubmit, setValue, formState, reset, watch, trigger } =
    useForm({
      defaultValues: {
        writer: "",
        password: "",
        title: "",
        contents: "",
        zonecode: "",
        address: "",
        address_detail: "",
        url: "",
        images: [],
      },
      resolver: zodResolver(dynamicSchema),
      mode: "onChange", // 입력 시 유효성 체크
      criteriaMode: "all", // 모든 필드 검증
    });
  // const { data } = useQuery(FETCH_BOARD, {
  //   variables: { boardId: 내주소변수.boardId },
  // });
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: 내주소변수.boardId },
    skip: !내주소변수.boardId,
    onCompleted: (data) => {
      if (data?.fetchBoard) {
        reset(
          {
            writer: data.fetchBoard.writer ?? "",
            title: data.fetchBoard.title ?? "",
            contents: data.fetchBoard.contents ?? "",
            zonecode: data.fetchBoard.boardAddress.zipcode ?? "",
            address: data.fetchBoard.boardAddress.address ?? "",
            address_detail: data.fetchBoard.addressDetail ?? "",
            url: data.fetchBoard.youtubeUrl ?? "",
            images: data.fetchBoard.images.filter(
              (url) => url !== "/images/add_image.png"
            ),
          }
          // { keepValues: true }
        );
        trigger(["writer", "title", "contents"]);
      }
    },
  });
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState(data?.fetchBoard.address ?? "");
  // const [zonecode, setZonecode] = useState(data?.fetchBoard.zonecode ?? "");
  // const [address_detail, setAddressDetail] = useState(
  //   data?.fetchBoard.address_detail ?? ""
  // );
  // const [url, setUrl] = useState(data?.fetchBoard.url ?? "");
  const [imageUrl, setImageUrl] = useState("/images/add_image.png");
  const [imageUrl2, setImageUrl2] = useState("/images/add_image.png");
  const [imageUrl3, setImageUrl3] = useState("/images/add_image.png");
  const fileRef = useRef<HTMLInputElement>(null);
  const fileRef2 = useRef<HTMLInputElement>(null);
  const fileRef3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.fetchBoard) {
      // setAddress(data.fetchBoard.boardAddress?.address ?? "");
      // setZonecode(data.fetchBoard.boardAddress?.zipcode ?? "");
      // setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
      // setUrl(data.fetchBoard.youtubeUrl ?? "");

      setImageUrl(
        data.fetchBoard.images?.[0]
          ? data.fetchBoard.images[0].startsWith("http")
            ? data.fetchBoard.images[0]
            : `https://storage.googleapis.com/${data.fetchBoard.images[0]}`
          : "/images/add_image.png"
      );
      setImageUrl2(
        data.fetchBoard.images?.[1]
          ? data.fetchBoard.images[1].startsWith("http")
            ? data.fetchBoard.images[1]
            : `https://storage.googleapis.com/${data.fetchBoard.images[1]}`
          : "/images/add_image.png"
      );
      setImageUrl3(
        data.fetchBoard.images?.[2]
          ? data.fetchBoard.images[2].startsWith("http")
            ? data.fetchBoard.images[2]
            : `https://storage.googleapis.com/${data.fetchBoard.images[2]}`
          : "/images/add_image.png"
      );
    }
  }, [data]);
  console.log(imageUrl);
  const [create_request_api_] = useMutation(CREATE_BOARD);
  const [update_request_api_] = useMutation(UPDATE_BOARD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickSubmit = async (data) => {
    // const imagesAbsolute = (data.images || []).map((img) =>
    //   img.startsWith("http") ? img : `https://storage.googleapis.com/${img}`
    // );
    const imagesToSend = [imageUrl, imageUrl2, imageUrl3]
      .filter((url) => url && url !== "/images/add_image.png")
      .map((url) =>
        url.startsWith("https://storage.googleapis.com/")
          ? url.replace("https://storage.googleapis.com/", "")
          : url
      );
    try {
      const result = await create_request_api_({
        variables: {
          createBoardInput: {
            writer: data.writer.trim(),
            password: data.password.trim(),
            title: data.title.trim(),
            contents: data.contents.trim(),
            youtubeUrl: data.url,
            boardAddress: {
              zipcode: data.zonecode,
              address: data.address,
              addressDetail: data.address_detail,
            },
            images: imagesToSend,
          },
        },
        // fetchPolicy: "no-cache",
      });
      console.log("등록 성공", result.data);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      console.error("등록 실패", error);
      alert(error);
    } finally {
    }
  };
  const onClickUpdate = async (formData) => {
    try {
      const 입력받은비밀번호 = prompt(
        "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
      );
      if (!입력받은비밀번호) {
        alert("비밀번호를 입력해야 수정할 수 있습니다.");
        return;
      }

      // 공백 제거
      const trimmedPassword = 입력받은비밀번호.trim();

      if (!trimmedPassword) {
        alert("비밀번호를 입력해야 수정할 수 있습니다.");
        return;
      }

      console.log("입력받은 비밀번호 길이:", trimmedPassword.length);
      setValue("password", trimmedPassword);
      const updateBoardInput: any = {};

      if (formData.title) updateBoardInput.title = formData.title ?? "";
      if (formData.contents)
        updateBoardInput.contents = formData.contents ?? "";
      if (formData.url) updateBoardInput.youtubeUrl = formData.url;

      const imagesToSend = [imageUrl, imageUrl2, imageUrl3]
        .filter((url) => url && url !== "/images/add_image.png")
        .map((url) =>
          url.startsWith("https://storage.googleapis.com/")
            ? url.replace("https://storage.googleapis.com/", "")
            : url
        );

      updateBoardInput.images = imagesToSend;

      updateBoardInput.boardAddress = {
        zipcode: formData.zonecode || "",
        address: formData.address || "",
        addressDetail: formData.address_detail || "",
      };

      if (!내주소변수.boardId) {
        alert("boardId가 없습니다.");
        return;
      }

      const myvariables = {
        updateBoardInput,
        boardId: 내주소변수.boardId,
        password: trimmedPassword,
      };

      console.log("=== 수정 요청 변수 ===", myvariables);

      const result = await update_request_api_({
        variables: myvariables,
        // refetchQueries를 제거하고 Apollo Client의 자동 캐시 업데이트에 의존
        // UPDATE_BOARD 쿼리는 업데이트된 board를 반환하므로 Apollo가 자동으로 캐시를 업데이트합니다
      });

      console.log("=== 수정 성공 ===", result);
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error) {
      console.error("=== 수정 실패 ===", error);
      alert(error);
    }
  };

  // const 비밀번호입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const 비밀번호 = event.target.value;
  //   setPassword(비밀번호);
  // };

  // const 우편번호상태관리 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const 우편번호 = event.target.value;
  //   setZonecode(우편번호);
  // };
  // const 주소상태관리 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const 주소 = event.target.value;
  //   setAddress(주소);
  // };
  // const 상세주소입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const 상세주소 = event.target.value;
  //   setAddressDetail(상세주소);
  // };
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    console.log(data);
    setValue("address", data.address);
    setValue("zonecode", data.zonecode);
  };

  const handleClick = (event) => {
    event.preventDefault();
    open({ onComplete: handleComplete });
  };

  // const 유튜브링크입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const 유튜브링크 = event.target.value;
  //   setUrl(유튜브링크);
  // };
  // const images = watch("images") || [];
  const onChangeFile = async (event, index) => {
    console.log("파일 선택됨:", event.target.files?.[0]);
    const file = event.target.files?.[0];
    if (!file) {
      console.log("파일이 선택되지 않음");
      return;
    }

    console.log("파일 크기:", file.size);
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 크기는 5MB이하여야 합니다.");
      return;
    }

    try {
      console.log("파일 업로드 시작...");
      const result = await uploadFile({ variables: { file } });
      console.log("파일 업로드 결과:", result);
      const fileUrl = result.data?.uploadFile.url;
      console.log("업로드된 파일 URL:", fileUrl);

      if (fileUrl) {
        const finalUrl = fileUrl.startsWith("http")
          ? fileUrl
          : `https://storage.googleapis.com/${fileUrl}`;
        console.log("최종 URL:", finalUrl, "인덱스:", index);

        if (index === 1) setImageUrl(finalUrl);
        if (index === 2) setImageUrl2(finalUrl);
        if (index === 3) setImageUrl3(finalUrl);
      }
    } catch (error) {
      console.error("파일 업로드 에러:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    }
  };
  const onClickCancle = () => {
    router.push("/boards");
  };

  // 수정 모드에서의 유효성 검사 (비밀번호 제외)
  const watchedFields = watch(["writer", "title", "contents"]);
  const isEditModeValid =
    isEditMode &&
    watchedFields[0] && // writer
    watchedFields[1] &&
    watchedFields[1].length >= 2 && // title
    watchedFields[2]; // contents

  const isFormValid = isEditMode ? isEditModeValid : formState.isValid;

  return {
    onClickSubmit,
    onClickUpdate,

    // 비밀번호입력기능,
    // 우편번호상태관리,
    // 주소상태관리,
    // 상세주소입력기능,
    // 유튜브링크입력기능,
    handleClick,
    // address,
    // zonecode,
    // address_detail,
    // url,
    imageUrl,
    imageUrl2,
    imageUrl3,
    onChangeFile,
    fileRef,
    fileRef2,
    fileRef3,
    register,
    handleSubmit,
    formState,
    onClickCancle,
    watch,
    isFormValid,
  };
}
