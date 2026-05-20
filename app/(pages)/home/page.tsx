import Link from "next/link";
import CallToAction from "@/app/components/CallToAction";
import RenewableServices from "@/app/components/RenewableServices";
import RecycleImage from "@/app/components/RecycleImage";
import StatsBanner from "@/app/components/StatsBanner";
import AwardsTicker from "@/app/components/AwardsTicker";
import Partners from "@/app/components/Partners";




const purposes = [
  {
    title: "Smokeless Cooking",
    desc: "Eliminates toxic indoor air pollution that kills 4 million people annually — protecting women and children most at risk.",
  },
  {
    title: "Fuel Independence",
    desc: "Uses locally-produced GoodLife biomass pellets, reducing dependence on charcoal and firewood by up to 70%.",
  },
  {
    title: "Income Generation",
    desc: "Empowers women as pellet entrepreneurs and clean energy distributors at the heart of a new green economy.",
  },
];

export default function Section() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#F8F8F8] flex flex-col items-center justify-center text-center px-6 py-28">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-5xl">
          Empowering Homes And Businesses With Sustainable Energy
        </h1>
        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
          The world&apos;s first clean cookstove with built-in IoT — smokeless,
          cooks 5x faster, and generates up to 50W of electricity for African
          homes and businesses.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/buy"
            className="px-6 py-3 rounded-md text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#FF9500" }}
          >
            Buy Product
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-md text-sm font-semibold text-gray-800 border border-gray-300 hover:bg-gray-100 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      <RecycleImage />

      <StatsBanner />

      <AwardsTicker />


       {/* Our Purpose Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden w-full h-72 sm:h-96 relative">
        <img
          src="/purpose.png"
          alt="Solar panels representing sustainable energy"
          className="w-full h-full object-cover"
        />
      </div>
 
        {/* Content */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
            Our Purpose
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Our Journey Toward A Greener Future
          </h2>
          <div className="mt-3 w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
          <p className="mt-5 text-gray-500 leading-relaxed">
            Every day, millions of women across sub-Saharan Africa breathe toxic smoke and walk
            dangerous distances for firewood. Powerstove was founded to change this - delivering
            a cleaner, smarter, and safer way to cook that also generates electricity for families
            with no grid access.
          </p>
 
          <ul className="mt-8 space-y-6">
            {purposes.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span
                  className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FF950020" }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#FF9500" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* Our Evolution / Timeline Section */}
      <section className="bg-[#F8F8F8] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
              Our Story
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Our Evolution: Building A Greener Future
            </h2>
            <div className="mt-3 w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            <p className="mt-5 text-gray-500 leading-relaxed">
              From a single prototype in Abuja to 50,000+ households across Nigeria — our journey
              is one of relentless innovation, community trust, and a mission to make clean energy
              accessible to every family.
            </p>
          </div>

          {/* Right - Timeline */}
          <div className="relative border-l-2 border-gray-200 pl-8 space-y-10">
            {[
              {
                year: "2016",
                title: "Powerstove Founded",
                desc: "Okay Esse founded Powerstove Africa in Abuja, Nigeria, with a vision to solve indoor air pollution and energy poverty for African households through smart biomass cookstove technology.",
              },
              {
                year: "2018",
                title: "First Awards & Recognition",
                desc: "Won the Cisco Global Problem Solver Challenge (US$25,000) and the TEF-G2 Nigeria award. Launched the first Powerstove X300 prototype and began pilot distribution in Abuja communities.",
              },
              {
                year: "2020",
                title: "Scaling Impact Across Nigeria",
                desc: "Reached 10,000+ households with clean cookstove technology. Launched GoodLife biomass pellet production and the Pay-As-You-Cook micro-financing model to ensure affordability.",
              },
              {
                year: "2021",
                title: "Global Grants & Expansion",
                desc: "Secured USAID, GSMA, AFD and UNDP grants totalling over $300,000. Expanded operations to 5 states across Nigeria and developed the proprietary IoT carbon credit monitoring system.",
              },
              {
                year: "2023",
                title: "Carbon Markets & New Products",
                desc: "Launched real-time IoT carbon credit monetisation platform. Released the T100 Pellet Stove and Solar Box, and began international distribution discussions across East and West Africa.",
              },
            ].map((item) => (
              <div key={item.year} className="relative">
                {/* Dot */}
                <span
                  className="absolute -left-[2.85rem] w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: "#FF9500" }}
                >
                  {item.year.slice(0)}
                </span>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <span className="text-xs font-semibold text-gray-400">{item.year}</span>
                  <h3 className="mt-1 text-base font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <RenewableServices />

        {/* How Powerstove Works Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
                Our Process
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                How Powerstove Works: Planning <br className="hidden sm:block" /> To Powering Your Home
              </h2>
              <div className="mt-3 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  number: "01",
                  title: "Energy Consultation",
                  desc: "We assess your household or business energy needs and recommend the right Powerstove product and pellet plan for your usage.",
                  img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
                },
                {
                  number: "02",
                  title: "Custom System Design",
                  desc: "Our team designs a complete cooking and off-grid power solution — including stove selection, pellet schedule, and IoT setup.",
                  img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
                },
                {
                  number: "03",
                  title: "Professional Installation",
                  desc: "Trained Powerstove distributors deliver and set up your stove, activate the IoT module, and show you how to use it safely.",
                  img: "set.png",
                },
                {
                  number: "04",
                  title: "Activation & Monitoring",
                  desc: "Your stove goes live with real-time data tracking. Monitor usage, carbon savings, and electricity generation from day one.",
                  img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
                },
              ].map((step) => (
                <div key={step.number} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="w-full h-48 overflow-hidden">
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <span className="text-sm font-bold" style={{ color: "#FF9500" }}>{step.number}</span>
                    <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Stories / Testimonials Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
                Real Stories
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Real People. Real Power. Real Impact.
              </h2>
              <div className="mt-3 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "In three months I have used Powerstove, I have saved ₦27,000 on cooking fuel, which has helped me to pay for my children's school fees.",
                  name: "Ugwunwa Ebi Okere",
                  location: "Abuja, Nigeria",
                  avatar: "https://i.pravatar.cc/40?img=47",
                },
                {
                  quote:
                    "I love it when I can continue to charge my phones while cooking with Powerstove and at the same time saving money on charcoal.",
                  name: "Joyce Danjuma",
                  location: "Kano, Nigeria",
                  avatar: "https://i.pravatar.cc/40?img=45",
                },
                {
                  quote:
                    "Without Pay-As-You-Cook Financing from Powerstove, it would have been difficult for me to purchase the stove. No more sending my girls for firewood.",
                  name: "Moumaife John",
                  location: "Jos, Nigeria",
                  avatar: "https://i.pravatar.cc/40?img=68",
                },
              ].map((t) => (
                <div key={t.name} className="bg-[#F8F8F8] rounded-2xl p-6 flex flex-col gap-4 border border-gray-100">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="#FF9500">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <button
                className="px-8 py-3 rounded-md text-sm font-semibold border transition hover:bg-orange-50"
                style={{ color: "#FF9500", borderColor: "#FF9500" }}
              >
                Read More Stories
              </button>
            </div>
          </div>
        </section>


        {/* Impact Stats Section */}
<section className="py-20 px-6" style={{ backgroundColor: "#1A1A1A" }}>
  <div className="max-w-5xl mx-auto text-center">
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
      Our Impact
    </span>
    <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white leading-tight">
      Numbers That Tell The Story
    </h2>
    <div className="mt-3 mx-auto w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />

    <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
      {[
        { value: "53,625+", label: "Women & households reached" },
        { value: "70%", label: "Reduction in cooking fuel spend" },
        { value: "280,625", label: "Tonnes CO₂e mitigated per year" },
        { value: "3.4 MWh", label: "Electricity generated off-grid" },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-2">
          <span className="text-4xl sm:text-5xl font-extrabold" style={{ color: "#FF9500" }}>
            {stat.value}
          </span>
          <span className="text-sm text-gray-400 leading-snug">{stat.label}</span>
        </div>
      ))}
    </div>

    <div className="mt-12">
      <button
        className="px-7 py-3 rounded-md text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: "#FF9500" }}
      >
        View Full Impact Report →
      </button>
    </div>
  </div>
</section>

{/* Global Partners Section */}
  <Partners />


     <CallToAction />
    </main>
  );
}