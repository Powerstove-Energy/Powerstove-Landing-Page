export default function Partners() {
    return(

       <>
          {/* Global Partners Section */}
<section className="bg-white py-14 px-6 border-t border-b border-gray-100">
  <div className="max-w-7xl mx-auto text-center">
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FF9500" }}>
      Trusted By
    </span>
    <h2 className="mt-2 text-2xl font-extrabold text-gray-900">Our Global Partners</h2>

<div className="mt-10 flex flex-wrap items-center justify-center gap-10">
        {/* GreenTec Capital Partners */}
     <img src="/greentec.webp" alt="GreenTec Capital Partners" className="h-14 object-contain" />
      <img src="/wri.webp" alt="World Resources Institute" className="h-14 object-contain" />
      <img src="/afd.webp" alt="Agence Française de Développement" className="h-14 object-contain" />
      <img src="/usadf.png" alt="United States African Development Foundation" className="h-14 object-contain" />
      <img src="/allon.png" alt="AllOn" className="h-14 object-contain" />
    </div>
  </div>
</section>
       </>
    )
}