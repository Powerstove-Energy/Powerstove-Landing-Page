const stats = [
  { value: "53,625+", label: "Households Reached" },
  { value: "70%", label: "Fuel Savings" },
  { value: "Up to 50W", label: "Electricity Generated" },
  { value: "40+", label: "Global Awards" },
];

export default function StatsBanner() {
  return (
    <section className="bg-[#F8F8F8] py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {stat.value}
            </span>
            <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            <span className="text-sm text-gray-500 mt-1">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}