export default function RecycleImage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="rounded-2xl overflow-hidden w-full h-64 sm:h-120">
        <img
          src="/recycle.png"
          alt="Recycling symbol on blue bin"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}