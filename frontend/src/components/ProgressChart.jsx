import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function ProgressChart({ tasks }) {

  const todo = tasks.filter(t => t.status === "To Do").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const done = tasks.filter(t => t.status === "Done").length;
  const total = tasks.length;

  const completionPercent = total === 0 ? 0 : Math.round((done / total) * 100);

  const barData = [
    { name: "To Do", value: todo },
    { name: "In Progress", value: inProgress },
    { name: "Done", value: done }
  ];

  const pieData = [
    { name: "Completed", value: done },
    { name: "Remaining", value: total - done }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div data-testid="progress-chart" style={{ width: "100%", padding: "40px 0" }}>
      <h2 style={{ color:"white",textAlign: "center", marginBottom: "20px" }}>
        Task Progress Overview
      </h2>

      {/* Bar Chart */}
      <div style={{ marginLeft:"500px",width: "50%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Completion Percentage */}
      <h3 style={{ color:"white", textAlign: "center", marginTop: "30px" }}>
        Completion: {completionPercent}%
      </h3>

      {/* Pie Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
