import React, { useState, useEffect } from "react";
import {
  Compass,
  Bell,
  Sun,
  Moon,
  ShieldAlert,
  Search,
  UserCheck,
  Sparkles,
  Wifi
} from "lucide-react";

export default function Navbar({
  theme,
  toggleTheme,
  currentUser,
  onOpenAuthModal,
  onOpenIdModal,
  onSelectNav,
  unreadAlertCount = 2,
  onSearchQuery
}) {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    if (onSearchQuery) onSearchQuery(val);
  };

  return (
    <header
      id="campus-header-navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "0.85rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem"
      }}
    >
      {/* Brand & Solution Challenge Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          onClick={() => onSelectNav("map")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            cursor: "pointer",
            textDecoration: "none"
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ff6b00, #f59e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(255, 107, 0, 0.4)",
              color: "#ffffff"
            }}
          >
            <Compass size={22} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                Iter<span style={{ color: "var(--accent-indigo)" }}>-help</span>
              </span>
              <span className="badge badge-indigo" style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem" }}>
                Campus Utilities & Nav
              </span>
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>ITER Campus Hub</span>
              <span>•</span>
              <span style={{ color: "var(--accent-emerald)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
                All Systems Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Quick Search */}
      <div
        style={{
          flex: 1,
          maxWidth: "460px",
          position: "relative",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "14px",
            color: "var(--text-dim)",
            pointerEvents: "none"
          }}
        />
        <input
          id="global-campus-search"
          type="text"
          placeholder="Search classrooms (e.g. A201), labs, study pods, lost items..."
          value={searchValue}
          onChange={handleSearch}
          style={{
            width: "100%",
            background: "var(--bg-input)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "100px",
            padding: "0.6rem 1rem 0.6rem 2.5rem",
            fontSize: "0.85rem",
            color: "var(--text-main)",
            outline: "none",
            transition: "var(--transition-smooth)"
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
        />
      </div>

      {/* Right controls: Live Info, Alerts, Student Card, Theme Toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        {/* Live campus clock */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border-subtle)",
            padding: "0.45rem 0.85rem",
            borderRadius: "var(--radius-md)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)"
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#06b6d4" }}></span>
          <span>{time}</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>72°F Sunny</span>
        </div>

        {/* Emergency Alert Shortcut */}
        <button
          id="navbar-urgent-feed-btn"
          onClick={() => onSelectNav("feed")}
          style={{
            position: "relative",
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "rgba(244, 63, 94, 0.1)",
            border: "1px solid rgba(244, 63, 94, 0.25)",
            color: "#fb7185",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          title="Campus Broadcasts & Emergency Alerts"
        >
          <Bell size={18} />
          {unreadAlertCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#f43f5e",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(244, 63, 94, 0.5)"
              }}
            >
              {unreadAlertCount}
            </span>
          )}
        </button>

        {/* Modern Dual-Segmented Theme Mode Switcher */}
        <div
          id="theme-mode-switcher-container"
          style={{
            display: "flex",
            alignItems: "center",
            background: "var(--bg-input)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "100px",
            padding: "3px",
            gap: "2px"
          }}
        >
          <button
            id="theme-dark-btn"
            onClick={() => { if (theme !== "dark") toggleTheme(); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.35rem 0.65rem",
              borderRadius: "100px",
              background: theme === "dark" ? "linear-gradient(135deg, #ff6b00, #ea580c)" : "transparent",
              color: theme === "dark" ? "#ffffff" : "var(--text-dim)",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: theme === "dark" ? "0 2px 8px rgba(255, 107, 0, 0.45)" : "none",
              transition: "all 0.2s ease"
            }}
            title="Switch to Dark Mode"
          >
            <Moon size={14} />
            <span>Dark</span>
          </button>

          <button
            id="theme-light-btn"
            onClick={() => { if (theme !== "light") toggleTheme(); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.35rem 0.65rem",
              borderRadius: "100px",
              background: theme === "light" ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "transparent",
              color: theme === "light" ? "#1e293b" : "var(--text-dim)",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: theme === "light" ? "0 2px 8px rgba(245, 158, 11, 0.4)" : "none",
              transition: "all 0.2s ease"
            }}
            title="Switch to Light Mode"
          >
            <Sun size={14} />
            <span>Light</span>
          </button>
        </div>

        {/* User Identity & Auth Switcher Trigger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <button
            id="navbar-user-profile-trigger"
            onClick={onOpenAuthModal}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: currentUser?.role === "professor"
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.2))"
                : "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.15))",
              border: currentUser?.role === "professor"
                ? "1px solid rgba(16, 185, 129, 0.4)"
                : "1px solid rgba(99, 102, 241, 0.35)",
              padding: "0.35rem 0.75rem 0.35rem 0.4rem",
              borderRadius: "100px",
              cursor: "pointer"
            }}
            title="Click to Switch User / Re-authenticate"
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: currentUser?.role === "professor"
                  ? "linear-gradient(135deg, #10b981, #0284c7)"
                  : "linear-gradient(135deg, #6366f1, #10b981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "0.75rem",
                fontWeight: 700
              }}
            >
              {currentUser?.avatar || "KM"}
            </div>
            <div style={{ textAlign: "left", lineHeight: 1.1 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-main)" }}>
                {currentUser?.name || "Karan M."}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: currentUser?.role === "professor" ? "#34d399" : "var(--accent-indigo)",
                  fontWeight: 600
                }}
              >
                {currentUser?.role === "professor"
                  ? `${currentUser?.cabinNumber || "Cabin A-308"}`
                  : `Reg: ${currentUser?.regNumber || "2141019042"}`}
              </div>
            </div>
          </button>

          {/* Quick ID Card Modal Button */}
          {currentUser?.role !== "professor" && (
            <button
              id="navbar-quick-id-card-btn"
              onClick={onOpenIdModal}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
              title="View Digital RFID Pass"
            >
              <UserCheck size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
