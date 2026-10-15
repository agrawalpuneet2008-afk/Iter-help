import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CampusMap from "./components/CampusMap";
import TimetableHub from "./components/TimetableHub";
import StudyRoomsHub from "./components/StudyRoomsHub";
import LostFoundHub from "./components/LostFoundHub";
import CampusFeedHub from "./components/CampusFeedHub";
import FacultyHub from "./components/FacultyHub";
import DigitalIdModal from "./components/DigitalIdModal";
import AuthModal from "./components/AuthModal";
import Toast from "./components/Toast";
import {
  FileText,
  Compass,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  X,
  Target,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("map");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("iter_help_theme") || "dark";
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("iter_help_user");
    return saved ? JSON.parse(saved) : {
      role: "student",
      name: "Karan Mehta",
      regNumber: "2141019042",
      email: "karan.mehta@iter.ac.in",
      department: "Computer Science & Engineering",
      year: "3rd Year (6th Sem)",
      avatar: "KM"
    };
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [mapDestination, setMapDestination] = useState(null);
  const [cabinTarget, setCabinTarget] = useState(null);

  // Sync theme with document element & persistent storage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("iter_help_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      showToast({
        type: "info",
        message: nextTheme === "light" ? "☀️ Switched to Light Mode for day comfort" : "🌙 Switched to Dark Mode for night comfort"
      });
      return nextTheme;
    });
  };

  const showToast = (toastObj) => {
    setToast(toastObj);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleLoginSuccess = (authenticatedUser) => {
    setCurrentUser(authenticatedUser);
    localStorage.setItem("iter_help_user", JSON.stringify(authenticatedUser));
    showToast({
      type: "success",
      message: `Authenticated as ${authenticatedUser.role === "professor" ? "Professor" : "Student"}: ${authenticatedUser.name}!`
    });
  };

  // Cross-component navigation: switches to map and triggers route calculation
  const handleNavigateTo = (buildingId, locationName) => {
    setCabinTarget(null);
    setMapDestination(buildingId);
    setActiveTab("map");
    showToast({
      type: "info",
      message: `Routing path plotted to ${locationName || buildingId} on campus map.`
    });
  };

  const handleNavigateToCabin = (buildingId, teacherName, cabinNumber, blockName) => {
    setCabinTarget({ teacherName, cabinNumber, blockName });
    setMapDestination(buildingId);
    setActiveTab("map");
    showToast({
      type: "success",
      message: `Navigating to ${teacherName}'s ${cabinNumber} in ${blockName}!`
    });
  };

  return (
    <div className="app-container" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Sidebar for Desktop */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenIdModal={() => setIsIdModalOpen(true)}
      />

      {/* Main View Area */}
      <div className="main-content">
        {/* Top Sticky Header */}
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenIdModal={() => setIsIdModalOpen(true)}
          onSelectNav={setActiveTab}
          unreadAlertCount={1}
        />

        {/* Evaluation Banner for GDG Solution Challenge */}
        <div
          style={{
            background: "linear-gradient(90deg, rgba(255, 107, 0, 0.14), rgba(245, 158, 11, 0.10))",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "0.5rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.8rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span className="badge badge-indigo" style={{ padding: "0.15rem 0.5rem" }}>
              Iter-help Platform
            </span>
            <span style={{ color: "var(--text-muted)" }}>
              Solving: <strong>Fragmented Campus Life, Faculty Cabins & Navigation</strong>
            </span>
          </div>

          <button
            id="view-project-framework-btn"
            onClick={() => setIsDocModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "100px",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--accent-indigo)",
              cursor: "pointer"
            }}
          >
            <FileText size={13} />
            <span>View Solution Framework & Objectives</span>
          </button>
        </div>

        {/* Dynamic Page Views with Smooth Fade Transitions */}
        <main className="page-wrapper">
          <div key={activeTab} className="tab-view-container">
            {activeTab === "map" && (
              <CampusMap
                initialDestination={mapDestination}
                cabinTarget={cabinTarget}
                theme={theme}
                onRouteComputed={(route) => {
                  // Route computed callback
                }}
              />
            )}

            {activeTab === "faculty" && (
              <FacultyHub
                onNavigateToCabin={handleNavigateToCabin}
                onShowToast={showToast}
              />
            )}

            {activeTab === "timetable" && (
              <TimetableHub
                onNavigateToClass={handleNavigateTo}
                onShowToast={showToast}
              />
            )}

            {activeTab === "rooms" && (
              <StudyRoomsHub
                onNavigateToRoom={handleNavigateTo}
                onShowToast={showToast}
              />
            )}

            {activeTab === "lostfound" && (
              <LostFoundHub
                onNavigateToLocation={handleNavigateTo}
                onShowToast={showToast}
              />
            )}

            {activeTab === "feed" && (
              <CampusFeedHub
                onShowToast={showToast}
              />
            )}
          </div>
        </main>
      </div>

      {/* Digital Student ID Modal */}
      <DigitalIdModal
        isOpen={isIdModalOpen}
        onClose={() => setIsIdModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Institutional Auth & ID Card Verification Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Solution Framework & Project Documentation Modal */}
      {isDocModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDocModalOpen(false)}>
          <div
            className="modal-card"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: "780px", padding: "2rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: "0.4rem" }}>
                  Project Framework Documentation
                </span>
                <h2 style={{ fontSize: "1.45rem", fontWeight: 800 }}>
                  Iter-help: The Unified Campus OS
                </h2>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Campus Utilities, Teacher Cabin Navigation & Academic Life Portal
                </div>
              </div>
              <button
                id="close-framework-modal-btn"
                onClick={() => setIsDocModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Framework sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "0.875rem", lineHeight: 1.6 }}>
              {/* Problem statement */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fb7185", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Target size={18} />
                  1. Problem Statement
                </h3>
                <p style={{ color: "var(--text-muted)" }}>
                  <strong>Fragmented Campus Life: Inefficiencies in Student Services and Physical Navigation in Academic Institutions.</strong>
                  <br />
                  Modern university campuses are complex ecosystems with thousands of students, faculty, and departments. Solutions are currently fragmented into disparate platforms (separate portals for timetable management, study room booking, lost-and-found, and campus news). Sprawling layouts make physical navigation challenging—especially for freshers, visitors, and mobility-impaired students.
                </p>
              </div>

              {/* Core Objectives */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#34d399", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Zap size={18} />
                  2. Core Objectives
                </h3>
                <ul style={{ paddingLeft: "1.2rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <li><strong>Centralized Student Services:</strong> Unify class routine radar, study room reservations, crowdsourced lost & found, and official broadcasts into a single intuitive app.</li>
                  <li><strong>Inclusive Wayfinding Engine:</strong> Vector-based campus map with step-free accessibility routing prioritizing wheelchair ramps and elevators.</li>
                  <li><strong>1-Click Navigation Handoff:</strong> Connect every class, study pod, and lost item directly to turn-by-turn routing instructions.</li>
                  <li><strong>Eliminate Facility Underutilization:</strong> Live occupancy counters and instant slot booking for quiet pods and maker labs.</li>
                </ul>
              </div>

              {/* Proposed Approach */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#818cf8", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ShieldCheck size={18} />
                  3. Proposed Approach & Technical Stack
                </h3>
                <p style={{ color: "var(--text-muted)" }}>
                  Built with React, dynamic vector SVG pathfinding graph engines, WCAG 2.1 AA accessibility guidelines, and reactive state stores. Designed for high resilience on both desktop touch displays and mobile student devices.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button
                className="btn-primary"
                onClick={() => setIsDocModalOpen(false)}
              >
                Close & Return to App
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
