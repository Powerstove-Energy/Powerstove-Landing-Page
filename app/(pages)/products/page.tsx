import AwardsTicker from "@/app/components/AwardsTicker";
import CallToAction from "@/app/components/CallToAction";
import ProductsSection from "@/app/components/ProductsSection";
import RecycleImage from "@/app/components/RecycleImage";



export default function Page() {
  return (
  <>
       {/*Products  Section */}
      <section className="bg-[#f8f8f8] flex flex-col  items-center justify-center text-center px-6 py-28">

        <p className="mt-6 text-[#FF9500] font-bold text-base sm:text-lg max-w-xl leading-relaxed">
            POWERSTOVE PRODUCT LINE
        </p>
         
       
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
          Sustainable Energy Solutions For Every Need
        </h1>
        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
            From clean cookstoves that generate electricity to affordable
            biomass pellets — Powerstove has the right solution for your home
            or business.
        </p>
        
      </section>

        <RecycleImage />
            
            <AwardsTicker />

            <ProductsSection />



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

        <CallToAction />
  </>

  )
}