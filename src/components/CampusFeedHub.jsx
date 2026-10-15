import React, { useState } from "react";
import { CAMPUS_ANNOUNCEMENTS } from "../data/mockData";
import {
  Radio,
  Bell,
  Sparkles,
  Bookmark,
  ThumbsUp,
  Share2,
  Clock,
  Plus,
  X,
  AlertTriangle,
  Building,
  CheckCircle2
} from "lucide-react";

export default function CampusFeedHub({ onShowToast }) {
  const [feed, setFeed] = useState(CAMPUS_ANNOUNCEMENTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    category: "Clubs & Innovation",
    department: "Student Affairs & Clubs",
    urgent: false,
    content: ""
  });

  const categories = ["All", "Transit & Safety", "Academic", "Clubs & Innovation", "IT & Services"];

  const filteredFeed = feed.filter(item => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const urgentAlert = feed.find(f => f.urgent);

  const handleUpvote = (id) => {
    setFeed(feed.map(item => {
      if (item.id === id) {
        return { ...item, upvotes: item.upvotes + 1 };
      }
      return item;
    }));
  };

  const handleToggleBookmark = (id) => {
    setFeed(feed.map(item => {
      if (item.id === id) {
        const nextState = !item.bookmarked;
        if (onShowToast) {
          onShowToast({
            type: "info",
            message: nextState ? "Announcement bookmarked!" : "Removed from bookmarks."
          });
        }
        return { ...item, bookmarked: nextState };
      }
      return item;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    const created = {
      id: `ann-${Date.now()}`,
      title: newPost.title,
      category: newPost.category,
      department: newPost.department,
      urgent: newPost.urgent,
      timestamp: "Just now",
      content: newPost.content,
      upvotes: 1,
      bookmarked: false
    };

    setFeed([created, ...feed]);
    setShowNewPostModal(false);
    setNewPost({
      title: "",
      category: "Clubs & Innovation",
      department: "Student Affairs & Clubs",
      urgent: false,
      content: ""
    });

    if (onShowToast) {
      onShowToast({
        type: "success",
        message: "Your announcement was published to the campus feed!"
      });
    }
  };

  return (
    <div id="campus-feed-hub-container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header & Post Broadcast Button */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Campus Broadcasts & Live Newsfeed</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Unified official bulletins, GDG workshop notices, transit advisories, and facility alerts.
          </p>
        </div>

        <button
          id="open-broadcast-modal-btn"
          className="btn-primary"
          onClick={() => setShowNewPostModal(true)}
        >
          <Plus size={16} />
          Broadcast Announcement
        </button>
      </div>

      {/* Urgent Advisory Banner if any */}
      {urgentAlert && (
        <div
          className="glass-panel"
          style={{
            padding: "1.25rem 1.5rem",
            background: "linear-gradient(135deg, rgba(244, 63, 94, 0.18), rgba(15, 23, 42, 0.9))",
            border: "1px solid rgba(244, 63, 94, 0.4)",
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem"
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(244, 63, 94, 0.25)",
              color: "#fb7185",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <AlertTriangle size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <span className="badge badge-rose" style={{ animation: "pulseGlow 2s infinite" }}>
                URGENT ADVISORY
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                {urgentAlert.department} • {urgentAlert.timestamp}
              </span>
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.35rem" }}>
              {urgentAlert.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
              {urgentAlert.content}
            </p>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {categories.map(cat => (
          <button
            key={cat}
            id={`feed-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
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

      {/* Feed Cards Stream */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredFeed.map(item => (
          <div
            key={item.id}
            id={`announcement-card-${item.id}`}
            className="glass-panel"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span className="badge badge-indigo">
                  {item.category}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Building size={13} />
                  {item.department}
                </span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Clock size={12} />
                {item.timestamp}
              </span>
            </div>

            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.3 }}>
              {item.title}
            </h3>

            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
              {item.content}
            </p>

            {/* Bottom Actions: Upvote, Bookmark, Share */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-subtle)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  id={`upvote-btn-${item.id}`}
                  onClick={() => handleUpvote(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.4rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "var(--text-main)",
                    fontSize: "0.8rem",
                    fontWeight: 600
                  }}
                >
                  <ThumbsUp size={14} color="#818cf8" />
                  <span>{item.upvotes} Helpful</span>
                </button>

                <button
                  id={`bookmark-btn-${item.id}`}
                  onClick={() => handleToggleBookmark(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.4rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: item.bookmarked ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.04)",
                    color: item.bookmarked ? "#818cf8" : "var(--text-muted)",
                    fontSize: "0.8rem"
                  }}
                >
                  <Bookmark size={14} fill={item.bookmarked ? "#818cf8" : "none"} />
                  <span>{item.bookmarked ? "Saved" : "Save"}</span>
                </button>
              </div>

              <button
                id={`share-btn-${item.id}`}
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  if (onShowToast) onShowToast({ type: "info", message: "Notice link copied to clipboard!" });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.75rem",
                  color: "var(--text-dim)",
                  cursor: "pointer"
                }}
              >
                <Share2 size={13} />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="modal-overlay" onClick={() => setShowNewPostModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>
                Broadcast Campus Announcement
              </h3>
              <button
                id="close-new-post-modal"
                onClick={() => setShowNewPostModal(false)}
                style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label className="form-label">Headline / Title</label>
                <input
                  id="post-title-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. GDG Flutter & Firebase Workshop Room Update"
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    id="post-category-select"
                    className="form-select"
                    value={newPost.category}
                    onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                  >
                    {categories.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Issuing Org / Club</label>
                  <input
                    id="post-department-input"
                    type="text"
                    className="form-input"
                    value={newPost.department}
                    onChange={e => setNewPost({ ...newPost, department: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Broadcast Content</label>
                <textarea
                  id="post-content-textarea"
                  className="form-textarea"
                  rows="4"
                  placeholder="Provide complete event details, room instructions, or advisory instructions..."
                  value={newPost.content}
                  onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowNewPostModal(false)}
                >
                  Cancel
                </button>
                <button
                  id="submit-broadcast-btn"
                  type="submit"
                  className="btn-primary"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
