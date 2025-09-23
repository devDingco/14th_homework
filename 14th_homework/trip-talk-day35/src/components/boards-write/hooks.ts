"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  FETCH_BOARD,
  graphql_setting,
  UPDATE_BOARD,
  UPLOAD_FILE,
} from "./queries";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { title } from "process";

export default function useBoardWrite() {
  const router = useRouter();
  const 내주소변수 = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: 내주소변수.boardId },
  });
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  const [password, setPassword] = useState(data?.fetchBoard.password ?? "");
  // const [contents, setContents] = useState(data?.fetchBoard.contents ?? "");
  const [address, setAddress] = useState(data?.fetchBoard.address ?? "");
  const [zonecode, setZonecode] = useState(data?.fetchBoard.zonecode ?? "");
  const [address_detail, setAddressDetail] = useState(
    data?.fetchBoard.address_detail ?? ""
  );
  const [url, setUrl] = useState(data?.fetchBoard.url ?? "");
  const [imageUrl, setImageUrl] = useState("/images/add_image.png");
  const [imageUrl2, setImageUrl2] = useState("/images/add_image.png");
  const [imageUrl3, setImageUrl3] = useState("/images/add_image.png");
  const fileRef = useRef(null);
  const fileRef2 = useRef(null);
  const fileRef3 = useRef(null);

  useEffect(() => {
    if (data?.fetchBoard) {
      setInputs({
        writer: data.fetchBoard.writer ?? "",
        title: data.fetchBoard.title ?? "",
        contents: data.fetchBoard.contents ?? "",
      });

      setPassword(""); // 비밀번호는 DB에서 안 주므로 초기화만

      setAddress(data.fetchBoard.boardAddress?.address ?? "");
      setZonecode(data.fetchBoard.boardAddress?.zipcode ?? "");
      setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
      setUrl(data.fetchBoard.youtubeUrl ?? "");

      setImageUrl(data.fetchBoard.images?.[0] || "/images/add_image.png");
      setImageUrl2(data.fetchBoard.images?.[1] || "/images/add_image.png");
      setImageUrl3(data.fetchBoard.images?.[2] || "/images/add_image.png");
    }
  }, [data]);

  const [create_request_api_] = useMutation(graphql_setting);
  const [update_request_api_] = useMutation(UPDATE_BOARD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickSubmit = async () => {
    try {
      const result = await create_request_api_({
        variables: {
          createBoardInput: {
            writer: inputs.writer,
            password: password,
            title: inputs.title,
            contents: inputs.contents,
            youtubeUrl: url,
            boardAddress: {
              zipcode: zonecode,
              address: address,
              addressDetail: address_detail,
            },
            images: [imageUrl, imageUrl2, imageUrl3].filter(
              (url) => url !== "/images/add_image.png"
            ),
          },
        },
      });
      console.log("ㄷㅔ이터 있니", result.data);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      alert(error);
    } finally {
    }
  };
  const onClickUpdate = async () => {
    try {
      const 입력받은비밀번호 = prompt(
        "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
      );
      if (!입력받은비밀번호) {
        alert("비밀번호를 입력해야 수정할 수 있습니다.");
        return;
      }
      setPassword(입력받은비밀번호);
      const updateBoardInput: any = {};
      // if (inputs.writer) updateBoardInput.writer = inputs.writer;
      if (inputs.title) updateBoardInput.title = inputs.title;
      if (inputs.contents) updateBoardInput.contents = inputs.contents;
      if (url) updateBoardInput.youtubeUrl = url;
      updateBoardInput.images = [];
      if (imageUrl && imageUrl !== "/images/add_image.png")
        updateBoardInput.images[0] = imageUrl;
      if (imageUrl2 && imageUrl2 !== "/images/add_image.png")
        updateBoardInput.images[1] = imageUrl2;
      if (imageUrl3 && imageUrl3 !== "/images/add_image.png")
        updateBoardInput.images[2] = imageUrl3;
      updateBoardInput.boardAddress = {
        zipcode: zonecode,
        address: address,
        addressDetail: address_detail,
      };

      const myvariables = {
        updateBoardInput,
        boardId: 내주소변수.boardId,
        password: 입력받은비밀번호,
      };
      const boardId = data?.fetchBoard?._id || 내주소변수.boardId;
      if (!boardId) {
        alert("boardId가 없습니다.");
        return;
      }

      const result = await update_request_api_({
        variables: myvariables,
        refetchQueries: [
          {
            query: FETCH_BOARD,
            variables: { boardId: 내주소변수.boardId },
          },
        ],
      });
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error) {
      alert(error);
    }
  };

  const onChangeInputs = (event) => {
    setInputs((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value,
      };
    });
  };

  const 비밀번호입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 비밀번호 = event.target.value;
    setPassword(비밀번호);
  };

  const 우편번호상태관리 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 우편번호 = event.target.value;
    setZonecode(우편번호);
  };
  const 주소상태관리 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 주소 = event.target.value;
    setAddress(주소);
  };
  const 상세주소입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 상세주소 = event.target.value;
    setAddressDetail(상세주소);
  };
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    console.log(data);
    setAddress(data.address);
    setZonecode(data.zonecode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const 유튜브링크입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 유튜브링크 = event.target.value;
    setUrl(유튜브링크);
  };
  const onChangeFile = async (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 크기는 5MB이하여야 합니다.");
      return;
    }

    const result = await uploadFile({ variables: { file } });
    const fileUrl = result.data?.uploadFile.url;
    if (fileUrl) {
      // const imageUrl = URL.createObjectURL(file);
      // setImageUrl(`https://storage.googleapis.com/${fileUrl}`);
      if (index === 1) setImageUrl(`https://storage.googleapis.com/${fileUrl}`);
      if (index === 2)
        setImageUrl2(`https://storage.googleapis.com/${fileUrl}`);
      if (index === 3)
        setImageUrl3(`https://storage.googleapis.com/${fileUrl}`);
    }
  };

  return {
    onClickSubmit,
    onClickUpdate,
    onChangeInputs,
    비밀번호입력기능,
    우편번호상태관리,
    주소상태관리,
    상세주소입력기능,
    유튜브링크입력기능,
    handleClick,
    address,
    zonecode,
    address_detail,
    url,
    imageUrl,
    imageUrl2,
    imageUrl3,
    onChangeFile,
    fileRef,
    fileRef2,
    fileRef3,
    inputs,
  };
}
