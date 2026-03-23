import "../styles/components.css";

function BPList({ readings }) {
  const getLast7DaysReadings = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return readings.filter((r) => new Date(r.date) >= sevenDaysAgo);
  };

  const recentReadings = getLast7DaysReadings();

  const getBPStatus = (sys, dia) => {
  if (sys >= 180 || dia >= 120) {
    return { label: "Crisis 🚨", color: "#8b0000" };
  }
  if (sys >= 140 || dia >= 90) {
    return { label: "Stage 2", color: "#ff4444" };
  }
  if ((sys >= 130 && sys <= 139) || (dia > 80 && dia <= 89)) {
    return { label: "Stage 1", color: "#ff9500" };
  }
  if (sys > 120 && sys <= 129 && dia <= 80) {
    return { label: "Elevated", color: "#ffd700" };
  }
  if(sys <= 120 && dia <= 80) {
  return { label: "Normal", color: "#00ff9c" };
  }
  return { label: "Unknown", color: "#ccc" };
};

  return (
    <div className="bp-list-card">
      <h2>📋 Recent Readings</h2>
      <p className="card-subtitle">Last 7 days</p>

      {recentReadings.length === 0 ? (
        <div className="empty-state">
          <p>No readings in the last 7 days</p>
        </div>
      ) : (
        <div className="readings-list">
          {recentReadings
            .slice()
            .reverse()
            .map((reading, idx) => {
              const status = getBPStatus(reading.systolic, reading.diastolic);
              return (
                <div key={idx} className="reading-item">
                  <div className="reading-header">
                    <span className="bp-value">
                      {reading.systolic}/{reading.diastolic} mmHg
                    </span>
                    <span className="status-badge" style={{ background: status.color }}>
                      {status.label}
                    </span>
                  </div>
                  <div className="reading-meta">
                    {new Date(reading.date).toLocaleDateString()} at {reading.time}
                    {reading.pulse && ` • Pulse: ${reading.pulse} bpm`}
                  </div>
                  {reading.notes && (
                    <div className="reading-notes">{reading.notes}</div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default BPList;
