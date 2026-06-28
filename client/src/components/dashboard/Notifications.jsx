function Notifications() {
  const notifications = [
    {
      title: "Pending Sales",
      value: "4 Sarees",
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Pending Production",
      value: "3 Looms",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Idle Looms",
      value: "2 Looms",
      color: "bg-gray-100 text-gray-700",
    },
    {
      title: "Active Weavers",
      value: "10 Weavers",
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        🔔 Notifications
      </h2>

      <div className="space-y-4">

        {notifications.map((item, index) => (

          <div
            key={index}
            className={`${item.color} rounded-xl p-4 flex justify-between items-center`}
          >

            <span className="font-semibold">
              {item.title}
            </span>

            <span className="font-bold">
              {item.value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;