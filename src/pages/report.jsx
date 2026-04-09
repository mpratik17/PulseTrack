import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/report.css";
import emailjs from "emailjs-com";
import { jsPDF } from "jspdf";
import BPGraph from "../components/graph";

function Report() {
  const navigate = useNavigate();
  const [readings, setReadings] = useState([]);
  const [email, setEmail] = useState("");
  const [showRec, setShowRec] = useState(false);
  const [loadingRec, setLoadingRec] = useState(false);
  const [step, setStep] = useState(0);

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
  PULSETRACK REPORT

  Average BP: ${avgSys}/${avgDia} mmHg
  Classification: ${classification}

  Insight:
  ${insight}

  Foods: ${rec.foods.join(", ")}
  Avoid: ${rec.avoid.join(", ")}
  Lifestyle: ${rec.lifestyle.join(", ")}

  Stay healthy 💙
  `;

  const templateParams = {
    to_email: email,
    message: reportText,
  };

  emailjs
    .send(
       import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        templateParams,
        import.meta.env.VITE_EMAIL_KEY    
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
  const doc = new jsPDF();

  doc.text("PULSETRACK REPORT", 20, 20);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
  doc.text(`Average BP: ${avgSys}/${avgDia}`, 20, 40);
  doc.text(`Classification: ${classification}`, 20, 50);

  doc.text("Insight:", 20, 65);
  doc.text(insight, 20, 75);

  doc.text("Foods:", 20, 95);
  doc.text(rec.foods.join(", "), 20, 105);

  doc.text("Avoid:", 20, 120);
  doc.text(rec.avoid.join(", "), 20, 130);

  doc.text("Lifestyle:", 20, 145);
  doc.text(rec.lifestyle.join(", "), 20, 155);

  doc.save("PulseTrack_Report.pdf");
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
  // 🔥 Dynamic Recommendations
const getRecommendations = (classification) => {
  switch (classification) {
    case "Normal":
      return {
        foods: ["Continue balanced diet", "Fruits & vegetables", "Stay hydrated"],
        avoid: ["Excess junk food"],
        lifestyle: ["Maintain routine", "Light exercise", "Good sleep"],
      };

    case "Elevated":
      return {
        foods: ["Leafy greens", "Oats", "Bananas"],
        avoid: ["Reduce salt", "Processed food"],
        lifestyle: ["Daily walking", "Reduce stress"],
      };

    case "Hypertension Stage 1":
      return {
        foods: ["Low sodium diet", "Fruits", "Whole grains"],
        avoid: ["Salt", "Sugary drinks"],
        lifestyle: ["Exercise 30 min", "Meditation", "Weight control"],
      };

    case "Hypertension Stage 2":
      return {
        foods: ["Strict low salt diet", "Vegetables", "Potassium rich foods"],
        avoid: ["High sodium", "Alcohol", "Fast food"],
        lifestyle: ["Regular monitoring", "Consult doctor", "Stress control"],
      };

    case "Hypertensive Crisis 🚨":
      return {
        foods: ["Emergency care needed"],
        avoid: ["Do NOT ignore symptoms"],
        lifestyle: ["🚨 Visit hospital immediately"],
      };

    default:
      return { foods: [], avoid: [], lifestyle: [] };
  }
};

// 🔥 Insight
const getInsight = () => {

  if (avgSys >= 180 || avgDia >= 120)
    return "🚨 Hypertensive Crisis! Your BP is dangerously high. Seek immediate medical help.";

  if (avgSys >= 140 || avgDia >= 90)
    return "⚠️ Your BP falls under Stage 2 Hypertension. Strong lifestyle changes and medical consultation are recommended.";

  if ((avgSys >= 130 && avgSys <= 139) || (avgDia > 80 && avgDia <= 89))
    return "⚠️ Your BP is in Stage 1 Hypertension. Monitor regularly and improve diet, exercise, and stress levels.";

  if (avgSys > 120 && avgSys <= 129 && avgDia < 80)
    return "🙂 Your BP is slightly elevated. It’s a warning stage — maintain a healthy lifestyle.";

  if (avgSys <= 120 && avgDia <= 80)
    return "✅ Your BP is normal. Keep maintaining your healthy routine!";

  return "No sufficient data available.";
};

const rec = getRecommendations(classification);
const insight = getInsight();

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

      <BPGraph readings={weekReadings} />

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

  {!showRec ? (
    <div className="generate-box">
      <button
        onClick={() => {
          setLoadingRec(true);

          setTimeout(() => {
            setShowRec(true);
            setLoadingRec(false);

            setTimeout(() => setStep(1), 300);
            setTimeout(() => setStep(2), 800);
            setTimeout(() => setStep(3), 1300);
            setTimeout(() => setStep(4), 1800);

          }, 1200);
        }}
        className="generate-btn"
      >
        {loadingRec ? "⏳ Generating..." : "⚡ Generate"}
      </button>
    </div>
  ) : (
    <>
      {step >= 1 && <p className="insight">{insight}</p>}

      {step >= 2 && (
        <div className="rec-section fade-in">
          <h3>✅ Foods to Eat</h3>
          <ul>
            {rec.foods.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}

      {step >= 3 && (
        <div className="rec-section fade-in">
          <h3>❌ Foods to Avoid</h3>
          <ul>
            {rec.avoid.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}

      {step >= 4 && (
        <div className="rec-section fade-in">
          <h3>🏃‍♂️ Lifestyle Changes</h3>
          <ul>
            {rec.lifestyle.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
    </>
  )}
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
