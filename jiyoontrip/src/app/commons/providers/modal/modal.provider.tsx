"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "../../stores/store";

interface IProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: IProps) {
  const { isOpen, content, closeModal } = useModalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {children}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            onClick={handleBackdropClick}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
