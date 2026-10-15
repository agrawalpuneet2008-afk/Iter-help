import React, { useState } from "react";
import { LOST_FOUND_ITEMS, CAMPUS_BUILDINGS } from "../data/mockData";
import {
  SearchCheck,
  Search,
  Plus,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldAlert,
  HelpCircle,
  Tag,
  ArrowRight,
  Navigation,
  X,
  FileCheck
} from "lucide-react";

export default function LostFoundHub({ onNavigateToLocation, onShowToast }) {
  const [items, setItems] = useState(LOST_FOUND_ITEMS);
  const [filterType, setFilterType] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [claimingItem, setClaimingItem] = useState(null);
  const [claimProof, setClaimProof] = useState("");

  const [newItem, setNewItem] = useState({
    title: "",
    type: "FOUND",
    category: "Electronics",
    location: "Engineering Block A, Room A104",
    buildingId: "eng-a",
    description: "",
    contactDesk: "Campus Security Desk / Owner Contact"
  });

  const categories = ["All", "Electronics", "Drinkware & Bottles", "Cards & ID", "Books & Notes"];

  const filteredItems = items.filter(item => {
    const matchesType = filterType === "ALL" || item.type === filterType;
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesCat && matchesSearch;
  });

  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newItem.title) return;

    const report = {
      id: `item-${Date.now()}`,
      title: newItem.title,
      category: newItem.category,
      type: newItem.type,
      location: newItem.location,
      buildingId: newItem.buildingId,
      date: "Just Now",
      description: newItem.description,
      contactDesk: newItem.contactDesk,
      status: newItem.type === "FOUND" ? "Unclaimed" : "Searching",
      finder: newItem.type === "FOUND" ? "You (Logged in Student)" : null,
      tags: [newItem.category.toLowerCase(), "new"]
    };

    setItems([report, ...items]);
    setShowReportModal(false);
    setNewItem({
      title: "",
      type: "FOUND",
      category: "Electronics",
      location: "Engineering Block A, Room A104",
      buildingId: "eng-a",
      description: "",
      contactDesk: "Campus Security Desk / Owner Contact"
    });

    if (onShowToast) {
      onShowToast({
        type: "success",
        message: `Report filed for '${report.title}'! Broadcasted to campus dashboard.`
      });
    }
  };

  const handleConfirmClaim = (e) => {
    e.preventDefault();
    if (!claimingItem) return;

    setItems(items.map(it => {
      if (it.id === claimingItem.id) {
        return {
          ...it,
          status: "Claimed",
          description: `${it.description} [Claim verified with Student Safety Office: ${claimProof}]`
        };
      }
      return it;
    }));

    const claimedTitle = claimingItem.title;
    setClaimingItem(null);
    setClaimProof("");

    if (onShowToast) {
      onShowToast({
        type: "success",
        message: `Claim request submitted for '${claimedTitle}'. Pick up at the designated front desk.`
      });
    }
  };

  return (
    <div id="lost-found-hub-container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header and Action Banner */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Crowdsourced Campus Lost & Found</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Centralized digital repository eliminating lost item piles across fragmented department offices.
          </p>
        </div>

        <button
          id="report-item-modal-btn"
          className="btn-primary"
          onClick={() => setShowReportModal(true)}
        >
          <Plus size={16} />
          Report Lost or Found Item
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div
        className="glass-panel"
        style={{
          padding: "1rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}
      >
        {/* Status Filter Tabs */}
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[
            { id: "ALL", label: "All Items" },
            { id: "FOUND", label: "Found Items (Needs Owner)" },
            { id: "LOST", label: "Lost Items (Searching)" }
          ].map(tab => (
            <button
              key={tab.id}
              id={`lostfound-tab-${tab.id.toLowerCase()}`}
              onClick={() => setFilterType(tab.id)}
              style={{
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: filterType === tab.id ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.04)",
                color: filterType === tab.id ? "#ffffff" : "var(--text-muted)",
                border: filterType === tab.id ? "1px solid var(--accent-indigo)" : "1px solid var(--border-subtle)"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", position: "relative", minWidth: "260px" }}>
          <Search size={15} style={{ position: "absolute", left: "10px", color: "var(--text-dim)" }} />
          <input
            id="lost-found-search-bar"
            type="text"
            placeholder="Search items, keywords, rooms..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              background: "var(--bg-input)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              padding: "0.45rem 0.75rem 0.45rem 2.2rem",
              fontSize: "0.825rem",
              color: "var(--text-main)",
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* Item Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1.25rem" }}>
        {filteredItems.map(item => {
          const isFound = item.type === "FOUND";
          const isClaimed = item.status === "Claimed";

          return (
            <div
              key={item.id}
              id={`lost-item-${item.id}`}
              className="glass-panel"
              style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
                borderLeft: isFound ? "4px solid #10b981" : "4px solid #f43f5e",
                opacity: isClaimed ? 0.65 : 1
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <span className={isFound ? "badge badge-emerald" : "badge badge-rose"}>
                      {item.type}
                    </span>
                    <span className="badge badge-indigo">
                      {item.category}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Clock size={12} />
                    {item.date}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem", lineHeight: 1.3 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.4, marginBottom: "0.75rem" }}>
                  {item.description}
                </p>

                {/* Location & Desk Info */}
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.78rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-main)" }}>
                    <MapPin size={14} color="#10b981" />
                    <span>Location: <strong>{item.location}</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-dim)" }}>
                    <HelpCircle size={14} />
                    <span>Desk: {item.contactDesk}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                {isFound && !isClaimed && (
                  <button
                    id={`claim-btn-${item.id}`}
                    className="btn-accent"
                    onClick={() => setClaimingItem(item)}
                    style={{ flex: 1, padding: "0.5rem", fontSize: "0.8rem" }}
                  >
                    <FileCheck size={14} />
                    This is Mine (Claim)
                  </button>
                )}

                {isClaimed && (
                  <div
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      fontSize: "0.8rem",
                      color: "#34d399",
                      background: "rgba(16, 185, 129, 0.1)",
                      borderRadius: "var(--radius-md)",
                      textAlign: "center",
                      fontWeight: 700
                    }}
                  >
                    ✓ Successfully Reunited with Owner
                  </div>
                )}

                <button
                  id={`navigate-lost-item-${item.id}`}
                  className="btn-secondary"
                  onClick={() => onNavigateToLocation(item.buildingId, item.location)}
                  style={{ padding: "0.5rem 0.85rem", fontSize: "0.8rem" }}
                  title="Directions to building / desk"
                >
                  <Navigation size={15} />
                  <span>Map</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>
                File a Campus Lost or Found Report
              </h3>
              <button
                id="close-report-modal"
                onClick={() => setShowReportModal(false)}
                style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateReport}>
              <div className="form-group">
                <label className="form-label">Report Type</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setNewItem({ ...newItem, type: "FOUND" })}
                    style={{
                      padding: "0.6rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      background: newItem.type === "FOUND" ? "rgba(16, 185, 129, 0.25)" : "var(--bg-input)",
                      border: newItem.type === "FOUND" ? "1px solid #10b981" : "1px solid var(--border-subtle)",
                      color: newItem.type === "FOUND" ? "#34d399" : "var(--text-muted)"
                    }}
                  >
                    I Found an Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItem({ ...newItem, type: "LOST" })}
                    style={{
                      padding: "0.6rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      background: newItem.type === "LOST" ? "rgba(244, 63, 94, 0.25)" : "var(--bg-input)",
                      border: newItem.type === "LOST" ? "1px solid #f43f5e" : "1px solid var(--border-subtle)",
                      color: newItem.type === "LOST" ? "#fb7185" : "var(--text-muted)"
                    }}
                  >
                    I Lost an Item
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Item Title & Model</label>
                <input
                  id="report-item-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Apple iPad Pro with green magnetic cover"
                  value={newItem.title}
                  onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    id="report-item-category"
                    className="form-select"
                    value={newItem.category}
                    onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    {categories.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Building / Area</label>
                  <select
                    id="report-item-building"
                    className="form-select"
                    value={newItem.buildingId}
                    onChange={e => {
                      const bldg = CAMPUS_BUILDINGS.find(b => b.id === e.target.value);
                      setNewItem({
                        ...newItem,
                        buildingId: e.target.value,
                        location: bldg ? `${bldg.name}, Level 1` : newItem.location
                      });
                    }}
                  >
                    {CAMPUS_BUILDINGS.map(b => (
                      <option key={b.id} value={b.id}>{b.shortName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Specific Spot / Room</label>
                <input
                  id="report-item-location-detail"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2nd row near window in Room A104"
                  value={newItem.location}
                  onChange={e => setNewItem({ ...newItem, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description & Identifying Characteristics</label>
                <textarea
                  id="report-item-desc"
                  className="form-textarea"
                  rows="3"
                  placeholder="Describe color, stickers, scratches, case, or contents..."
                  value={newItem.description}
                  onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </button>
                <button
                  id="submit-lost-report-btn"
                  type="submit"
                  className="btn-primary"
                >
                  Submit & Post to Campus Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Claim Verification Modal */}
      {claimingItem && (
        <div className="modal-overlay" onClick={() => setClaimingItem(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Verify Item Ownership
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Claiming: <strong>{claimingItem.title}</strong>
            </p>

            <form onSubmit={handleConfirmClaim}>
              <div className="form-group">
                <label className="form-label">Proof of Ownership / Serial No / Lock Screen Details</label>
                <textarea
                  id="claim-proof-input"
                  className="form-textarea"
                  rows="3"
                  placeholder="Provide proof such as lock screen photo description, serial number, student ID match, or specific unique stickers."
                  value={claimProof}
                  onChange={e => setClaimProof(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setClaimingItem(null)}
                >
                  Cancel
                </button>
                <button
                  id="confirm-claim-submission-btn"
                  type="submit"
                  className="btn-accent"
                >
                  Submit Verification to Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
