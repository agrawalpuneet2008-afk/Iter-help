import React, { useState } from "react";
import { STUDENT_PROFILE } from "../data/mockData";
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  PhoneCall,
  Wifi,
  Sparkles,
  CheckCircle2,
  X,
  AlertTriangle
} from "lucide-react";

export default function DigitalIdModal({ isOpen, onClose, onShowToast }) {
  const [nfcTapping, setNfcTapping] = useState(false);
  const [nfcSuccess, setNfcSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateNfcTap = () => {
    setNfcTapping(true);
    setNfcSuccess(false);

    setTimeout(() => {
      setNfcTapping(false);
      setNfcSuccess(true);
      if (onShowToast) {
        onShowToast({
          type: "success",
          message: "NFC Reader Verified: Granted access to Library Knowledge Commons Turnstile #2"
        });
      }
      setTimeout(() => setNfcSuccess(false), 3500);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "480px",
          background: "linear-gradient(145deg, #0f172a 0%, #080c14 100%)",
          border: "1px solid rgba(99, 102, 241, 0.4)",
          padding: "2rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-indigo)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Official Student Pass
            </span>
          </div>
          <button
            id="close-digital-id-modal"
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* High-tech Smart ID Card Canvas */}
        <div
          id="student-digital-card-canvas"
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)"
          }}
        >
          {/* Holographic Watermark glow */}
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "160px",
              height: "160px",
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
              pointerEvents: "none"
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--accent-indigo)", letterSpacing: "0.08em" }}>
                ITER • INSTITUTE OF TECHNICAL EDUCATION {"&"} RESEARCH (SOA)
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase" }}>
                Iter-help Official Student Pass
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginTop: "0.2rem" }}>
                {STUDENT_PROFILE.name}
              </h3>
              <div style={{ fontSize: "0.8rem", color: "var(--accent-indigo)", fontWeight: 600 }}>
                {STUDENT_PROFILE.department}
              </div>
            </div>

            {/* Profile Avatar */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "1.2rem",
                fontWeight: 800,
                border: "2px solid rgba(255, 255, 255, 0.2)"
              }}
            >
              KM
            </div>
          </div>

          {/* Details Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              background: "rgba(0, 0, 0, 0.3)",
              padding: "0.75rem",
              borderRadius: "var(--radius-md)",
              marginBottom: "1rem",
              fontSize: "0.75rem"
            }}
          >
            <div>
              <div style={{ color: "var(--text-dim)" }}>STUDENT ID</div>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--text-main)" }}>
                {STUDENT_PROFILE.studentId}
              </div>
            </div>
            <div>
              <div style={{ color: "var(--text-dim)" }}>ACADEMIC YEAR</div>
              <div style={{ fontWeight: 700, color: "var(--text-main)" }}>
                {STUDENT_PROFILE.year}
              </div>
            </div>
            <div>
              <div style={{ color: "var(--text-dim)" }}>RFID SERIAL</div>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "#34d399" }}>
                {STUDENT_PROFILE.rfidCard}
              </div>
            </div>
            <div>
              <div style={{ color: "var(--text-dim)" }}>CAMPUS STATUS</div>
              <div style={{ fontWeight: 700, color: "#10b981" }}>
                Active & Enrolled
              </div>
            </div>
          </div>

          {/* Simulated QR Code Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "0.75rem",
              borderTop: "1px dashed rgba(255, 255, 255, 0.1)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ background: "#ffffff", padding: "4px", borderRadius: "6px", display: "inline-block" }}>
                <QrCode size={36} color="#000000" />
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>
                Dynamic Turnstile QR<br />Refreshes every 30s
              </div>
            </div>

            <button
              id="simulate-nfc-tap-btn"
              onClick={handleSimulateNfcTap}
              disabled={nfcTapping}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 0.85rem",
                borderRadius: "var(--radius-md)",
                background: nfcSuccess
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(99, 102, 241, 0.2)",
                border: nfcSuccess
                  ? "1px solid #10b981"
                  : "1px solid rgba(99, 102, 241, 0.4)",
                color: nfcSuccess ? "#34d399" : "#818cf8",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              <Wifi size={14} className={nfcTapping ? "pulse-beacon" : ""} />
              <span>{nfcTapping ? "Scanning..." : nfcSuccess ? "Tapped ✓" : "Tap NFC Reader"}</span>
            </button>
          </div>
        </div>

        {/* Emergency SOS Quick Dial Section */}
        <div style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.6rem", color: "#fb7185", fontSize: "0.8rem", fontWeight: 700 }}>
            <AlertTriangle size={15} />
            <span>Campus Emergency SOS Quick Contacts</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <a
              id="sos-security-link"
              href="tel:911"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(244, 63, 94, 0.1)",
                border: "1px solid rgba(244, 63, 94, 0.25)",
                borderRadius: "var(--radius-md)",
                padding: "0.6rem",
                color: "#fb7185",
                textDecoration: "none",
                fontSize: "0.78rem",
                fontWeight: 600
              }}
            >
              <PhoneCall size={14} />
              <span>Security (Ext. 911)</span>
            </a>

            <a
              id="sos-clinic-link"
              href="tel:4102"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                borderRadius: "var(--radius-md)",
                padding: "0.6rem",
                color: "#34d399",
                textDecoration: "none",
                fontSize: "0.78rem",
                fontWeight: 600
              }}
            >
              <PhoneCall size={14} />
              <span>Clinic (Ext. 4102)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
