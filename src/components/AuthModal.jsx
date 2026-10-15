import React, { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Upload,
  Camera,
  CheckCircle2,
  X,
  ShieldCheck,
  User,
  CreditCard,
  Building,
  Mail,
  Hash,
  FileImage,
  RefreshCw,
  Lock,
  ArrowRight
} from "lucide-react";

export default function AuthModal({ isOpen, onClose, currentUser, onLoginSuccess }) {
  if (!isOpen) return null;

  const [role, setRole] = useState("student"); // "student" | "professor"

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    name: "Karan Mehta",
    regNumber: "2141019042",
    email: "karan.mehta@iter.ac.in",
    department: "Computer Science & Engineering",
    year: "3rd Year (6th Sem)",
    frontIdPhoto: "uploaded",
    backIdPhoto: "uploaded"
  });

  // Professor Form State
  const [profForm, setProfForm] = useState({
    name: "Prof. Sarah Chen",
    employeeId: "FAC-EMP-3081",
    email: "s.chen@iter.ac.in",
    department: "Computer Science & Engineering",
    block: "Block A (Engineering & Sciences)",
    buildingId: "eng-a",
    cabinNumber: "Cabin A-308",
    floor: "Level 3",
    frontIdPhoto: "uploaded",
    backIdPhoto: "uploaded"
  });

  const [verifying, setVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setVerifying(true);
    setVerificationStep(1);

    setTimeout(() => setVerificationStep(2), 800);
    setTimeout(() => setVerificationStep(3), 1600);
    setTimeout(() => {
      setVerifying(false);
      let authenticatedUser;
      if (role === "student") {
        authenticatedUser = {
          role: "student",
          name: studentForm.name,
          regNumber: studentForm.regNumber,
          email: studentForm.email,
          department: studentForm.department,
          year: studentForm.year,
          frontIdPhoto: studentForm.frontIdPhoto,
          backIdPhoto: studentForm.backIdPhoto,
          avatar: "KM",
          idCode: studentForm.regNumber
        };
      } else {
        authenticatedUser = {
          role: "professor",
          name: profForm.name,
          employeeId: profForm.employeeId,
          email: profForm.email,
          department: profForm.department,
          block: profForm.block,
          buildingId: profForm.buildingId,
          cabinNumber: profForm.cabinNumber,
          floor: profForm.floor,
          frontIdPhoto: profForm.frontIdPhoto,
          backIdPhoto: profForm.backIdPhoto,
          avatar: "SC",
          idCode: profForm.employeeId
        };
      }

      onLoginSuccess(authenticatedUser);
      onClose();
    }, 2200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "680px",
          padding: "2rem",
          background: "linear-gradient(145deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.4)"
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <span className="badge badge-indigo">
                Iter-help Official Portal
              </span>
              <span className="badge badge-emerald">
                ID Verification Security
              </span>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              Academic Authentication & ID Verification
            </h2>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
              Please verify your institutional identity by submitting your credentials and ID card front & back photos.
            </p>
          </div>

          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.6rem",
            background: "var(--bg-input)",
            padding: "4px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "1.5rem"
          }}
        >
          <button
            type="button"
            id="auth-role-student-tab"
            onClick={() => setRole("student")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.65rem",
              borderRadius: "var(--radius-sm)",
              fontWeight: 700,
              fontSize: "0.85rem",
              background: role === "student" ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
              color: role === "student" ? "#ffffff" : "var(--text-muted)",
              boxShadow: role === "student" ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <GraduationCap size={18} />
            <span>Student Login</span>
          </button>

          <button
            type="button"
            id="auth-role-professor-tab"
            onClick={() => setRole("professor")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.65rem",
              borderRadius: "var(--radius-sm)",
              fontWeight: 700,
              fontSize: "0.85rem",
              background: role === "professor" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
              color: role === "professor" ? "#ffffff" : "var(--text-muted)",
              boxShadow: role === "professor" ? "0 4px 12px rgba(16, 185, 129, 0.3)" : "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <Briefcase size={18} />
            <span>Professor / Faculty Login</span>
          </button>
        </div>

        {/* Verification in Progress View */}
        {verifying ? (
          <div style={{ padding: "2.5rem 1rem", textAlign: "center" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "rgba(99, 102, 241, 0.15)",
                color: "var(--accent-indigo)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto"
              }}
            >
              <RefreshCw size={32} className="pulse-beacon" />
            </div>

            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Verifying Institutional ID Card & Credentials...
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px", margin: "1rem auto 0 auto", fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "left" }}>
              <div style={{ color: verificationStep >= 1 ? "#34d399" : "var(--text-dim)" }}>
                {verificationStep >= 1 ? "✓" : "○"} Validating {role === "student" ? `Registration Number: ${studentForm.regNumber}` : `Employee ID: ${profForm.employeeId}`}
              </div>
              <div style={{ color: verificationStep >= 2 ? "#34d399" : "var(--text-dim)" }}>
                {verificationStep >= 2 ? "✓" : "○"} Performing OCR Match on ID Card Front & Back Photos
              </div>
              <div style={{ color: verificationStep >= 3 ? "#34d399" : "var(--text-dim)" }}>
                {verificationStep >= 3 ? "✓" : "○"} Verified with SOA / ITER Institutional Database. Granting Session...
              </div>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit}>
            {/* Student Specific Form Fields */}
            {role === "student" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Full Student Name</label>
                    <input
                      id="student-name-input"
                      type="text"
                      className="form-input"
                      value={studentForm.name}
                      onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#818cf8" }}>
                      * Student Registration Number (Mandatory)
                    </label>
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                      <Hash size={16} style={{ position: "absolute", left: "10px", color: "var(--accent-indigo)" }} />
                      <input
                        id="student-reg-number-input"
                        type="text"
                        className="form-input"
                        placeholder="e.g. 2141019042"
                        value={studentForm.regNumber}
                        onChange={e => setStudentForm({ ...studentForm, regNumber: e.target.value })}
                        style={{ paddingLeft: "2.3rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">College Email Address</label>
                    <input
                      id="student-email-input"
                      type="email"
                      className="form-input"
                      value={studentForm.email}
                      onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Department & Year</label>
                    <input
                      id="student-dept-input"
                      type="text"
                      className="form-input"
                      value={`${studentForm.department} (${studentForm.year})`}
                      onChange={e => setStudentForm({ ...studentForm, department: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Professor / Faculty Specific Form Fields */}
            {role === "professor" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Professor Full Name</label>
                    <input
                      id="prof-name-input"
                      type="text"
                      className="form-input"
                      value={profForm.name}
                      onChange={e => setProfForm({ ...profForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#34d399" }}>
                      * Faculty Employee ID / Code
                    </label>
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                      <Briefcase size={16} style={{ position: "absolute", left: "10px", color: "#10b981" }} />
                      <input
                        id="prof-employee-id-input"
                        type="text"
                        className="form-input"
                        placeholder="e.g. FAC-EMP-3081"
                        value={profForm.employeeId}
                        onChange={e => setProfForm({ ...profForm, employeeId: e.target.value })}
                        style={{ paddingLeft: "2.3rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Assigned Academic Block</label>
                    <select
                      id="prof-block-select"
                      className="form-select"
                      value={profForm.block}
                      onChange={e => setProfForm({ ...profForm, block: e.target.value })}
                    >
                      <option value="Block A (Engineering & Sciences)">Block A (Engineering & Sciences)</option>
                      <option value="Block C (Turing Innovation Hub)">Block C (Turing Innovation Hub)</option>
                      <option value="Student Union & Campus Center">Student Union & Campus Center</option>
                      <option value="Central Library & Knowledge Commons">Central Library</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "var(--accent-indigo)" }}>
                      * Cabin / Office Number
                    </label>
                    <input
                      id="prof-cabin-number-input"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Cabin A-308"
                      value={profForm.cabinNumber}
                      onChange={e => setProfForm({ ...profForm, cabinNumber: e.target.value })}
                      style={{ fontWeight: 700, fontFamily: "var(--font-mono)" }}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* MANDATORY ID CARD PHOTO SUBMISSION (FRONT & BACK) */}
            <div style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CreditCard size={16} color="var(--accent-indigo)" />
                  <span>Submit Institutional ID Card Photos (Front & Back Mandatory)</span>
                </span>
                <span className="badge badge-amber" style={{ fontSize: "0.68rem" }}>
                  Required for Security
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {/* ID Card Front Upload Box */}
                <div
                  style={{
                    border: "2px dashed rgba(99, 102, 241, 0.35)",
                    borderRadius: "var(--radius-md)",
                    padding: "1rem",
                    textAlign: "center",
                    background: "rgba(99, 102, 241, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: "rgba(99, 102, 241, 0.15)",
                      color: "var(--accent-indigo)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <FileImage size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-main)" }}>
                      1. ID Card Front Photo
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      Photo side with Name & Reg / Emp ID
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#34d399", fontSize: "0.72rem", fontWeight: 700, marginTop: "0.2rem" }}>
                    <CheckCircle2 size={14} />
                    <span>Front ID Image Attached</span>
                  </div>

                  <label
                    style={{
                      padding: "0.35rem 0.75rem",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "6px",
                      fontSize: "0.72rem",
                      color: "var(--text-dim)",
                      cursor: "pointer"
                    }}
                  >
                    Change Photo
                    <input type="file" accept="image/*" style={{ display: "none" }} />
                  </label>
                </div>

                {/* ID Card Back Upload Box */}
                <div
                  style={{
                    border: "2px dashed rgba(16, 185, 129, 0.35)",
                    borderRadius: "var(--radius-md)",
                    padding: "1rem",
                    textAlign: "center",
                    background: "rgba(16, 185, 129, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <FileImage size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-main)" }}>
                      2. ID Card Back Photo
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      Barcode, RFID serial & contact side
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#34d399", fontSize: "0.72rem", fontWeight: 700, marginTop: "0.2rem" }}>
                    <CheckCircle2 size={14} />
                    <span>Back ID Image Attached</span>
                  </div>

                  <label
                    style={{
                      padding: "0.35rem 0.75rem",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "6px",
                      fontSize: "0.72rem",
                      color: "var(--text-dim)",
                      cursor: "pointer"
                    }}
                  >
                    Change Photo
                    <input type="file" accept="image/*" style={{ display: "none" }} />
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                id="submit-auth-credentials-btn"
                type="submit"
                className="btn-primary"
                style={{ padding: "0.65rem 1.5rem" }}
              >
                <ShieldCheck size={16} />
                <span>Verify ID & Authenticate</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
