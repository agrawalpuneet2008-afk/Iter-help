import React, { useState } from "react";
import { FACULTY_DIRECTORY, CAMPUS_BUILDINGS } from "../data/mockData";
import {
  UserCheck,
  Search,
  Building,
  MapPin,
  Clock,
  Mail,
  Phone,
  BookOpen,
  Navigation,
  Calendar,
  CheckCircle2,
  X,
  Sparkles,
  Compass,
  Briefcase
} from "lucide-react";

export default function FacultyHub({ onNavigateToCabin, onShowToast }) {
  const [facultyList, setFacultyList] = useState(FACULTY_DIRECTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [bookingFaculty, setBookingFaculty] = useState(null);
  const [appointmentTopic, setAppointmentTopic] = useState("");
  const [appointmentSlot, setAppointmentSlot] = useState("");

  const blocks = ["All", "Block A (Engineering)", "Block C (Turing Hub)", "Student Union"];

  const filteredFaculty = facultyList.filter(teacher => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.cabinNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.block.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBlock =
      selectedBlock === "All" ||
      teacher.block.toLowerCase().includes(selectedBlock.toLowerCase().split(" ")[0]);

    const matchesAvailability = !onlyAvailable || teacher.statusType === "available";

    return matchesSearch && matchesBlock && matchesAvailability;
  });

  const handleOpenBooking = (teacher) => {
    setBookingFaculty(teacher);
    setAppointmentSlot("Today 03:00 PM");
    setAppointmentTopic("");
  };

  const handleConfirmAppointment = (e) => {
    e.preventDefault();
    if (!bookingFaculty || !appointmentTopic) return;

    if (onShowToast) {
      onShowToast({
        type: "success",
        message: `Office hour consultation booked with ${bookingFaculty.name} at ${bookingFaculty.cabinNumber}!`
      });
    }

    setBookingFaculty(null);
  };

  return (
    <div id="faculty-cabin-hub-container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header Banner */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span className="badge badge-indigo">
              Faculty Directory & Cabin Locator
            </span>
            <span className="badge badge-emerald">
              Live Presence Radar
            </span>
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>
            Professors, Academic Blocks & Cabin Numbers
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Instant search for teachers' assigned blocks, cabin numbers, office hours, and step-by-step turn directions.
          </p>
        </div>

        {/* Quick counter */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border-subtle)",
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-md)",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}
        >
          <div>
            <span style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>TOTAL FACULTY: </span>
            <strong style={{ color: "var(--text-main)" }}>{facultyList.length}</strong>
          </div>
          <span style={{ opacity: 0.3 }}>|</span>
          <div>
            <span style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>IN CABIN NOW: </span>
            <strong style={{ color: "#34d399" }}>
              {facultyList.filter(f => f.statusType === "available").length}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
        {/* Search Input */}
        <div style={{ display: "flex", alignItems: "center", position: "relative", minWidth: "320px", flex: 1 }}>
          <Search size={16} style={{ position: "absolute", left: "12px", color: "var(--text-dim)" }} />
          <input
            id="faculty-search-input"
            type="text"
            placeholder="Search by Professor name, Cabin (e.g. A-308), Department, or Course..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              background: "var(--bg-input)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              padding: "0.55rem 0.85rem 0.55rem 2.4rem",
              fontSize: "0.85rem",
              color: "var(--text-main)",
              outline: "none"
            }}
          />
        </div>

        {/* Block Filters */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.4rem" }}>
          {blocks.map(block => (
            <button
              key={block}
              id={`block-filter-${block.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedBlock(block)}
              style={{
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.78rem",
                fontWeight: 600,
                background: selectedBlock === block ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.04)",
                color: selectedBlock === block ? "#ffffff" : "var(--text-muted)",
                border: selectedBlock === block ? "1px solid var(--accent-indigo)" : "1px solid var(--border-subtle)"
              }}
            >
              {block}
            </button>
          ))}

          {/* Available in cabin toggle */}
          <button
            id="toggle-only-available-cabin-btn"
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.78rem",
              fontWeight: 700,
              background: onlyAvailable ? "rgba(16, 185, 129, 0.25)" : "rgba(255, 255, 255, 0.04)",
              color: onlyAvailable ? "#34d399" : "var(--text-muted)",
              border: onlyAvailable ? "1px solid #10b981" : "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              cursor: "pointer"
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: onlyAvailable ? "#10b981" : "#94a3b8" }}></span>
            <span>In Cabin Now</span>
          </button>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "1.25rem" }}>
        {filteredFaculty.map((teacher, index) => {
          const isAvailable = teacher.statusType === "available";

          return (
            <div
              key={teacher.id}
              id={`teacher-card-${teacher.id}`}
              className={`glass-panel fade-in-stagger-${(index % 6) + 1}`}
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.2rem",
                borderTop: isAvailable ? "3px solid #10b981" : "3px solid var(--border-subtle)"
              }}
            >
              <div>
                {/* Top: Avatar, Name, Title, and Cabin Status */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "0.85rem" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: `linear-gradient(135deg, ${teacher.color}, #ea580c)`,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
                    }}
                  >
                    {teacher.avatar}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: 800, lineHeight: 1.2 }}>
                        {teacher.name}
                      </h3>
                      <span
                        className={
                          teacher.statusType === "available"
                            ? "badge badge-emerald"
                            : teacher.statusType === "busy"
                            ? "badge badge-amber"
                            : "badge badge-indigo"
                        }
                        style={{ fontSize: "0.68rem" }}
                      >
                        {teacher.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--accent-indigo)", fontWeight: 600, marginTop: "0.15rem" }}>
                      {teacher.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                      {teacher.department}
                    </div>
                  </div>
                </div>

                {/* Highlighted Block & Cabin Info Box */}
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(6, 9, 14, 0.9))",
                    border: "1px solid rgba(255, 107, 0, 0.3)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.85rem",
                    marginBottom: "0.85rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-main)", fontWeight: 700, fontSize: "0.9rem" }}>
                      <Building size={16} color="var(--accent-orange)" />
                      <span>{teacher.block}</span>
                    </div>
                    <span
                      className="badge badge-indigo"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        padding: "0.25rem 0.65rem",
                        background: "rgba(255, 107, 0, 0.22)"
                      }}
                    >
                      🚪 {teacher.cabinNumber}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <MapPin size={13} color="#10b981" />
                    <span>Location: <strong>{teacher.floor}</strong></span>
                  </div>

                  {/* Wayfinding hint */}
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.4rem", fontStyle: "italic", borderTop: "1px dashed rgba(255,255,255,0.06)", paddingTop: "0.35rem" }}>
                    💡 "{teacher.directionsHint}"
                  </div>
                </div>

                {/* Office Hours & Contact Details */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.75rem", marginBottom: "0.85rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.5rem", borderRadius: "6px" }}>
                    <div style={{ color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Clock size={12} /> OFFICE HOURS
                    </div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)", marginTop: "0.15rem" }}>
                      {teacher.officeHours}
                    </div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.5rem", borderRadius: "6px" }}>
                    <div style={{ color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Phone size={12} /> CABIN EXTENSION
                    </div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)", marginTop: "0.15rem", fontFamily: "var(--font-mono)" }}>
                      {teacher.phone} ({teacher.email})
                    </div>
                  </div>
                </div>

                {/* Courses & Research Specialization */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {teacher.courses.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "4px",
                        padding: "0.2rem 0.45rem",
                        fontSize: "0.68rem",
                        color: "var(--text-muted)"
                      }}
                    >
                      📚 {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Navigate to Cabin & Book Office Hour */}
              <div style={{ display: "flex", gap: "0.6rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)" }}>
                <button
                  id={`nav-cabin-btn-${teacher.id}`}
                  className="btn-primary"
                  onClick={() => onNavigateToCabin(teacher.buildingId, teacher.name, teacher.cabinNumber, teacher.block)}
                  style={{ flex: 1, padding: "0.6rem", fontSize: "0.825rem" }}
                >
                  <Navigation size={15} />
                  <span>Navigate to Cabin</span>
                </button>

                <button
                  id={`book-office-hour-btn-${teacher.id}`}
                  className="btn-secondary"
                  onClick={() => handleOpenBooking(teacher)}
                  style={{ padding: "0.6rem 0.9rem", fontSize: "0.825rem" }}
                  title="Schedule consultation"
                >
                  <Calendar size={15} />
                  <span>Consult</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Book Office Hour / Consultation Modal */}
      {bookingFaculty && (
        <div className="modal-overlay" onClick={() => setBookingFaculty(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: "0.4rem" }}>
                  Office Hour Appointment
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                  Meet with {bookingFaculty.name}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {bookingFaculty.block} • {bookingFaculty.cabinNumber}
                </div>
              </div>
              <button
                id="close-booking-faculty-modal"
                onClick={() => setBookingFaculty(null)}
                style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmAppointment}>
              <div className="form-group">
                <label className="form-label">Available Office Hours Window</label>
                <div style={{ background: "var(--bg-input)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-subtle)", fontSize: "0.85rem", color: "#34d399", fontWeight: 600 }}>
                  🕒 {bookingFaculty.officeHours}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Choose Consultation Slot</label>
                <select
                  id="appointment-slot-select"
                  className="form-select"
                  value={appointmentSlot}
                  onChange={e => setAppointmentSlot(e.target.value)}
                >
                  <option value="Today 02:00 PM - 02:20 PM">Today 02:00 PM - 02:20 PM (Available)</option>
                  <option value="Today 03:00 PM - 03:20 PM">Today 03:00 PM - 03:20 PM (Available)</option>
                  <option value="Tomorrow 10:30 AM - 10:50 AM">Tomorrow 10:30 AM - 10:50 AM (Available)</option>
                  <option value="Tomorrow 11:15 AM - 11:35 AM">Tomorrow 11:15 AM - 11:35 AM (Available)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Consultation Topic / Project Questions</label>
                <textarea
                  id="appointment-topic-input"
                  className="form-textarea"
                  rows="3"
                  placeholder="e.g. Guidance on Distributed Cloud project design and GDG Solution Challenge submission..."
                  value={appointmentTopic}
                  onChange={e => setAppointmentTopic(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setBookingFaculty(null)}
                >
                  Cancel
                </button>
                <button
                  id="confirm-faculty-appointment-btn"
                  type="submit"
                  className="btn-accent"
                >
                  <CheckCircle2 size={16} />
                  Confirm Cabin Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
