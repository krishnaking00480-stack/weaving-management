function RecentActivities() {
  const activities = [
    "🧵 Loom L001 Started Production",
    "🏭 Saree Completed on Loom L005",
    "📦 Material Added for Loom L003",
    "🛒 New Purchase Added",
    "💰 Saree Received from Weaver",
    "👷 New Weaver Joined",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        📋 Recent Activities
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded-lg"
          >
            <p className="text-gray-700">
              {activity}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentActivities;