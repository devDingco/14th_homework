"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD, graphql_setting, UPDATE_BOARD } from "./queries";
import { useDaumPostcodePopup } from "react-daum-postcode";

export default function useBoardWrite() {
  const router = useRouter();
  const 내주소변수 = useParams();
  const { data } = useQuery(FETCH_BOARD);
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
  const [create_request_api_] = useMutation(graphql_setting);
  const [update_request_api_] = useMutation(UPDATE_BOARD);

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
          },
        },
      });

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
      if (inputs.writer) updateBoardInput.wrtier = inputs.writer;
      if (inputs.title) updateBoardInput.title = inputs.title;
      if (inputs.contents) updateBoardInput.contents = inputs.contents;
      if (url) updateBoardInput.youtubeUrl = url;
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
  };
}
