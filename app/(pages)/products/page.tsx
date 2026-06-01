import AwardsTicker from "@/app/components/AwardsTicker";
import CallToAction from "@/app/components/CallToAction";
import HowItWorks from "@/app/components/HowPowerstoveWorks";
import ProductsSection from "@/app/components/ProductsSection";
import RecycleImage from "@/app/components/RecycleImage";



export default function Page() {
  return (
  <>
       {/*Products  Section */}
     <section className="bg-[#f8f8f8] flex flex-col items-center justify-center text-center px-6 py-16 sm:py-28">
  <p className="text-[#FF9500] font-bold text-xs sm:text-sm uppercase tracking-widest">
    POWERSTOVE PRODUCT LINE
  </p>

  <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
    Sustainable Energy Solutions For Every Need
  </h1>

  <p className="mt-4 sm:mt-6 text-gray-500 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
    From clean cookstoves that generate electricity to affordable biomass
    pellets — Powerstove has the right solution for your home or business.
  </p>
</section>

        <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="rounded-2xl overflow-hidden w-full h-64 sm:h-120">
        <img
          src="/products.webp"
          alt="Recycling symbol on blue bin"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
            
            <AwardsTicker />

            <ProductsSection />



        {/* How Powerstove Works Section */}
                <HowItWorks />

        <CallToAction />
  </>

  )
}