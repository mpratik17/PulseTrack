import { useState } from "react";
import "../styles/components.css";

function BPEntry({ onAdd }) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!systolic || !diastolic) {
      alert("Please enter both systolic and diastolic values");
      return;
    }

    const newReading = {
      date: new Date().toISOString().split("T")[0],
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      pulse: pulse ? parseInt(pulse) : null,
      time: new Date().toLocaleTimeString(),
      notes: notes || "",
    };

    onAdd(newReading);

    // Reset form
    setSystolic("");
    setDiastolic("");
    setPulse("");
    setNotes("");

    alert("✅ BP reading recorded!");
  };

  return (
    <div className="bp-entry-card">
      <h2>📝 Record BP Reading</h2>
      <p className="card-subtitle">Enter your blood pressure measurement</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Systolic (mmHg)</label>
          <input
            type="number"
            placeholder="120"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            min="70"
            max="250"
          />
        </div>

        <div className="input-group">
          <label>Diastolic (mmHg)</label>
          <input
            type="number"
            placeholder="80"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            min="40"
            max="150"
          />
        </div>

        <div className="input-group">
          <label>Pulse (optional)</label>
          <input
            type="number"
            placeholder="72"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            min="40"
            max="200"
          />
        </div>

        <div className="input-group">
          <label>Notes (optional)</label>
          <input
            type="text"
            placeholder="After exercise, feeling dizzy, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">
          Record Reading
        </button>
      </form>
    </div>
  );
}

export default BPEntry;
