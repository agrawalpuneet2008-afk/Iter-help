import React from "react";
import {
  MapPin,
  CalendarClock,
  BookOpen,
  SearchCheck,
  Radio,
  CreditCard,
  Sparkles,
  Accessibility,
  HelpCircle,
  Briefcase
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, onOpenIdModal, onOpenGuideModal }) {
  const navItems = [
    {
      id: "map",
      label: "Campus Wayfinder",
      sublabel: "Interactive 2.5D Map & Routes",
      icon: <MapPin size={20} />,
      badge: "GPS Live",
      badgeColor: "badge-emerald"
    },
    {
      id: "faculty",
      label: "Teachers & Cabins",
      sublabel: "Faculty, blocks & cabin nos",
      icon: <Briefcase size={20} />,
      badge: "Cabins",
      badgeColor: "badge-indigo"
    },
    {
      id: "timetable",
      label: "Timetable & Radar",
      sublabel: "Next class countdown & rooms",
      icon: <CalendarClock size={20} />,
      badge: "In 18m",
      badgeColor: "badge-amber"
    },
    {
      id: "rooms",
      label: "Study Space Hub",
      sublabel: "Reserve pods & media labs",
      icon: <BookOpen size={20} />,
      badge: "3 Open",
      badgeColor: "badge-cyan"
    },
    {
      id: "lostfound",
      label: "Lost & Found",
      sublabel: "Verified campus repository",
      icon: <SearchCheck size={20} />,
      badge: "Active",
      badgeColor: "badge-emerald"
    },
    {
      id: "feed",
      label: "Campus Live Feed",
      sublabel: "Urgent alerts & GDG events",
      icon: <Radio size={20} />,
      badge: "Alerts",
      badgeColor: "badge-rose"
    }
  ];

  return (
    <aside
      id="campus-main-sidebar"
      style={{
        width: "280px",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.5rem 1rem",
        gap: "1rem"
      }}
    >
      <div>
        <div style={{ padding: "0 0.75rem 1.25rem 0.75rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-dim)" }}>
            Student Services Portal
          </span>
        </div>

        {/* Nav Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  background: isActive
                    ? "linear-gradient(90deg, rgba(255, 107, 0, 0.18), rgba(255, 107, 0, 0.04))"
                    : "transparent",
                  borderLeft: isActive ? "3px solid var(--accent-orange)" : "3px solid transparent",
                  color: isActive ? "#ffffff" : "var(--text-muted)",
                  textAlign: "left",
                  width: "100%",
                  transition: "var(--transition-smooth)"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      color: isActive ? "var(--accent-orange)" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: isActive ? 700 : 500, color: isActive ? "var(--text-main)" : "var(--text-muted)" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className={`badge ${item.badgeColor}`} style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom widgets: Digital ID button & Accessibility feature card */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {/* Digital ID Banner */}
        <button
          id="sidebar-open-digital-id"
          onClick={onOpenIdModal}
          style={{
            background: "linear-gradient(135deg, rgba(14, 20, 32, 0.85), rgba(6, 9, 14, 0.95))",
            border: "1px solid rgba(255, 107, 0, 0.28)",
            borderRadius: "var(--radius-md)",
            padding: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
            transition: "var(--transition-smooth)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 107, 0, 0.55)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 107, 0, 0.28)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(255, 107, 0, 0.18)",
              color: "#fb923c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <CreditCard size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-main)" }}>
              Digital Student ID
            </div>
            <div style={{ fontSize: "0.68rem", color: "var(--accent-emerald)" }}>
              Tap for NFC & QR Pass
            </div>
          </div>
        </button>

        {/* Accessibility & GDG Solution badge */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "0.75rem",
            fontSize: "0.72rem",
            color: "var(--text-dim)",
            lineHeight: 1.4
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#34d399", fontWeight: 600, marginBottom: "0.25rem" }}>
            <Accessibility size={14} />
            <span>Inclusive Campus Design</span>
          </div>
          <span>Equipped with elevator priority routing and wheelchair ramp navigation algorithms.</span>
        </div>
      </div>
    </aside>
  );
}
