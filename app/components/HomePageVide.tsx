export default function HomePageVideo() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="relative rounded-2xl overflow-hidden w-full h-64 sm:h-120">
        <video
          src="https://res.cloudinary.com/dacvwslvf/video/upload/v1780369089/Homepage_igdjtr.mp4"
          controls
          preload="metadata"
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
