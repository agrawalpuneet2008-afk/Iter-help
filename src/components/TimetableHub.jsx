import React, { useState, useEffect } from "react";
import { STUDENT_SCHEDULE } from "../data/mockData";
import {
  CalendarClock,
  MapPin,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Compass,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Plus,
  Camera,
  Upload,
  Sparkles,
  Check,
  X,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Wifi,
  Radio,
  FileImage,
  RefreshCw,
  Flame
} from "lucide-react";

export default function TimetableHub({ onNavigateToClass, onShowToast }) {
  const [selectedDay, setSelectedDay] = useState("Thursday");
  
  // Load schedule and attendance from localStorage if available
  const [scheduleList, setScheduleList] = useState(() => {
    const saved = localStorage.getItem("iter_help_schedule");
    return saved ? JSON.parse(saved) : STUDENT_SCHEDULE;
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem("iter_help_attendance");
    return saved ? JSON.parse(saved) : {
      "cls-1": { total: 24, attended: 22, todayStatus: "Present" },
      "cls-2": { total: 20, attended: 20, todayStatus: "Present" },
      "cls-3": { total: 16, attended: 16, todayStatus: "Present" },
      "cls-4": { total: 25, attended: 22, todayStatus: "Pending" },
      "cls-5": { total: 18, attended: 16, todayStatus: "Pending" }
    };
  });

  const [autoGeofenceEnabled, setAutoGeofenceEnabled] = useState(true);
  const [showOcrModal, setShowOcrModal] = useState(false);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrStep, setOcrStep] = useState(0);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [extractedSchedulePreview, setExtractedSchedulePreview] = useState(null);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: "", time: "15:00", room: "Library Pod" });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("iter_help_schedule", JSON.stringify(scheduleList));
  }, [scheduleList]);

  useEffect(() => {
    localStorage.setItem("iter_help_attendance", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const nextClass = scheduleList.find(c => c.isNext);
  const filteredSchedule = scheduleList.filter(c => c.day === selectedDay);

  // Compute Overall Attendance Stats
  const totalClassesCount = Object.values(attendanceRecords).reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalAttendedCount = Object.values(attendanceRecords).reduce((acc, curr) => acc + (curr.attended || 0), 0);
  const overallPercentage = totalClassesCount > 0 ? ((totalAttendedCount / totalClassesCount) * 100).toFixed(1) : 88.5;

  // Mark Daily Attendance for a specific class
  const handleMarkAttendance = (classId, status) => {
    const current = attendanceRecords[classId] || { total: 20, attended: 18, todayStatus: "Pending" };
    let newAttended = current.attended;
    let newTotal = current.total;

    // Adjust counts based on transition
    if (current.todayStatus === "Present" && status === "Absent") {
      newAttended = Math.max(0, newAttended - 1);
    } else if (current.todayStatus === "Absent" && status === "Present") {
      newAttended += 1;
    } else if (current.todayStatus === "Pending" && status === "Present") {
      newTotal += 1;
      newAttended += 1;
    } else if (current.todayStatus === "Pending" && status === "Absent") {
      newTotal += 1;
    }

    const updated = {
      ...attendanceRecords,
      [classId]: {
        total: newTotal,
        attended: newAttended,
        todayStatus: status
      }
    };

    setAttendanceRecords(updated);
    if (onShowToast) {
      onShowToast({
        type: status === "Present" ? "success" : "info",
        message: `Self-Attendance: Marked as ${status} for class!`
      });
    }
  };

  // Quick Action: Auto-Mark all today's classes as Present
  const handleAutoMarkTodayAll = () => {
    const updated = { ...attendanceRecords };
    filteredSchedule.forEach(cls => {
      const curr = updated[cls.id] || { total: 20, attended: 18 };
      if (curr.todayStatus !== "Present") {
        updated[cls.id] = {
          total: (curr.todayStatus === "Pending" ? curr.total + 1 : curr.total),
          attended: (curr.todayStatus === "Pending" ? curr.attended + 1 : curr.attended + 1),
          todayStatus: "Present"
        };
      }
    });

    setAttendanceRecords(updated);
    if (onShowToast) {
      onShowToast({
        type: "success",
        message: "⚡ Daily Automation: All today's classes marked as Attended (100%)!"
      });
    }
  };

  // Timetable Screenshot OCR Simulation
  const handleSimulateScreenshotUpload = (customImg = null) => {
    setUploadedImagePreview(customImg || "sample");
    setOcrScanning(true);
    setOcrStep(1);

    setTimeout(() => setOcrStep(2), 900);
    setTimeout(() => setOcrStep(3), 1800);
    setTimeout(() => {
      setOcrScanning(false);
      setExtractedSchedulePreview([
        {
          id: `ocr-1-${Date.now()}`,
          courseCode: "CS402",
          courseTitle: "Distributed Cloud Systems",
          day: "Thursday",
          time: "10:30 AM - 12:00 PM",
          startTime: "10:30",
          endTime: "12:00",
          room: "Room A201 (Cloud Lab)",
          buildingId: "eng-a",
          buildingName: "Block A (Engineering)",
          floor: "Level 2",
          professor: "Prof. Sarah Chen (Cabin A-308)",
          type: "Theory & Practical Lab",
          status: "Upcoming",
          isNext: true,
          minutesUntil: 18,
          attendanceRate: "94%"
        },
        {
          id: `ocr-2-${Date.now()}`,
          courseCode: "AI310",
          courseTitle: "Neural Networks & Deep Learning",
          day: "Thursday",
          time: "02:00 PM - 03:30 PM",
          startTime: "14:00",
          endTime: "15:30",
          room: "Arena C201",
          buildingId: "sci-tech",
          buildingName: "Block C (Turing Hub)",
          floor: "Level 2",
          professor: "Dr. Marcus Vance (Cabin C-214)",
          type: "Hands-on Workshop",
          status: "Scheduled",
          isNext: false,
          minutesUntil: 228,
          attendanceRate: "100%"
        },
        {
          id: `ocr-3-${Date.now()}`,
          courseCode: "IOT305",
          courseTitle: "Embedded Systems & IoT Sensors",
          day: "Thursday",
          time: "04:00 PM - 05:30 PM",
          startTime: "16:00",
          endTime: "17:30",
          room: "Room A104",
          buildingId: "eng-a",
          buildingName: "Block A (Engineering)",
          floor: "Level 1",
          professor: "Dr. Rajesh Sharma (Cabin A-105)",
          type: "Hardware Lab",
          status: "Scheduled",
          isNext: false,
          minutesUntil: 348,
          attendanceRate: "92%"
        },
        {
          id: `ocr-4-${Date.now()}`,
          courseCode: "MATH240",
          courseTitle: "Probability & Applied Statistics",
          day: "Friday",
          time: "09:00 AM - 10:30 AM",
          startTime: "09:00",
          endTime: "10:30",
          room: "Auditorium A101",
          buildingId: "eng-a",
          buildingName: "Block A (Engineering)",
          floor: "Level 1",
          professor: "Prof. Elena Rostova (Cabin A-215)",
          type: "Lecture",
          status: "Upcoming",
          isNext: false,
          attendanceRate: "88%"
        },
        {
          id: `ocr-5-${Date.now()}`,
          courseCode: "ENG205",
          courseTitle: "Technical Leadership & Communication",
          day: "Friday",
          time: "11:00 AM - 12:30 PM",
          startTime: "11:00",
          endTime: "12:30",
          room: "Room U204",
          buildingId: "student-union",
          buildingName: "Student Union",
          floor: "Level 2",
          professor: "Dr. Jonathan Hayes (Cabin U-204)",
          type: "Seminar",
          status: "Upcoming",
          isNext: false,
          attendanceRate: "96%"
        }
      ]);
    }, 2600);
  };

  const handleApplyExtractedSchedule = () => {
    if (!extractedSchedulePreview) return;
    setScheduleList(extractedSchedulePreview);

    // Initialize attendance counters for new classes
    const newRecords = { ...attendanceRecords };
    extractedSchedulePreview.forEach(cls => {
      if (!newRecords[cls.id]) {
        newRecords[cls.id] = { total: 20, attended: 18, todayStatus: "Present" };
      }
    });
    setAttendanceRecords(newRecords);

    setShowOcrModal(false);
    setExtractedSchedulePreview(null);
    setUploadedImagePreview(null);

    if (onShowToast) {
      onShowToast({
        type: "success",
        message: "Timetable screenshot parsed & imported! Daily self-attendance radar activated."
      });
    }
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title) return;

    const newItem = {
      id: `rem-${Date.now()}`,
      courseCode: "STUDY",
      courseTitle: newReminder.title,
      day: selectedDay,
      time: `${newReminder.time} - Review Session`,
      room: newReminder.room,
      buildingId: "library",
      buildingName: "Central Library",
      floor: "Level 2",
      professor: "Self Study",
      type: "Personal Block",
      status: "Scheduled",
      attendanceRate: "100%"
    };

    setScheduleList([...scheduleList, newItem]);
    setShowAddReminderModal(false);
    setNewReminder({ title: "", time: "15:00", room: "Library Pod" });
    if (onShowToast) {
      onShowToast({ type: "success", message: `Added study session '${newItem.courseTitle}' to schedule!` });
    }
  };

  return (
    <div id="timetable-hub-container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Banner: Timetable Screenshot Import & Daily Attendance Controls */}
      <div
        className="glass-panel"
        style={{
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.25rem",
          background: "linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(16, 185, 129, 0.08))",
          border: "1px solid rgba(255, 107, 0, 0.28)"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span className="badge badge-indigo">
              Iter-help Smart Routine
            </span>
            <span className="badge badge-emerald">
              AI Timetable Scanner & Auto-Attendance
            </span>
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            Timetable Radar & Automated Self-Attendance
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Upload or paste any college routine screenshot to auto-generate schedules, classes, and track daily attendance.
          </p>
        </div>

        {/* Action Buttons: Screenshot Scanner & Auto-Checkin */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
          <button
            id="open-timetable-screenshot-scanner-btn"
            className="btn-primary"
            onClick={() => setShowOcrModal(true)}
            style={{ padding: "0.65rem 1.25rem" }}
          >
            <Camera size={16} />
            <span>Scan Timetable Screenshot</span>
          </button>

          <button
            id="auto-mark-today-attendance-btn"
            className="btn-accent"
            onClick={handleAutoMarkTodayAll}
            style={{ padding: "0.65rem 1.25rem" }}
          >
            <Zap size={16} />
            <span>Auto-Checkin Today (100%)</span>
          </button>
        </div>
      </div>

      {/* Attendance Metrics & Safe Bunk Radar Dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
        {/* Metric 1: Overall Attendance */}
        <div className="glass-panel" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "14px",
              background: parseFloat(overallPercentage) >= 75 ? "rgba(16, 185, 129, 0.2)" : "rgba(244, 63, 94, 0.2)",
              color: parseFloat(overallPercentage) >= 75 ? "#34d399" : "#fb7185",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
              Overall Attendance
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.1 }}>
              {overallPercentage}%
            </div>
            <div style={{ fontSize: "0.72rem", color: parseFloat(overallPercentage) >= 75 ? "#10b981" : "#f43f5e", fontWeight: 600 }}>
              {parseFloat(overallPercentage) >= 75 ? "✓ Eligible for Exams (>75%)" : "⚠️ Below 75% Cutoff Criteria"}
            </div>
          </div>
        </div>

        {/* Metric 2: Safe Bunk Calculator */}
        <div className="glass-panel" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "14px",
              background: "rgba(255, 107, 0, 0.18)",
              color: "#fb923c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
              Safe Bunk Allowance
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.1 }}>
              3 Lectures Safe
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Can skip 3 classes without dropping below 75%
            </div>
          </div>
        </div>

        {/* Metric 3: Classroom Geofence Sensor Status */}
        <div className="glass-panel" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "14px",
              background: autoGeofenceEnabled ? "rgba(6, 182, 212, 0.2)" : "rgba(255, 255, 255, 0.05)",
              color: autoGeofenceEnabled ? "#22d3ee" : "var(--text-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <Radio size={24} className={autoGeofenceEnabled ? "pulse-beacon" : ""} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
                Campus Geofence
              </span>
              <button
                id="toggle-geofence-btn"
                onClick={() => setAutoGeofenceEnabled(!autoGeofenceEnabled)}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: autoGeofenceEnabled ? "#34d399" : "var(--text-dim)",
                  background: "none",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {autoGeofenceEnabled ? "ACTIVE ✓" : "DISABLED"}
              </button>
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", marginTop: "0.15rem" }}>
              {autoGeofenceEnabled ? "Detected: Block A (Level 2)" : "Manual Logging Mode"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#34d399" }}>
              Auto-marks present during lecture slot
            </div>
          </div>
        </div>

        {/* Metric 4: Daily Attendance Streak */}
        <div className="glass-panel" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "14px",
              background: "rgba(245, 158, 11, 0.2)",
              color: "#fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
              Attendance Streak
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fbbf24", lineHeight: 1.1 }}>
              14 Days Active
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Top 5% student regularity in CSE
            </div>
          </div>
        </div>
      </div>

      {/* Next Class Live Radar Hero Card */}
      {nextClass && (
        <div
          className="glass-panel"
          style={{
            background: "linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(6, 9, 14, 0.95))",
            border: "1px solid rgba(255, 107, 0, 0.35)",
            borderRadius: "var(--radius-xl)",
            padding: "1.75rem",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Background Ambient Glow */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(255, 107, 0, 0.22) 0%, transparent 70%)",
              pointerEvents: "none"
            }}
          />

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
            <div style={{ maxWidth: "600px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span className="badge badge-amber" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Clock size={12} />
                  <span>STARTS IN {nextClass.minutesUntil} MINS</span>
                </span>
                <span className="badge badge-indigo">
                  {nextClass.courseCode}
                </span>
                <span className="badge badge-emerald">
                  Status: {attendanceRecords[nextClass.id]?.todayStatus || "Present"}
                </span>
              </div>

              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.4rem" }}>
                {nextClass.courseTitle}
              </h2>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Clock size={16} color="var(--accent-indigo)" />
                  <span>{nextClass.time}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <MapPin size={16} color="#10b981" />
                  <span style={{ color: "#34d399", fontWeight: 600 }}>{nextClass.room}</span>
                  <span>({nextClass.buildingName})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <UserCheck size={16} color="var(--text-dim)" />
                  <span>{nextClass.professor}</span>
                </div>
              </div>
            </div>

            {/* Quick 1-Click Navigate Button */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
              <button
                id="radar-navigate-to-class-btn"
                className="btn-accent"
                onClick={() => onNavigateToClass(nextClass.buildingId, nextClass.room)}
                style={{ padding: "0.85rem 1.5rem", fontSize: "0.95rem" }}
              >
                <Navigation size={18} />
                <span>Navigate to Classroom Now</span>
              </button>
              <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
                Calculates step-free route from current location
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Controls & Day Selector */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
            <button
              key={day}
              id={`timetable-day-${day.toLowerCase()}`}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                fontWeight: 700,
                background: selectedDay === day ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.04)",
                color: selectedDay === day ? "#ffffff" : "var(--text-muted)",
                border: selectedDay === day ? "1px solid var(--accent-indigo)" : "1px solid var(--border-subtle)"
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            id="open-upload-modal-inline-btn"
            className="btn-secondary"
            onClick={() => setShowOcrModal(true)}
            style={{ fontSize: "0.825rem" }}
          >
            <Upload size={15} />
            Import Screenshot
          </button>

          <button
            id="add-study-block-btn"
            className="btn-secondary"
            onClick={() => setShowAddReminderModal(true)}
            style={{ fontSize: "0.825rem" }}
          >
            <Plus size={15} />
            Add Custom Period
          </button>
        </div>
      </div>

      {/* Class Schedule Cards Grid with Daily Self-Attendance Toggles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(370px, 1fr))", gap: "1.25rem" }}>
        {filteredSchedule.map((cls, idx) => {
          const rec = attendanceRecords[cls.id] || { total: 20, attended: 18, todayStatus: "Pending" };
          const classPct = rec.total > 0 ? ((rec.attended / rec.total) * 100).toFixed(0) : 90;
          const isPresent = rec.todayStatus === "Present";
          const isAbsent = rec.todayStatus === "Absent";

          return (
            <div
              key={`${cls.id}-${selectedDay}`}
              id={`schedule-card-${cls.id}`}
              className={`glass-panel fade-in-stagger-${(idx % 6) + 1}`}
              style={{
                padding: "1.35rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.2rem",
                borderTop: cls.isNext ? "3px solid #f59e0b" : "3px solid var(--border-subtle)"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                  <span className="badge badge-indigo">
                    {cls.courseCode}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: parseInt(classPct) >= 75 ? "#34d399" : "#fb7185", fontWeight: 700 }}>
                    <TrendingUp size={14} />
                    <span>{classPct}% Attendance ({rec.attended}/{rec.total})</span>
                  </div>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.35rem", lineHeight: 1.3 }}>
                  {cls.courseTitle}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginBottom: "0.75rem" }}>
                  {cls.type} • {cls.professor}
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.65rem 0.85rem",
                    fontSize: "0.8rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                    marginBottom: "0.85rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
                    <Clock size={14} color="var(--accent-indigo)" />
                    <span>{cls.time}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-main)" }}>
                    <MapPin size={14} color="#10b981" />
                    <span style={{ fontWeight: 600 }}>{cls.room}</span>
                    <span style={{ color: "var(--text-dim)" }}>({cls.floor})</span>
                  </div>
                </div>

                {/* Daily Self-Attendance Controls for this lecture */}
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.65rem",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
                      Daily Self-Attendance:
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: isPresent ? "#34d399" : isAbsent ? "#fb7185" : "#fbbf24"
                      }}
                    >
                      {rec.todayStatus === "Present" ? "✓ Attended" : rec.todayStatus === "Absent" ? "✕ Absent" : "⏳ Pending"}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                    <button
                      id={`mark-present-btn-${cls.id}`}
                      onClick={() => handleMarkAttendance(cls.id, "Present")}
                      style={{
                        padding: "0.4rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: isPresent ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.05)",
                        border: isPresent ? "1px solid #10b981" : "1px solid var(--border-subtle)",
                        color: isPresent ? "#34d399" : "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.3rem",
                        cursor: "pointer"
                      }}
                    >
                      <Check size={13} />
                      <span>Present</span>
                    </button>

                    <button
                      id={`mark-absent-btn-${cls.id}`}
                      onClick={() => handleMarkAttendance(cls.id, "Absent")}
                      style={{
                        padding: "0.4rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: isAbsent ? "rgba(244, 63, 94, 0.3)" : "rgba(255, 255, 255, 0.05)",
                        border: isAbsent ? "1px solid #f43f5e" : "1px solid var(--border-subtle)",
                        color: isAbsent ? "#fb7185" : "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.3rem",
                        cursor: "pointer"
                      }}
                    >
                      <X size={13} />
                      <span>Bunked / Absent</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <button
                id={`class-nav-btn-${cls.id}`}
                className="btn-secondary"
                onClick={() => onNavigateToClass(cls.buildingId, cls.room)}
                style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem", padding: "0.55rem" }}
              >
                <Navigation size={14} />
                Directions to Lecture Room
              </button>
            </div>
          );
        })}
      </div>

      {/* AI Timetable Screenshot Scanner Modal */}
      {showOcrModal && (
        <div className="modal-overlay" onClick={() => setShowOcrModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "680px", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: "0.4rem" }}>
                  AI Timetable Computer Vision Engine
                </span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800 }}>
                  Upload / Paste Timetable Screenshot
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Snap a photo of your college notice board or ERP routine. Iter-help will extract days, periods, cabin numbers, and set up daily self-attendance automatically.
                </p>
              </div>
              <button
                id="close-ocr-modal-btn"
                onClick={() => setShowOcrModal(false)}
                style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Upload Area / Dropzone */}
            {!uploadedImagePreview && (
              <div
                style={{
                  border: "2px dashed rgba(255, 107, 0, 0.4)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.5rem 1.5rem",
                  textAlign: "center",
                  background: "rgba(255, 107, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(255, 107, 0, 0.15)",
                    color: "var(--accent-orange)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Camera size={28} />
                </div>

                <div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)" }}>
                    Drag & Drop Timetable Screenshot Here
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                    Supports PNG, JPG, JPEG, PDF screenshots from ITER / SOA Student Portal
                  </div>
                </div>

                {/* Simulated file upload or sample trigger */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
                  <label
                    id="browse-timetable-file-label"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.6rem 1.25rem",
                      background: "var(--accent-indigo)",
                      color: "#ffffff",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    <Upload size={15} />
                    <span>Browse Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={() => handleSimulateScreenshotUpload("user-uploaded")}
                    />
                  </label>

                  <button
                    id="load-sample-timetable-screenshot-btn"
                    className="btn-secondary"
                    onClick={() => handleSimulateScreenshotUpload("sample-iter-routine")}
                    style={{ fontSize: "0.85rem" }}
                  >
                    <FileImage size={15} />
                    <span>Load Sample ITER Routine Screenshot</span>
                  </button>
                </div>
              </div>
            )}

            {/* Scanning Laser Animation View */}
            {ocrScanning && (
              <div style={{ padding: "2rem 1rem", textAlign: "center" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "140px",
                    background: "rgba(15, 23, 42, 0.8)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem"
                  }}
                >
                  {/* Visual laser sweep line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, transparent, #34d399, #10b981, transparent)",
                      boxShadow: "0 0 14px #10b981",
                      animation: "pulseGlow 1.2s infinite ease-in-out"
                    }}
                  />
                  <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <RefreshCw size={16} className="pulse-beacon" />
                    <span>AI Vision OCR: Scanning routine matrix & room codes...</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <div style={{ color: ocrStep >= 1 ? "#34d399" : "var(--text-dim)" }}>
                    {ocrStep >= 1 ? "✓" : "○"} Detected 5 Weekday Columns & 4 Lecture Slots
                  </div>
                  <div style={{ color: ocrStep >= 2 ? "#34d399" : "var(--text-dim)" }}>
                    {ocrStep >= 2 ? "✓" : "○"} Extracted Subject Codes: CS402, AI310, IOT305, MATH240, ENG205
                  </div>
                  <div style={{ color: ocrStep >= 3 ? "#34d399" : "var(--text-dim)" }}>
                    {ocrStep >= 3 ? "✓" : "○"} Linked Lecture Halls & Faculty Cabins (A-308, C-214, A-105)
                  </div>
                </div>
              </div>
            )}

            {/* Extracted Schedule Preview & Confirmation */}
            {extractedSchedulePreview && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#34d399", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <CheckCircle2 size={16} />
                    <span>Successfully Extracted {extractedSchedulePreview.length} Lectures from Screenshot!</span>
                  </div>
                  <span className="badge badge-indigo">
                    Ready to Import
                  </span>
                </div>

                <div
                  style={{
                    maxHeight: "220px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.75rem",
                    background: "rgba(0,0,0,0.2)"
                  }}
                >
                  {extractedSchedulePreview.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.5rem 0.75rem",
                        background: "rgba(255, 255, 255, 0.04)",
                        borderRadius: "6px",
                        fontSize: "0.8rem"
                      }}
                    >
                      <div>
                        <strong style={{ color: "var(--text-main)" }}>{item.courseCode}</strong> - {item.courseTitle}
                        <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
                          {item.day} • {item.time} • {item.room}
                        </div>
                      </div>
                      <span className="badge badge-emerald" style={{ fontSize: "0.65rem" }}>
                        Auto-Matched
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setExtractedSchedulePreview(null);
                      setUploadedImagePreview(null);
                    }}
                  >
                    Scan Another Image
                  </button>
                  <button
                    id="confirm-import-timetable-btn"
                    className="btn-accent"
                    onClick={handleApplyExtractedSchedule}
                  >
                    <CheckCircle2 size={16} />
                    Confirm & Apply to Timetable
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Custom Period Modal */}
      {showAddReminderModal && (
        <div className="modal-overlay" onClick={() => setShowAddReminderModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>
              Schedule Custom Study / Project Block
            </h3>
            <form onSubmit={handleAddReminder}>
              <div className="form-group">
                <label className="form-label">Activity Title</label>
                <input
                  id="study-reminder-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Distributed Cloud Project Prep"
                  value={newReminder.title}
                  onChange={e => setNewReminder({ ...newReminder, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    id="study-reminder-time"
                    type="time"
                    className="form-input"
                    value={newReminder.time}
                    onChange={e => setNewReminder({ ...newReminder, time: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location / Pod</label>
                  <input
                    id="study-reminder-room"
                    type="text"
                    className="form-input"
                    value={newReminder.room}
                    onChange={e => setNewReminder({ ...newReminder, room: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddReminderModal(false)}
                >
                  Cancel
                </button>
                <button
                  id="confirm-add-reminder-btn"
                  type="submit"
                  className="btn-primary"
                >
                  Save to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
