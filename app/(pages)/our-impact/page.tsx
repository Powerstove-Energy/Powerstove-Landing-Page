"use client"

import Image from "next/image"
import AwardsTicker from "@/app/components/AwardsTicker";
import CallToAction from "@/app/components/CallToAction";
import RecycleImage from "@/app/components/RecycleImage";



const stats = [
    {
      value: "53,625+",
      label: "Women Reached",
    },
    {
      value: "280,625",
      suffix: "tCO₂e",
      label: "Carbon Mitigated Per Year",
    },
    {
      value: "3.4 MWh",
      label: "Electricity Generated",
    },
    {
      value: "1 in 4",
      label: "Women at risk — now protected",
    },
  ];


  const reports = [
  {
    id: 1,
    title: "Powerstove Impact Report 1",
    description:
      "Solving energy poverty, gender inequalities and climate change in sub-Saharan Africa through efficient clean cookstove that uses Bio Pellets.",
    year: "2021",
    href: "#",
    image: "/report1.png", // replace with your actual image path
    imageBg: "bg-[#1a2744]",
  },
  {
    id: 2,
    title: "Powerstove Impact Report 2",
    description:
      "Measuring carbon offsets, health improvements, and economic empowerment across communities in Nigeria.",
    year: "2022",
    href: "#",
    image: "/report2.png", // replace with your actual image path
    imageBg: "bg-gray-200",
  },
];



export default function Page() {
  return (
  <>
       {/*Products  Section */}
      <section className="bg-[#f8f8f8] flex flex-col  items-center justify-center text-center px-6 py-28">

        <p className="mt-6 text-[#FF9500] font-bold text-base sm:text-lg max-w-xl leading-relaxed">
           PURPOSE DRIVEN REPORT
        </p>
         
       
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
          Our Impact Report
        </h1>
        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
            Measuring our contribution to a cleaner, healthier Africa.
        </p>
        
      </section>

        <RecycleImage />
            
            <AwardsTicker />


          <section className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex flex-row items-stretch bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Thumbnail — flush, no padding, full height */}
            <div
              className={`relative flex-shrink-0 w-32 ${report.imageBg}`}
            >
              <Image
                src={report.image}
                alt={report.title}
                fill
                className="object-cover"
              />
            </div>
 
            {/* Content */}
            <div className="flex flex-col justify-between p-5">
              <div>
                <h3 className="text-base font-bold text-gray-900 leading-snug">
                  {report.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {report.description}
                </p>
              </div>
 
              <div className="mt-4 flex flex-col items-start gap-3">
                <span className="text-xs font-semibold text-[#FF9500] bg-orange-50 px-2 py-0.5 rounded">
                  {report.year}
                </span>
                <a
                  href={report.href}
                  download
                  className="inline-flex items-center gap-2 bg-[#FF9500] hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                    />
                  </svg>
                  Download Report
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>


    <section className="bg-[#F8F8F8] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Our Numbers Tell the Story
        </h2>
        <div className="mt-2 mx-auto w-10 h-1 bg-[#FF9500] rounded-full" />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-start text-left"
            >
              <p className="text-2xl sm:text-3xl font-bold text-[#FF9500] leading-tight">
                {stat.value}
                {stat.suffix && (
                  <>
                    {" "}
                    <span className="text-xl">{stat.suffix}</span>
                  </>
                )}
              </p>
              <p className="mt-2 text-sm text-gray-500 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

        <CallToAction />
  </>

  )
}





