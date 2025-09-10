"use client";

interface UnauthorizedModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function UnauthorizedModal({ 
  isOpen, 
  onClose, 
  message = "이 게시글을 수정할 권한이 없습니다." 
}: UnauthorizedModalProps) {
  if (!isOpen) return null;

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
          width: "min(90%, 360px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ 
          fontSize: "18px", 
          margin: 0, 
          marginBottom: "12px",
          color: "#e74c3c",
          fontWeight: "600"
        }}>
          권한 없음
        </h2>
        <p style={{ 
          fontSize: "14px", 
          color: "#333", 
          margin: 0, 
          marginBottom: "20px", 
          lineHeight: 1.5 
        }}>
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #e74c3c",
            background: "#e74c3c",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#c0392b";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#e74c3c";
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}
