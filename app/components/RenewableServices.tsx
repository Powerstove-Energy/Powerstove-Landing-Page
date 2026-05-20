const services = [
  {
    category: "Clean Cookstove Technology",
    title: "Powerstove X200 & T100",
    desc: "Advanced stainless-steel burn chambers reaching 1100°C in under 3 minutes. Cook 5x faster, smoke-free. Designed for African households and enterprises.",
    img: "/q.png",
    href: "/products",
  },
  {
    category: "Electricity Generation",
    title: "Energy Storage & Batteries",
    desc: "Generate up to 50 Watts of continuous electricity while cooking. Built-in 4,000mAh lithium battery charges phones, lights, and small appliances — off-grid.",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    href: "/products",
  },
  {
    category: "Biomass Fuel Production",
    title: "GoodLife Pellet Systems",
    desc: "Locally produced biomass briquette pellets from agricultural waste. 70% more efficient than charcoal with zero deforestation impact.",
    img: "/goodlife-pellets.jpeg",
    href: "/products",
  },
  {
    category: "Smart Technology",
    title: "IoT System Upgrades",
    desc: "Pre-programmed sensors and 2G/3G connectivity track fuel usage, carbon offsets, and usage data in real-time — enabling verifiable carbon credit monetisation.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/products",
  },
  {
    category: "Women Empowerment",
    title: "Pay-As-You-Cook Financing",
    desc: "Flexible micro-financing that makes clean cookstoves accessible to households with limited income. Women earn commissions as local pellet entrepreneurs.",
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
    href: "/about",
  },
  {
    category: "Carbon Markets",
    title: "Performance Monitoring",
    desc: "Real-time IoT dashboard monitors stove usage, quantifies carbon savings, and issues verified carbon credits — reinvesting funds into community projects.",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    href: "/about",
  },
];

export default function RenewableServices() {
  return (
    <section className="bg-[#ffffff] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
            What We Offer
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Our Renewable Energy Services
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            Renewable support meets community-first innovation to power a greener Africa.
          </p>
          <div className="mt-4 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-2xl overflow-hidden   ">
              {/* Image */}
              <div className="w-full h-52 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content */}
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
                  {service.category}
                </span>
                <h3 className="mt-1 text-lg font-extrabold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                <a
                  href={service.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition hover:gap-2"
                  style={{ color: "#FF9500" }}
                >
                  View Detail →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}