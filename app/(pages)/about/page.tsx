import AwardsTicker from "@/app/components/AwardsTicker";
import StatsBanner from "@/app/components/StatsBanner";
import Team from "@/app/components/Team";



const mission = [
  {
    title: "Affordability",
    desc: "We design for the base of the pyramid — with Pay-As-You-Cook financing andlocally produced pellets to ensure no family is left behind.",
  },
  {
    title: "Innovation",
    desc: "The world's first biomass cookstove with built-in IoT enables real-time carboncredit tracking and data-driven community impact.",
  },
  {
    title: "Women Empowerment",
    desc: "Women are not just customers — they are entrepreneurs, distributors, and leaders within the Powerstove clean-energy value chain.",
  },
];

export default function About() {
  return (
    <>
        {/*about  Section */}
      <section className="bg-[#f8f8f8] flex flex-col  items-center justify-center text-center px-6 py-28">

        <p className="mt-6 text-[#FF9500] font-bold text-base sm:text-lg max-w-xl leading-relaxed">
            WHO WE ARE
        </p>
         
       
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-5xl">
          Empowering Homes And Businesses With Sustainable Energy
        </h1>
        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
            Powerstove Africa manufactures smart, smokeless clean
            cookstoves that generate electricity and save lives across sub-
            Saharan Africa.

         
        </p>
        
      </section>




      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="rounded-2xl overflow-hidden w-full h-64 sm:h-120">
        <img
          src="/about.png"
          alt="Recycling symbol on blue bin"
          className="w-full h-full object-cover"
        />
      </div>
      </section>

          <AwardsTicker />
      
<section className="border-t-4 border-b border-gray-100" style={{ borderTopColor: "#FF9500" }}>
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
    {[
      { value: "53,625+", label: "Households With Clean Cookstoves" },
      { value: "70%", label: "Fuel Savings Per Household" },
      { value: "280,625", label: "Tonnes CO₂e Mitigated Yearly" },
      { value: "40+", label: "Global Awards & Grants" },
    ].map((stat) => (
      <div key={stat.label} className="flex flex-col items-center gap-2">
        <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">{stat.value}</p>
        <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "#FF9500" }} />
        <p className="text-sm text-gray-500">{stat.label}</p>
      </div>
    ))}
  </div>
</section>      


       {/* Our Purpose Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden w-full h-72 sm:h-96 relative">
          <img
            src="/mission.png"
            alt="Solar panels representing sustainable energy"
            className="object-cover"
          />
        </div>
 
        {/* Content */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
            Our Mission
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Our Journey Toward A Greener Future
          </h2>
          <div className="mt-3 w-10 h-1 rounded-full" style={{ backgroundColor: "#FF9500" }} />
          <p className="mt-5 text-gray-500 leading-relaxed">
            Our mission is to develop affordable, sustainable renewable energy
            solutions to cover the energy demand of every community and household
            in developing countries, while freely sharing knowledge in the most
            accessible and convenient ways.
          </p>
 
          <ul className="mt-8 space-y-6">
            {mission.map((item) => (
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


{/* Focus on Design & Function */}

      <section className="bg-[#F8F8F8] py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
            Our Mission
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Focus on{" "}
            <span style={{ color: "#FF9500" }}>Design & Function</span>
          </h2>
          <p className="mt-5 text-gray-500 leading-relaxed">
            Our mission is to develop affordable, sustainable renewable energy solutions to cover
            the energy demand of every community and household in developing countries and freely
            share knowledge in the most affordable and convenient ways.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Our vision is to empower and inspire people around the globe through the power of
            unparalleled pro-poor renewable technologies, reflecting the creative minds and
            innovative technologies that makes Powerstove the world&apos;s premier clean cookstove
            and bio-pellets company.
          </p>
          <a
            href="/contact-us"
            className="mt-8 inline-block px-6 py-3 rounded-md text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#FF9500" }}
          >
            Contact Us
          </a>
        </div>

        {/* Right - Image with play button */}
        <div className="relative rounded-2xl overflow-hidden w-full h-72 sm:h-80">
          <img
            src="/stove.png"
            alt="Powerstove cookstove in kitchen"
            className="w-full h-full object-cover"
          />
          {/* Play button overlay */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-lg hover:scale-105 transition">
              <div
                className="w-5 h-5 rounded-sm"
                style={{ backgroundColor: "#FF9500" }}
              />
            </button>
          </div> */}
        </div>
      </div>
    </section>

    <Team />



      {/* Join Movement */}
      <section className="bg-[#F8F8F8] py-20 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
          Join The Movement
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Ready To Build A Sustainable Future?
        </h2>
        <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
          Join us to save more lives, improve livelihoods, empower women, and preserve the environment.
        </p>
        <a
          href="/contact-us"
          className="mt-8 inline-block px-7 py-3 rounded-md text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#FF9500" }}
        >
          Get in Touch →
        </a>
      </div>
    </section>
            
    </>
  );
}