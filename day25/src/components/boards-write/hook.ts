import { useState, ChangeEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import {
  CREATE_BOARD,
  UPDATE_BOARD,
  FETCH_BOARD,
} from "./queries";
import { IBoardWriteInput } from "./types";

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();
  const editId = isEdit ? params.boardId : null;

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: editId },
    skip: !isEdit,
  });

  const [formData, setFormData] = useState<IBoardWriteInput>({
    writer: "",
    password: "",
    title: isEdit ? data?.fetchBoard?.title || "" : "",
    contents: isEdit ? data?.fetchBoard?.contents || "" : "",
    youtubeUrl: "",
    boardAddress: { zipcode: "", address: "", addressDetail: "" },
    images: ["", ""],
  });

  const [errors, setErrors] = useState({
    name: "",
    password: "",
    title: "",
    contents: "",
  });

  const handleChange = (key: keyof IBoardWriteInput) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const isButtonDisabled =
    !formData.writer || !formData.password || !formData.title || !formData.contents;

  const onSubmit = async () => {
    if (!isEdit) {
      // 검증
      let hasError = false;
      const newErrors = { ...errors };

      if (!formData.writer.trim()) { newErrors.name = "필수입력 사항입니다."; hasError = true; } else { newErrors.name = ""; }
      if (!formData.password) { newErrors.password = "필수입력 사항입니다."; hasError = true; } else { newErrors.password = ""; }
      if (!formData.title.trim()) { newErrors.title = "필수입력 사항입니다."; hasError = true; } else { newErrors.title = ""; }
      if (!formData.contents.trim()) { newErrors.contents = "필수입력 사항입니다."; hasError = true; } else { newErrors.contents = ""; }

      setErrors(newErrors);
      if (hasError) return;

      const result = await createBoard({ variables: { createBoardInput: formData } });
      alert("게시글이 등록되었습니다!");
      router.push(`/boards/${result.data.createBoard._id}`);
    } else {
      // 수정 로직
      const 입력받은비밀번호 = prompt("글을 작성할때 입력하셨던 비밀번호를 입력해주세요");
      const updateInput: Partial<IBoardWriteInput> = {};
      if (formData.title && formData.title !== data?.fetchBoard?.title) updateInput.title = formData.title;
      if (formData.contents && formData.contents !== data?.fetchBoard?.contents) updateInput.contents = formData.contents;

      if (Object.keys(updateInput).length === 0) { alert("수정된 내용이 없습니다."); return; }

      try {
        const result = await updateBoard({ variables: { boardId: editId, password: 입력받은비밀번호, updateBoardInput: updateInput } });
        if (result.data) alert("게시글이 성공적으로 수정되었습니다!");
        router.push(`/boards/${editId}`);
      } catch (err: any) {
        alert(err?.graphQLErrors?.map((e: any) => e.message).join(", ") || "수정 실패");
      }
    }
  };

  return { formData, errors, handleChange, isButtonDisabled, onSubmit };
};
