"use client";

import { useRouter } from "next/navigation";

export default function ErrorModal({ message }: { message: string }) {
  const router = useRouter();
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "24px",
        width: "min(90%, 360px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "18px", margin: 0, marginBottom: "12px" }}>알림</h2>
        <p style={{ fontSize: "14px", color: "#333", margin: 0, marginBottom: "20px", lineHeight: 1.5 }}>{message}</p>
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid var(--gray-20)",
            background: "var(--main-bg, #fafafa)",
            cursor: "pointer",
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}


