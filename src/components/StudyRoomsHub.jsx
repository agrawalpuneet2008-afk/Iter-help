import React, { useState } from "react";
import { STUDY_ROOMS } from "../data/mockData";
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  MapPin,
  X,
  CalendarCheck,
  ShieldAlert,
  Star,
  Navigation
} from "lucide-react";

export default function StudyRoomsHub({ onNavigateToRoom, onShowToast }) {
  const [rooms, setRooms] = useState(STUDY_ROOMS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalRoom, setActiveModalRoom] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [studyPurpose, setStudyPurpose] = useState("");
  const [myReservations, setMyReservations] = useState([
    {
      id: "res-initial-1",
      roomId: "room-pod-1",
      roomName: "Apex Acoustic Pod #4",
      buildingName: "Central Library",
      buildingId: "library",
      floor: "Level 2 (West Wing)",
      slot: "02:00 PM - 03:00 PM",
      passCode: "CP-POD-8842",
      status: "Confirmed"
    }
  ]);

  const categories = ["All", "Solo Quiet Pod", "Group Collaboration", "Tech Sandbox", "Media Studio"];

  const filteredRooms = rooms.filter(r => {
    if (selectedCategory === "All") return true;
    return r.category === selectedCategory;
  });

  const handleOpenBooking = (room) => {
    setActiveModalRoom(room);
    setSelectedSlot(room.slots[0] || "");
    setStudyPurpose("");
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!activeModalRoom || !selectedSlot) return;

    const newRes = {
      id: `res-${Date.now()}`,
      roomId: activeModalRoom.id,
      roomName: activeModalRoom.name,
      buildingName: activeModalRoom.building,
      buildingId: activeModalRoom.buildingId,
      floor: activeModalRoom.floor,
      slot: selectedSlot,
      passCode: `CP-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Confirmed"
    };

    setMyReservations([newRes, ...myReservations]);

    // Update room status
    setRooms(rooms.map(r => {
      if (r.id === activeModalRoom.id) {
        return {
          ...r,
          status: "Reserved",
          currentOccupant: `Reserved by You (${selectedSlot})`
        };
      }
      return r;
    }));

    setActiveModalRoom(null);
    if (onShowToast) {
      onShowToast({
        type: "success",
        message: `Reservation confirmed for ${activeModalRoom.name}! Pass Code: ${newRes.passCode}`
      });
    }
  };

  const handleCancelReservation = (resId, roomId) => {
    setMyReservations(myReservations.filter(r => r.id !== resId));
    setRooms(rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, status: "Available", currentOccupant: null };
      }
      return r;
    }));
    if (onShowToast) {
      onShowToast({ type: "info", message: "Reservation cancelled. Slot returned to public pool." });
    }
  };

  return (
    <div id="study-rooms-hub-container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header & Category Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Campus Study Space & Lab Reservation</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Real-time occupancy tracking for acoustic pods, collaborative rooms, and VR workspaces.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {categories.map(cat => (
            <button
              key={cat}
              id={`room-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: selectedCategory === cat ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.04)",
                color: selectedCategory === cat ? "#ffffff" : "var(--text-muted)",
                border: selectedCategory === cat ? "1px solid var(--accent-indigo)" : "1px solid var(--border-subtle)"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Bookings Bar if any */}
      {myReservations.length > 0 && (
        <div
          className="glass-panel"
          style={{
            padding: "1.25rem",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.7))",
            border: "1px solid rgba(16, 185, 129, 0.3)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <CalendarCheck size={18} color="#10b981" />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#34d399" }}>
              My Active Space Passes ({myReservations.length})
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
            {myReservations.map(res => (
              <div
                key={res.id}
                style={{
                  background: "rgba(0, 0, 0, 0.25)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.85rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>{res.roomName}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {res.buildingName} • {res.floor}
                    </div>
                  </div>
                  <span className="badge badge-emerald" style={{ fontFamily: "var(--font-mono)" }}>
                    {res.passCode}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-dim)" }}>
                  <Clock size={13} />
                  <span>Slot: {res.slot}</span>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.3rem" }}>
                  <button
                    id={`res-nav-${res.id}`}
                    className="btn-accent"
                    onClick={() => onNavigateToRoom(res.buildingId, res.roomName)}
                    style={{ flex: 1, padding: "0.4rem", fontSize: "0.75rem" }}
                  >
                    <Navigation size={13} />
                    Directions to Pod
                  </button>
                  <button
                    id={`res-cancel-${res.id}`}
                    className="btn-secondary"
                    onClick={() => handleCancelReservation(res.id, res.roomId)}
                    style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", color: "#fb7185" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Study Rooms Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "1.25rem" }}>
        {filteredRooms.map((room) => {
          const isAvailable = room.status === "Available";
          return (
            <div
              key={room.id}
              id={`room-card-${room.id}`}
              className="glass-panel"
              style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span
                    className={
                      isAvailable
                        ? "badge badge-emerald"
                        : room.status === "Reserved"
                        ? "badge badge-amber"
                        : "badge badge-rose"
                    }
                  >
                    {room.status}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#fbbf24" }}>
                    <Star size={13} fill="#fbbf24" />
                    <span>{room.rating}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                  {room.name}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
                  <MapPin size={14} color="var(--accent-indigo)" />
                  <span>{room.building} ({room.floor})</span>
                </div>

                {/* Capacity & Category */}
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem" }}>
                  <span className="badge badge-indigo" style={{ textTransform: "none", fontSize: "0.7rem" }}>
                    <Users size={12} /> Capacity: {room.capacity} {room.capacity === 1 ? "Person" : "People"}
                  </span>
                  <span className="badge badge-cyan" style={{ textTransform: "none", fontSize: "0.7rem" }}>
                    {room.category}
                  </span>
                </div>

                {/* Amenities Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.5rem" }}>
                  {room.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "6px",
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.7rem",
                        color: "var(--text-muted)"
                      }}
                    >
                      ✓ {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  id={`room-book-btn-${room.id}`}
                  className="btn-primary"
                  onClick={() => handleOpenBooking(room)}
                  disabled={!isAvailable}
                  style={{
                    flex: 1,
                    fontSize: "0.8rem",
                    padding: "0.55rem",
                    opacity: isAvailable ? 1 : 0.45,
                    cursor: isAvailable ? "pointer" : "not-allowed"
                  }}
                >
                  <CalendarCheck size={15} />
                  {isAvailable ? "Instant Reserve" : "Currently Occupied"}
                </button>
                <button
                  id={`room-guide-btn-${room.id}`}
                  className="btn-secondary"
                  onClick={() => onNavigateToRoom(room.buildingId, room.name)}
                  style={{ padding: "0.55rem 0.85rem", fontSize: "0.8rem" }}
                  title="Find on Campus Map"
                >
                  <Navigation size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reservation Modal */}
      {activeModalRoom && (
        <div className="modal-overlay" onClick={() => setActiveModalRoom(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: "0.4rem" }}>
                  Instant Space Pass
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                  Reserve {activeModalRoom.name}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {activeModalRoom.building} • {activeModalRoom.floor}
                </div>
              </div>
              <button
                id="close-booking-modal-btn"
                onClick={() => setActiveModalRoom(null)}
                style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmReservation}>
              <div className="form-group">
                <label className="form-label">Select Time Slot</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {activeModalRoom.slots.map(slot => (
                    <button
                      type="button"
                      key={slot}
                      id={`slot-option-${slot.replace(/\s+/g, '')}`}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: "0.6rem",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        background: selectedSlot === slot ? "var(--accent-indigo)" : "var(--bg-input)",
                        border: selectedSlot === slot ? "1px solid var(--accent-indigo)" : "1px solid var(--border-subtle)",
                        color: selectedSlot === slot ? "#ffffff" : "var(--text-main)",
                        cursor: "pointer"
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Study Purpose & Attendees</label>
                <input
                  id="booking-purpose-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Distributed Computing Sprint / Exam Prep"
                  value={studyPurpose}
                  onChange={e => setStudyPurpose(e.target.value)}
                  required
                />
              </div>

              <div
                style={{
                  background: "rgba(99, 102, 241, 0.08)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.75rem",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginBottom: "1.25rem"
                }}
              >
                📌 <strong>Campus Policy:</strong> Reserved pods are held for 15 minutes past the start time before returning to open student rotation. Please maintain quiet study etiquette.
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveModalRoom(null)}
                >
                  Cancel
                </button>
                <button
                  id="submit-room-reservation-btn"
                  type="submit"
                  className="btn-accent"
                >
                  <CheckCircle2 size={16} />
                  Confirm & Generate Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
