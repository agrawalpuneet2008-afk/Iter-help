import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#10b981" />,
    error: <AlertCircle size={18} color="#f43f5e" />,
    info: <Info size={18} color="#ff6b00" />
  };

  return (
    <div
      id="campus-toast-notification"
      className="toast-notification"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        background: "rgba(4, 7, 12, 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 107, 0, 0.35)",
        borderRadius: "14px",
        padding: "0.9rem 1.3rem",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        boxShadow: "0 12px 36px rgba(0,0,0,0.75), 0 0 15px rgba(255, 107, 0, 0.15)",
        color: "#ffffff",
        maxWidth: "420px"
      }}
    >
      {icons[toast.type] || icons.info}
      <div style={{ flex: 1, fontSize: "0.875rem", fontWeight: 500 }}>
        {toast.message}
      </div>
      <button
        id="toast-close-btn"
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#94a3b8",
          cursor: "pointer",
          padding: "2px"
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
