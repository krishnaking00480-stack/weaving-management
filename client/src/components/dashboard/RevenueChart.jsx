import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function RevenueChart() {
  // Temporary Sample Data
  // Later we'll fetch this from the backend
  const data = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 61000 },
    { month: "Apr", revenue: 78000 },
    { month: "May", revenue: 94000 },
    { month: "Jun", revenue: 86000 },
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        💰 Monthly Revenue
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `₹ ${Number(value).toLocaleString()}`
              }
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RevenueChart;