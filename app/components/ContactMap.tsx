export default function ContactMap() {
  return (
    <section className="bg-[#f8f8f8] px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-[#FF9500]/20 h-72 w-full">
          <iframe
            title="Powerstove Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.187!2d7.4892!3d9.0579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ba1e0e0e0e0%3A0x0!2sWuse+Zone+5%2C+Abuja!5e0!3m2!1sen!2sng!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}