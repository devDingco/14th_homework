"use client";

import { useRouter } from "next/navigation";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function LoginRequiredModal({ 
  isOpen, 
  onClose, 
  message = "로그인이 필요한 서비스입니다." 
}: LoginRequiredModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose();
    router.push("/auth");
  };

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          width: "min(90%, 400px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ 
          fontSize: "18px", 
          margin: 0, 
          marginBottom: "12px",
          color: "#2c3e50",
          fontWeight: "600"
        }}>
          로그인 필요
        </h2>
        <p style={{ 
          fontSize: "14px", 
          color: "#333", 
          margin: 0, 
          marginBottom: "24px", 
          lineHeight: 1.5 
        }}>
          {message}
        </p>
        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center"
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              background: "#f8f9fa",
              color: "#333",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#e9ecef";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
            }}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleLoginClick}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #007bff",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
            }}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
