import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ProductionChart() {
  // Temporary Sample Data
  // Later we'll fetch this from the backend
  const data = [
    { month: "Jan", production: 12 },
    { month: "Feb", production: 18 },
    { month: "Mar", production: 15 },
    { month: "Apr", production: 22 },
    { month: "May", production: 28 },
    { month: "Jun", production: 20 },
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        📈 Monthly Production
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="production"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ProductionChart;