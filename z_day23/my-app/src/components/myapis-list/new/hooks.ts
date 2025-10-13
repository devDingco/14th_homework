import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchBoardById, createBoard, updateBoard } from "./queries";
import { IBoardData } from "./types";

export const useMyapisForm = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();
  const boardId = params.id as string;

  const [formData, setFormData] = useState<IBoardData>({
    writer: "",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEdit && boardId) {
      const fetchBoard = async () => {
        const { data, error } = await fetchBoardById(boardId);
        if (error || !data) {
          alert("게시글을 불러오는 데 실패했습니다.");
          router.push("/myapis");
          return;
        }

        setFormData({
          writer: data.writer,
          title: data.title,
          content: data.content,
        });
      };
      fetchBoard();
    }
  }, [isEdit, boardId, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let error;
    if (isEdit) {
      const result = await updateBoard(boardId, formData);
      error = result.error;
    } else {
      const result = await createBoard(formData);
      error = result.error;
    }

    if (error) {
      alert(
        isEdit ? "게시글 수정에 실패했습니다." : "게시글 등록에 실패했습니다."
      );
    } else {
      setSuccess(true);
      setTimeout(() => router.push(`/myapis`), 1500);
    }

    setLoading(false);
  };

  return {
    formData,
    loading,
    success,
    handleChange,
    handleSubmit,
    isEdit,
    router,
  };
};
