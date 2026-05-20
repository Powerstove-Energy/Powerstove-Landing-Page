import AwardsTicker from "@/app/components/AwardsTicker";
import CallToAction from "@/app/components/CallToAction";
import ContactFAQ from "@/app/components/ContactFAQ";
import ContactForm from "@/app/components/ContactForm";
import ContactMap from "@/app/components/ContactMap";
import Partners from "@/app/components/Partners";
import RecycleImage from "@/app/components/RecycleImage";



export default function Page() {
  return (
  <>
       {/*contact  Section */}
      <section className="bg-[#f8f8f8] flex flex-col  items-center justify-center text-center px-6 py-28">

        <p className="mt-6 text-[#FF9500] font-bold text-base sm:text-lg max-w-xl leading-relaxed">
           GET IN TOUCH
        </p>
         
       
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
          Reach Us
        </h1>
        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
            Drop us your message
        </p>
        
      </section>

        <RecycleImage />
            
        <AwardsTicker />

        <Partners />

        <ContactForm />
        <ContactMap />
        <ContactFAQ />

        <CallToAction />
  </>

  )
}