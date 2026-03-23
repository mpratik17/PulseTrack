import "../styles/components.css";

function WeeklyChart({ readings }) {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();
  const recentReadings = readings.filter((r) => last7Days.includes(r.date));

  // Calculate averages
  const avgSystolic = recentReadings.length > 0
    ? Math.round(recentReadings.reduce((sum, r) => sum + r.systolic, 0) / recentReadings.length)
    : 0;
  const avgDiastolic = recentReadings.length > 0
    ? Math.round(recentReadings.reduce((sum, r) => sum + r.diastolic, 0) / recentReadings.length)
    : 0;

  const getBPStatus = (sys, dia) => {
    if (sys >= 180 || dia >= 120) {
    return { label: "Crisis 🚨", color: "#8b0000" };
  }
  if (sys >= 140 || dia >= 90) {
    return { label: "Stage 2", color: "#ff4444" };
  }
  if ((sys >= 130 && sys <= 139) || (dia >80 && dia <= 89)) {
    return { label: "Stage 1", color: "#ff9500" };
  }
  if (sys > 120 && sys <= 129 && dia <= 80) {
    return { label: "Elevated", color: "#ffd700" };
  }
  if(sys <= 120 && dia <= 80) 
  return { label: "Normal", color: "#00ff9c" };
return { label: "Unknown", color: "#ccc" };
  };

  const status = avgSystolic > 0 ? getBPStatus(avgSystolic, avgDiastolic) : null;

  return (
    <div className="weekly-chart-card">
      <h2>📊 Weekly Summary</h2>
      
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">Avg Systolic</div>
          <div className="stat-value">{avgSystolic || "-"}</div>
          <div className="stat-unit">mmHg</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Avg Diastolic</div>
          <div className="stat-value">{avgDiastolic || "-"}</div>
          <div className="stat-unit">mmHg</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Status</div>
          <div className="stat-value" style={{ color: status?.color || "#666" }}>
            {status?.label || "No Data"}
          </div>
          <div className="stat-unit">Last 7 days</div>
        </div>
      </div>

      {recentReadings.length === 0 && (
        <div className="empty-state">
          <p>📈 No readings yet. Start tracking your BP!</p>
        </div>
      )}
    </div>
  );
}

export default WeeklyChart;
