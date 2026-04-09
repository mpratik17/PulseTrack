import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

function BPGraph({ readings }) {

  const data = readings.map((r) => ({
    date: new Date(r.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    systolic: r.systolic,
    diastolic: r.diastolic,
  }));

  return (
    <div className="report-card">
      <h2>📈 BP Trend (Last 7 Days)</h2>

      <p style={{ color: "#aaa", marginBottom: "10px" }}>
        🟢 Systolic | 🔴 Diastolic
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />

          {/* X Axis */}
          <XAxis dataKey="date" stroke="#aaa" />

          {/* Y Axis */}
          <YAxis domain={[60, 180]} stroke="#aaa" />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid #00ff9c",
            }}
            labelStyle={{ color: "#fff" }}
          />

          {/* 🔥 BP Reference Lines */}
          <ReferenceLine y={120} stroke="#00ff9c" strokeDasharray="5 5" />
          <ReferenceLine y={130} stroke="#ffd700" strokeDasharray="5 5" />
          <ReferenceLine y={140} stroke="#ff4444" strokeDasharray="5 5" />

          {/* Systolic */}
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="#00ff9c"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          {/* Diastolic */}
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="#ff4444"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BPGraph;