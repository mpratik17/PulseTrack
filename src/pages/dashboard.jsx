import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BPEntry from "../components/BPEntry";
import WeeklyChart from "../components/WeeklyChart";
import BPList from "../components/BPList";
import ChatBot from "../components/ChatBot";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("bp_readings");
    if (stored) {
      setReadings(JSON.parse(stored));
    }
  }, []);

  const addReading = (newReading) => {
    const updated = [...readings, newReading];
    setReadings(updated);
    localStorage.setItem("bp_readings", JSON.stringify(updated));
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dash-header">
        <div className="header-left">
          <div className="pulse-icon">❤️</div>
          <div>
            <h1>PulseTrack</h1>
            <p>Blood Pressure Monitor</p>
          </div>
        </div>
        <div className="header-right">
          <button className="report-btn" onClick={() => navigate("/report")}>
            📊 Report
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="dash-content">
        <div className="left-section">
          <BPEntry onAdd={addReading} />
        </div>
        <div className="right-section">
          <WeeklyChart readings={readings} />
          <BPList readings={readings} />
        </div>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}

export default Dashboard;
