import AwardsRecognitions from "@/app/components/AwardsRecognitions";
import AwardsTicker from "@/app/components/AwardsTicker";
import CallToAction from "@/app/components/CallToAction";
import Partners from "@/app/components/Partners";
import RecycleImage from "@/app/components/RecycleImage";



export default function Page() {
  return (
  <>
       {/*partners  Section */}
      <section className="bg-[#f8f8f8] flex flex-col  items-center justify-center text-center px-6 py-28">
        <p className="mt-6 text-[#FF9500] font-bold text-base sm:text-lg max-w-xl leading-relaxed">
            VISIBLE TRACK RECORD
        </p>
         
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
          Partners & Recognition
        </h1>
        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
            Those that trust us beyond our customers.
        </p>
        
      </section>

        <RecycleImage />
            
        <AwardsTicker />

        <Partners />

        <AwardsRecognitions /> 
        

        <CallToAction />
  </>

  )
}