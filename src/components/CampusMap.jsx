import React, { useState, useEffect } from "react";
import {
  CAMPUS_BUILDINGS,
  CAMPUS_ROUTES
} from "../data/mockData";
import {
  Navigation,
  Accessibility,
  Layers,
  Clock,
  Users,
  Footprints,
  Compass,
  ArrowRight,
  Info,
  Maximize2,
  CheckCircle2,
  Search,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Building
} from "lucide-react";

export default function CampusMap({ initialDestination, cabinTarget, theme = "dark", onRouteComputed }) {
  const isLight = theme === "light";
  const [selectedBuilding, setSelectedBuilding] = useState(CAMPUS_BUILDINGS[0]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [originId, setOriginId] = useState("eng-a");
  const [destinationId, setDestinationId] = useState(initialDestination || "library");
  const [accessibleMode, setAccessibleMode] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync initial destination if provided from external components (like Timetable or Faculty Directory)
  useEffect(() => {
    if (initialDestination) {
      setDestinationId(initialDestination);
      const bldg = CAMPUS_BUILDINGS.find(b => b.id === initialDestination);
      if (bldg) {
        setSelectedBuilding(bldg);
        // If cabinTarget has floor hint, switch to that floor
        if (cabinTarget?.cabinNumber?.includes("3") || cabinTarget?.floor?.includes("3")) {
          setSelectedFloor(3);
        } else if (cabinTarget?.cabinNumber?.includes("2") || cabinTarget?.floor?.includes("2")) {
          setSelectedFloor(2);
        } else {
          setSelectedFloor(1);
        }
      }
      calculateRoute("eng-a", initialDestination, accessibleMode);
    } else {
      calculateRoute(originId, destinationId, accessibleMode);
    }
  }, [initialDestination, cabinTarget]);

  const calculateRoute = (fromId, toId, isAccessible) => {
    if (fromId === toId) {
      setActiveRoute(null);
      return;
    }

    // Find pre-defined route or generate interpolated path
    let route = CAMPUS_ROUTES.find(r => (r.from === fromId && r.to === toId) || (r.from === toId && r.to === fromId));

    const fromBldg = CAMPUS_BUILDINGS.find(b => b.id === fromId);
    const toBldg = CAMPUS_BUILDINGS.find(b => b.id === toId);

    if (!route && fromBldg && toBldg) {
      // Dynamic fallback route calculation
      const fromCenter = { x: fromBldg.x + fromBldg.width / 2, y: fromBldg.y + fromBldg.height / 2 };
      const toCenter = { x: toBldg.x + toBldg.width / 2, y: toBldg.y + toBldg.height / 2 };
      const midPoint = { x: (fromCenter.x + toCenter.x) / 2, y: (fromCenter.y + toCenter.y) / 2 };

      route = {
        from: fromId,
        to: toId,
        distanceMeters: Math.round(Math.hypot(toCenter.x - fromCenter.x, toCenter.y - fromCenter.y) * 1.4),
        standardTimeMin: Math.max(2, Math.round(Math.hypot(toCenter.x - fromCenter.x, toCenter.y - fromCenter.y) * 0.015)),
        accessibleTimeMin: Math.max(3, Math.round(Math.hypot(toCenter.x - fromCenter.x, toCenter.y - fromCenter.y) * 0.02)),
        pathCoords: [fromCenter, midPoint, toCenter],
        standardSteps: [
          `Exit ${fromBldg.shortName} via main entrance.`,
          `Proceed along the paved campus thoroughfare towards ${toBldg.shortName}.`,
          `Arrive at ${toBldg.shortName} main entrance.`
        ],
        accessibleSteps: [
          `Exit ${fromBldg.shortName} via wheelchair accessible automated ramp.`,
          `Utilize the barrier-free perimeter path with tactile ground indicators.`,
          `Enter ${toBldg.shortName} through the grade-level automatic door entrance.`
        ],
        elevationGain: "Zero steps (Accessible Mode Active)"
      };
    }

    setActiveRoute(route);
    if (onRouteComputed && route) onRouteComputed(route);
  };

  const handleCalculateClick = () => {
    calculateRoute(originId, destinationId, accessibleMode);
  };

  const handleToggleAccessible = () => {
    const nextMode = !accessibleMode;
    setAccessibleMode(nextMode);
    calculateRoute(originId, destinationId, nextMode);
  };

  // Filter buildings
  const filteredBuildings = CAMPUS_BUILDINGS.filter(b => {
    const matchesCategory = filterCategory === "All" || b.category === filterCategory;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.floors.some(f => f.rooms.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="campus-wayfinder-container" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Active Faculty Cabin Navigation Notice if set */}
      {cabinTarget && (
        <div
          id="faculty-cabin-navigation-alert"
          className="glass-panel"
          style={{
            padding: "0.85rem 1.25rem",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.15))",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(99, 102, 241, 0.3)",
                color: "#818cf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Building size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 700, textTransform: "uppercase" }}>
                Active Faculty Cabin Wayfinding
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-main)" }}>
                Navigating to {cabinTarget.teacherName}'s {cabinTarget.cabinNumber}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Assigned in {cabinTarget.blockName} ({cabinTarget.floor || "Faculty Corridor"})
              </div>
            </div>
          </div>

          <span className="badge badge-emerald">
            Cabin Highlighted
          </span>
        </div>
      )}

      {/* Top Controller Bar */}
      <div
        className="glass-panel"
        style={{
          padding: "1rem 1.25rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}
      >
        {/* Route Selectors */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>
              From:
            </span>
            <select
              id="route-origin-select"
              value={originId}
              onChange={(e) => {
                setOriginId(e.target.value);
                calculateRoute(e.target.value, destinationId, accessibleMode);
              }}
              style={{
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "0.45rem 0.85rem",
                color: "var(--text-main)",
                fontSize: "0.85rem",
                outline: "none"
              }}
            >
              {CAMPUS_BUILDINGS.map(b => (
                <option key={b.id} value={b.id}>
                  📍 {b.shortName} ({b.code})
                </option>
              ))}
            </select>
          </div>

          <ArrowRight size={16} color="var(--text-dim)" />

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>
              To:
            </span>
            <select
              id="route-destination-select"
              value={destinationId}
              onChange={(e) => {
                setDestinationId(e.target.value);
                const targetB = CAMPUS_BUILDINGS.find(b => b.id === e.target.value);
                if (targetB) setSelectedBuilding(targetB);
                calculateRoute(originId, e.target.value, accessibleMode);
              }}
              style={{
                background: "var(--bg-input)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "0.45rem 0.85rem",
                color: "var(--text-main)",
                fontSize: "0.85rem",
                outline: "none"
              }}
            >
              {CAMPUS_BUILDINGS.map(b => (
                <option key={b.id} value={b.id}>
                  🎯 {b.shortName} ({b.code})
                </option>
              ))}
            </select>
          </div>

          <button
            id="calculate-route-btn"
            className="btn-primary"
            onClick={handleCalculateClick}
            style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}
          >
            <Footprints size={15} />
            Find Best Path
          </button>
        </div>

        {/* Accessibility & Filter Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          {/* Accessibility Toggle */}
          <button
            id="accessibility-mode-toggle"
            onClick={handleToggleAccessible}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 0.9rem",
              borderRadius: "100px",
              background: accessibleMode
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.3))"
                : "rgba(255, 255, 255, 0.05)",
              border: accessibleMode
                ? "1px solid #10b981"
                : "1px solid var(--border-subtle)",
              color: accessibleMode ? "#34d399" : "var(--text-muted)",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "var(--transition-smooth)"
            }}
          >
            <Accessibility size={16} />
            <span>Accessible / Step-Free Mode: {accessibleMode ? "ON" : "OFF"}</span>
          </button>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            {["All", "Academic", "Services", "Community"].map(cat => (
              <button
                key={cat}
                id={`filter-pill-${cat.toLowerCase()}`}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: "0.35rem 0.7rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: filterCategory === cat ? "rgba(99, 102, 241, 0.2)" : "transparent",
                  color: filterCategory === cat ? "#818cf8" : "var(--text-dim)",
                  border: filterCategory === cat ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Building Inspector / Route Drawer */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "1.25rem" }}>
        {/* Interactive SVG Campus Map Viewport */}
        <div
          className="glass-panel"
          style={{
            position: "relative",
            minHeight: "560px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isLight
              ? "radial-gradient(circle at 50% 50%, #f8fafc 0%, #e2e8f0 100%)"
              : "radial-gradient(circle at 50% 50%, #0d1527 0%, #080c14 100%)",
            border: "1px solid var(--border-subtle)"
          }}
        >
          {/* Campus Map Status Header */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(10px)",
              padding: "0.4rem 0.8rem",
              borderRadius: "100px",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              boxShadow: isLight ? "0 2px 8px rgba(0,0,0,0.06)" : "none"
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}></div>
            <span style={{ fontWeight: 600 }}>Interactive Vector Campus Engine v2.4</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>{isLight ? "Day Blueprint View" : "Night Vision View"}</span>
          </div>

          {/* SVG Map Canvas */}
          <svg
            id="campus-interactive-svg-canvas"
            viewBox="0 0 880 620"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "620px",
              cursor: "grab",
              userSelect: "none"
            }}
          >
            {/* Campus Background Lawns and Walkways */}
            <defs>
              <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="1" />
              </pattern>
              {/* Linear Gradients for 2.5D Building Depth */}
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="accessibleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>

            {/* Grid Pattern */}
            <rect width="880" height="620" fill="url(#campus-grid)" />

            {/* Campus Outer Roads & Perimeter Boulevard */}
            <rect x="20" y="20" width="840" height="580" rx="30" fill="none" stroke={isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.05)"} strokeWidth="16" />

            {/* Central Quad Lawn */}
            <ellipse cx="440" cy="310" rx="190" ry="120" fill={isLight ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.04)"} stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" strokeDasharray="6 4" />

            {/* Central Plaza Fountain */}
            <circle cx="440" cy="310" r="28" fill={isLight ? "rgba(6, 182, 212, 0.2)" : "rgba(6, 182, 212, 0.15)"} stroke="#06b6d4" strokeWidth="2" />
            <circle cx="440" cy="310" r="14" fill="#06b6d4" opacity="0.3" className="pulse-beacon" />
            <text x="440" y="314" textAnchor="middle" fill={isLight ? "#0284c7" : "#06b6d4"} fontSize="9" fontWeight="700">QUAD FOUNTAIN</text>

            {/* Main Paved Walkway Arteries */}
            <path d="M 280 130 L 280 440" stroke={isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.07)"} strokeWidth="14" strokeLinecap="round" />
            <path d="M 180 310 L 720 310" stroke={isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.07)"} strokeWidth="14" strokeLinecap="round" />
            <path d="M 440 130 L 440 500" stroke={isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.07)"} strokeWidth="12" strokeLinecap="round" />

            {/* Accessible Ramps Indicators on Grounds */}
            <g opacity={accessibleMode ? 1 : 0.4} transition="opacity 0.3s">
              <circle cx="210" cy="250" r="9" fill="#10b981" opacity="0.8" />
              <text x="210" y="253" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">♿</text>

              <circle cx="340" cy="420" r="9" fill="#10b981" opacity="0.8" />
              <text x="340" y="423" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">♿</text>

              <circle cx="440" cy="205" r="9" fill="#10b981" opacity="0.8" />
              <text x="440" y="208" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">♿</text>

              <circle cx="640" cy="350" r="9" fill="#10b981" opacity="0.8" />
              <text x="640" y="353" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">♿</text>
            </g>

            {/* Render Active Route Path with Traveling Animation */}
            {activeRoute && activeRoute.pathCoords && (
              <g id="animated-route-layer">
                {/* Glow under-path */}
                <path
                  d={activeRoute.pathCoords.reduce((acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "")}
                  fill="none"
                  stroke={accessibleMode ? "#10b981" : "#ff6b00"}
                  strokeWidth="10"
                  opacity="0.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Animated dashed path */}
                <path
                  className="animated-path"
                  d={activeRoute.pathCoords.reduce((acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "")}
                  fill="none"
                  stroke={accessibleMode ? "#34d399" : "#fb923c"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Traveling start and end beacons */}
                <circle
                  cx={activeRoute.pathCoords[0].x}
                  cy={activeRoute.pathCoords[0].y}
                  r="7"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <circle
                  cx={activeRoute.pathCoords[activeRoute.pathCoords.length - 1].x}
                  cy={activeRoute.pathCoords[activeRoute.pathCoords.length - 1].y}
                  r="9"
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="pulse-beacon"
                />
              </g>
            )}

            {/* Render Campus Buildings */}
            {filteredBuildings.map((bldg) => {
              const isSelected = selectedBuilding?.id === bldg.id;
              const isOrigin = originId === bldg.id;
              const isDestination = destinationId === bldg.id;

              return (
                <g
                  key={bldg.id}
                  id={`campus-building-${bldg.id}`}
                  onClick={() => setSelectedBuilding(bldg)}
                  style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
                >
                  {/* Building 3D Shadow Base */}
                  <rect
                    x={bldg.x + 4}
                    y={bldg.y + 6}
                    width={bldg.width}
                    height={bldg.height}
                    rx="14"
                    fill={isLight ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.45)"}
                  />

                  {/* Building Footprint Structure */}
                  <rect
                    x={bldg.x}
                    y={bldg.y}
                    width={bldg.width}
                    height={bldg.height}
                    rx="12"
                    fill={
                      isSelected
                        ? isLight ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.35)"
                        : isLight ? "#ffffff" : "rgba(17, 24, 39, 0.88)"
                    }
                    stroke={
                      isSelected
                        ? "#818cf8"
                        : isDestination
                        ? "#f43f5e"
                        : isOrigin
                        ? "#10b981"
                        : isLight ? "#cbd5e1" : bldg.color
                    }
                    strokeWidth={isSelected || isDestination || isOrigin ? "2.5" : "1.5"}
                  />

                  {/* Top Architectural Accent Bar */}
                  <rect
                    x={bldg.x}
                    y={bldg.y}
                    width={bldg.width}
                    height="8"
                    rx="4"
                    fill={bldg.accent}
                    opacity="0.85"
                  />

                  {/* Building Code & Name Labels */}
                  <text
                    x={bldg.x + 12}
                    y={bldg.y + 28}
                    fill={isLight ? "#0f172a" : "#ffffff"}
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="Outfit, sans-serif"
                    letterSpacing="0.02em"
                  >
                    {bldg.code}
                  </text>
                  <text
                    x={bldg.x + 12}
                    y={bldg.y + 44}
                    fill={isLight ? "#475569" : "#cbd5e1"}
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {bldg.shortName}
                  </text>

                  {/* Occupancy Indicator Pill */}
                  <g transform={`translate(${bldg.x + 12}, ${bldg.y + bldg.height - 24})`}>
                    <rect
                      width="75"
                      height="16"
                      rx="8"
                      fill={
                        bldg.occupancyLevel === "busy"
                          ? "rgba(244, 63, 94, 0.25)"
                          : bldg.occupancyLevel === "moderate"
                          ? "rgba(245, 158, 11, 0.25)"
                          : "rgba(16, 185, 129, 0.25)"
                      }
                      stroke={
                        bldg.occupancyLevel === "busy"
                          ? "#f43f5e"
                          : bldg.occupancyLevel === "moderate"
                          ? "#f59e0b"
                          : "#10b981"
                      }
                      strokeWidth="0.8"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="3"
                      fill={
                        bldg.occupancyLevel === "busy"
                          ? "#f43f5e"
                          : bldg.occupancyLevel === "moderate"
                          ? "#f59e0b"
                          : "#10b981"
                      }
                    />
                    <text
                      x="16"
                      y="11"
                      fill="#ffffff"
                      fontSize="7.5"
                      fontWeight="700"
                    >
                      {bldg.occupancy.split(" ")[0]}
                    </text>
                  </g>

                  {/* Accessibility Badge Icon on building */}
                  {bldg.accessibility.hasRamps && (
                    <g transform={`translate(${bldg.x + bldg.width - 24}, ${bldg.y + 12})`}>
                      <circle cx="6" cy="6" r="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="0.8" />
                      <text x="6" y="9" textAnchor="middle" fill="#34d399" fontSize="7" fontWeight="bold">♿</text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Quick Compass Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-indigo)"
            }}
          >
            <Compass size={24} />
          </div>
        </div>

        {/* Right Drawer: Selected Building Inspector OR Active Route Navigation Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Active Navigation Summary Card */}
          {activeRoute && (
            <div
              className="glass-panel"
              style={{
                padding: "1.25rem",
                borderLeft: accessibleMode ? "4px solid #10b981" : "4px solid var(--accent-indigo)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Navigation size={18} color={accessibleMode ? "#10b981" : "#818cf8"} />
                  <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                    {accessibleMode ? "Accessible Step-Free Route" : "Optimized Walking Route"}
                  </span>
                </div>
                <span className={accessibleMode ? "badge badge-emerald" : "badge badge-indigo"}>
                  {accessibleMode ? "♿ Barrier-Free" : "Fastest"}
                </span>
              </div>

              {/* Metrics: Distance, Estimated Time, Elevation */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "0.85rem"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>WALKING TIME</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-main)" }}>
                    {accessibleMode ? activeRoute.accessibleTimeMin : activeRoute.standardTimeMin} mins
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>TOTAL DISTANCE</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-main)" }}>
                    {activeRoute.distanceMeters} meters
                  </div>
                </div>
              </div>

              {/* Turn-by-turn Step Instructions */}
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  WAYFINDING INSTRUCTIONS
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {(accessibleMode ? activeRoute.accessibleSteps : activeRoute.standardSteps).map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.35
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: accessibleMode ? "rgba(16, 185, 129, 0.2)" : "rgba(99, 102, 241, 0.2)",
                          color: accessibleMode ? "#34d399" : "#818cf8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Selected Building Detailed Inspector & Floor Directory */}
          {selectedBuilding && (
            <div className="glass-panel" style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div className="badge badge-indigo" style={{ marginBottom: "0.4rem" }}>
                    {selectedBuilding.category} • {selectedBuilding.code}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, lineHeight: 1.2 }}>
                    {selectedBuilding.name}
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                {selectedBuilding.description}
              </p>

              {/* Key metadata badges */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.75rem" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.5rem", borderRadius: "8px" }}>
                  <div style={{ color: "var(--text-dim)" }}>HOURS</div>
                  <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{selectedBuilding.hours}</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.5rem", borderRadius: "8px" }}>
                  <div style={{ color: "var(--text-dim)" }}>LIVE OCCUPANCY</div>
                  <div style={{ fontWeight: 600, color: selectedBuilding.occupancyLevel === "busy" ? "#f43f5e" : "#10b981" }}>
                    {selectedBuilding.occupancy}
                  </div>
                </div>
              </div>

              {/* Accessibility Profile */}
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.65rem 0.85rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#34d399", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                  <Accessibility size={14} />
                  <span>Accessibility Features</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  {selectedBuilding.accessibility.hasElevator && <span>• Passenger Elevators</span>}
                  {selectedBuilding.accessibility.hasRamps && <span>• Grade Ramps</span>}
                  {selectedBuilding.accessibility.brailleSignage && <span>• Braille Signage</span>}
                  {selectedBuilding.accessibility.accessibleRestrooms && <span>• ADA Restrooms</span>}
                </div>
              </div>

              {/* Multi-Floor Directory Switcher */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-dim)" }}>
                    EXPLORE FLOORS & ROOMS
                  </span>
                  <div style={{ display: "flex", gap: "0.3rem" }}>
                    {selectedBuilding.floors.map(f => (
                      <button
                        key={f.level}
                        id={`floor-btn-${selectedBuilding.id}-${f.level}`}
                        onClick={() => setSelectedFloor(f.level)}
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: selectedFloor === f.level ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.05)",
                          color: selectedFloor === f.level ? "#ffffff" : "var(--text-muted)"
                        }}
                      >
                        L{f.level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rooms list on selected floor */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {selectedBuilding.floors
                    .find(f => f.level === selectedFloor)
                    ?.rooms.map((room, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.03)",
                          fontSize: "0.78rem"
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{room}</span>
                        <ChevronRight size={14} color="var(--text-dim)" />
                      </div>
                    ))}
                </div>
              </div>

              {/* Direct Route Action buttons */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto", paddingTop: "0.5rem" }}>
                <button
                  id="set-as-destination-btn"
                  className="btn-primary"
                  onClick={() => {
                    setDestinationId(selectedBuilding.id);
                    calculateRoute(originId, selectedBuilding.id, accessibleMode);
                  }}
                  style={{ flex: 1, fontSize: "0.8rem", padding: "0.55rem" }}
                >
                  <MapPin size={15} />
                  Route Here
                </button>
                <button
                  id="set-as-origin-btn"
                  className="btn-secondary"
                  onClick={() => {
                    setOriginId(selectedBuilding.id);
                    calculateRoute(selectedBuilding.id, destinationId, accessibleMode);
                  }}
                  style={{ fontSize: "0.8rem", padding: "0.55rem 0.85rem" }}
                >
                  Set Origin
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
