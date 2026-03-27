import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/report.css";
import emailjs from "emailjs-com";

function Report() {
  const navigate = useNavigate();
  const [readings, setReadings] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("bp_readings");
    if (stored) {
      setReadings(JSON.parse(stored));
    }
  }, []);

  const getLast7DaysReadings = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return readings.filter((r) => new Date(r.date) >= sevenDaysAgo);
  };

  const weekReadings = getLast7DaysReadings();

  const avgSys = weekReadings.length > 0
    ? Math.round(weekReadings.reduce((sum, r) => sum + r.systolic, 0) / weekReadings.length)
    : 0;
  const avgDia = weekReadings.length > 0
    ? Math.round(weekReadings.reduce((sum, r) => sum + r.diastolic, 0) / weekReadings.length)
    : 0;

  const getClassification = (sys, dia) => {
  
  if (sys >= 180 || dia >= 120) return "Hypertensive Crisis 🚨";

  if (sys >= 140 || dia >= 90) return "Hypertension Stage 2";

  if ((sys >= 130 && sys <= 139) || (dia > 80 && dia <= 89))
    return "Hypertension Stage 1";

  if (sys > 120 && sys <= 129 && dia < 80)
    return "Elevated";

  if(sys <= 120 && dia <= 80)
  return "Normal";

  };

  const classification = getClassification(avgSys, avgDia);

 const handleSendEmail = () => {
  if (!email) {
    alert("Please enter your email");
    return;
  }

  const reportText = `
PULSETRACK REPORT :-
Average BP: ${avgSys}/${avgDia}mmHg
Classification: ${classification}
Total Readings: ${weekReadings.length}

Stay healthy 💙
`;

  const templateParams = {
    to_email: email,
    message: reportText,
  };

  emailjs
    .send(
      "service_a252eqh",    
      "template_dkfgkhf",    
      templateParams,
      "1CfKwh3SoJPZl8s7z"     
    )
    .then(() => {
      alert(`📧 Report sent to ${email}!`);
      setEmail("");
    })
    .catch((error) => {
      console.log(error);
      alert("❌ Failed to send email");
    });
};

  const handleDownload = () => {
    const reportText = `
PULSETRACK REPORT
Generated: ${new Date().toLocaleDateString()}

SUMMARY (Last 7 Days)
Total Readings: ${weekReadings.length}
Average BP: ${avgSys}/${avgDia} mmHg
Classification: ${classification}

FOODS TO EAT:
• Leafy greens (spinach, kale)
• Berries (blueberries, strawberries)
• Oats and whole grains
• Fatty fish (salmon, mackerel)
• Bananas (rich in potassium)

FOODS TO AVOID:
• High sodium foods
• Processed meats
• Sugary beverages
• Alcohol (limit intake)

LIFESTYLE TIPS:
• Exercise 30 min daily
• Reduce sodium intake
• Manage stress
• Get adequate sleep (7-9 hours)

Disclaimer: This is for informational purposes only.
Consult a healthcare professional for medical advice.
    `;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PulseTrack_Report_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    alert("📥 Report downloaded!");
  };

  if (weekReadings.length === 0) {
    return (
      <div className="report-container">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <div className="empty-report">
          <h2>⚠️ No Data Available</h2>
          <p>You need at least one BP reading in the last 7 days.</p>
          <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Home
      </button>

      <div className="report-header">
        <h1>📊 Weekly Report</h1>
        <p>Your blood pressure analysis and recommendations</p>
      </div>

      {/* Summary */}
      <div className="report-card">
        <h2>Summary (Last 7 Days)</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-label">Average BP</div>
            <div className="summary-value">{avgSys}/{avgDia}</div>
            <div className="summary-unit">mmHg</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Classification</div>
            <div className="summary-value">{classification}</div>
            <div className="summary-unit">{weekReadings.length} readings</div>
          </div>
        </div>
      </div>

      {/* Understanding BP */}
      <div className="report-card">
        <h2>🫀 What is Blood Pressure?</h2>
        <p>Blood pressure is the force of blood against artery walls.</p>
        <div className="info-grid">
          <div className="info-box">
            <strong>Systolic (top):</strong> Pressure when heart beats
          </div>
          <div className="info-box">
            <strong>Diastolic (bottom):</strong> Pressure when heart rests
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="report-card">
        <h2>💡 Recommendations</h2>

        <div className="rec-section">
          <h3>✅ Foods to Eat</h3>
          <ul>
            <li>Leafy greens (spinach, kale)</li>
            <li>Berries (blueberries, strawberries)</li>
            <li>Oats and whole grains</li>
            <li>Fatty fish (salmon, mackerel)</li>
            <li>Bananas (rich in potassium)</li>
          </ul>
        </div>

        <div className="rec-section">
          <h3>❌ Foods to Avoid</h3>
          <ul>
            <li>High sodium foods ( 2,300 mg/day)</li>
            <li>Processed meats and deli items</li>
            <li>Sugary beverages</li>
            <li>Alcohol (limit consumption)</li>
          </ul>
        </div>

        <div className="rec-section">
          <h3>🏃‍♂️ Lifestyle Changes</h3>
          <ul>
            <li>Exercise 30 minutes daily</li>
            <li>Reduce sodium intake</li>
            <li>Manage stress (meditation, yoga)</li>
            <li>Get adequate sleep (7-9 hours)</li>
            <li>Quit smoking</li>
          </ul>
        </div>
      </div>

      {/* Email/Download */}
      <div className="report-card">
        <h2>📧 Send Report</h2>
        <div className="email-section">
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="action-buttons">
            <button onClick={handleSendEmail}>Send to Email 📩</button>
            <button onClick={handleDownload}> ⬇️ Download Report</button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        ⚠️❗ Disclaimer: This report is for informational purposes only.
        Always consult a healthcare professional for medical advice.
      </div>
    </div>
  );
}

export default Report;
