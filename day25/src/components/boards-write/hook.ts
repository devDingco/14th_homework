import { useState, ChangeEvent, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
  FetchBoardForWriteDocument,
} from "commons/graphql/graphql";
import { type IBoardWriteInput } from "./types";

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const { data } = useQuery(FetchBoardForWriteDocument, {
    variables: { boardId: String(params.boardId) },
    skip: !isEdit,
  });

  const [formData, setFormData] = useState<IBoardWriteInput>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    password: "",
    title: "",
    contents: "",
  });

  const handleChange =
    (key: keyof IBoardWriteInput) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const isButtonDisabled =
    !formData.writer ||
    !formData.password ||
    !formData.title ||
    !formData.contents;

  const onSubmit = async () => {
    if (!isEdit) {
      // 검증
      let hasError = false;
      const newErrors = { ...errors };

      if (!formData.writer.trim()) {
        newErrors.name = "필수입력 사항입니다.";
        hasError = true;
      } else {
        newErrors.name = "";
      }
      if (!formData.password) {
        newErrors.password = "필수입력 사항입니다.";
        hasError = true;
      } else {
        newErrors.password = "";
      }
      if (!formData.title.trim()) {
        newErrors.title = "필수입력 사항입니다.";
        hasError = true;
      } else {
        newErrors.title = "";
      }
      if (!formData.contents.trim()) {
        newErrors.contents = "필수입력 사항입니다.";
        hasError = true;
      } else {
        newErrors.contents = "";
      }

      setErrors(newErrors);
      if (hasError) return;

      const result = await createBoard({
        variables: { createBoardInput: formData },
      });
      alert("게시글이 등록되었습니다!");
      if (result.data) {
        router.push(`/boards/${result.data.createBoard._id}`);
      }
    } else {
      // 수정 로직
      const updateBoardInput: Partial<IBoardWriteInput> = {};
      if (formData.title) updateBoardInput.title = formData.title;
      if (formData.contents) updateBoardInput.contents = formData.contents;

      if (Object.keys(updateBoardInput).length === 0) {
        alert("수정된 내용이 없습니다.");
        return;
      }

      try {
        const result = await updateBoard({
          variables: {
            boardId: String(params.boardId),
            password: formData.password,
            updateBoardInput,
          },
        });
        if (result.data) {
          alert("게시글이 성공적으로 수정되었습니다!");
          router.push(`/boards/${result.data.updateBoard._id}`);
        }
      } catch (err: any) {
        alert(
          err?.graphQLErrors?.map((e: any) => e.message).join(", ") ||
            "수정 실패"
        );
      }
    }
  };

  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        writer: data.fetchBoard.writer ?? "",
        password: "", // 비밀번호는 보안상 불러오지 않음
        title: data.fetchBoard.title,
        contents: data.fetchBoard.contents,
      });
    }
  }, [isEdit, data]);

  return { formData, errors, handleChange, isButtonDisabled, onSubmit };
};