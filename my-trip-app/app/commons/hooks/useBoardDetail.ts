import { useState } from "react";
import { useRouter } from "next/navigation";
import { likeBoardApi, dislikeBoardApi } from "@/commons/apis/board.api";
import { usePostAuth } from "./usePostAuth";
import type { ModalContent, PostData } from "../../_types/board";

export function useBoardDetail(id: string, initialData: any) {
  const [likeCount, setLikeCount] = useState<number>(initialData.likeCount ?? 0);
  const [badCount, setBadCount] = useState<number>(initialData.badCount ?? 0);
  const [pending, setPending] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>({ 
    type: 'link', 
    content: '' 
  });
  
  const { showUnauthorizedModal, checkPostAuthor, closeUnauthorizedModal } = usePostAuth();
  const router = useRouter();

  const post: PostData = {
    title: initialData.title,
    authorProfileImage: "",
    authorName: initialData.authorName,
    createdAt: initialData.createdAt,
    coverImage: initialData.coverImage,
    contents: initialData.contents,
    badCount,
    likeCount,
    youtubeUrl: initialData.youtubeUrl,
    address: initialData.address,
    detailAddress: initialData.detailAddress,
    zipcode: initialData.zipcode,
  };

  const handleLike = async () => {
    if (pending) return;
    try {
      setPending(true);
      const next = await likeBoardApi(id);
      setLikeCount(typeof next === "number" ? next : likeCount + 1);
    } finally {
      setPending(false);
    }
  };

  const handleDislike = async () => {
    if (pending) return;
    try {
      setPending(true);
      const next = await dislikeBoardApi(id);
      setBadCount(typeof next === "number" ? next : badCount + 1);
    } finally {
      setPending(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (checkPostAuthor(post.authorName)) {
      router.push(`/board/edit/${id}`);
    }
  };

  const handleLinkClick = () => {
    if (post.youtubeUrl) {
      setModalContent({ type: 'link', content: post.youtubeUrl });
      setShowInfoModal(true);
    } else {
      setModalContent({ type: 'link', content: '링크가 없습니다.' });
      setShowInfoModal(true);
    }
  };

  const handleLocationClick = () => {
    const fullAddress = [post.address, post.detailAddress].filter(Boolean).join(' ');
    if (fullAddress) {
      setModalContent({ type: 'address', content: fullAddress });
      setShowInfoModal(true);
    } else {
      setModalContent({ type: 'address', content: '등록된 주소가 없습니다.' });
      setShowInfoModal(true);
    }
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
  };

  return {
    post,
    pending,
    showInfoModal,
    modalContent,
    showUnauthorizedModal,
    handleLike,
    handleDislike,
    handleEditClick,
    handleLinkClick,
    handleLocationClick,
    closeInfoModal,
    closeUnauthorizedModal
  };
}
