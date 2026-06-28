function DashboardCards({ stats }) {
  const cards = [
    {
      title: "🧵 Total Looms",
      value: stats.totalLooms,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "🟢 Working Looms",
      value: stats.workingLooms,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "⚪ Idle Looms",
      value: stats.idleLooms,
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
    {
      title: "👷 Total Weavers",
      value: stats.totalWeavers,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "🏭 Productions",
      value: stats.totalProductions,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "🛒 Purchases",
      value: stats.totalPurchases,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "💰 Sales",
      value: stats.totalSales,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      title: "💵 Revenue",
      value: `₹ ${Number(stats.totalRevenue || 0).toLocaleString()}`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bg} rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 border`}
        >
          <h3 className="text-gray-500 font-medium text-sm">
            {card.title}
          </h3>

          <h1 className={`text-4xl font-bold mt-4 ${card.color}`}>
            {card.value}
          </h1>
        </div>
      ))}

    </div>
  );
}

export default DashboardCards;