const awards = [
  "Winner TEF-GIZ Nigeria 2018",
  "Winner King Hamad Youth Empowerment Award 2019",
  "Winner France-Africa 1000 Challenge 2020",
  "USAID Community Reinvestment Grant 2021",
  "UNDP GSW Award 2021",
  "Winner Cisco Global Problem Solver Challenge",
  "Winner TEF-GIZ Nigeria 2018",
  "Winner King Hamad Youth Empowerment Award 2019",
  "Winner France-Africa 1000 Challenge 2020",
  "USAID Community Reinvestment Grant 2021",
];

export default function AwardsTicker() {
  return (
    <div
      className="w-full py-3 overflow-hidden"
      style={{ backgroundColor: "#FF9500" }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {awards.map((award, i) => (
          <span key={i} className="text-white text-sm font-medium mx-6 flex items-center gap-2">
            <span>★</span> {award}
          </span>
        ))}
      </div>
    </div>
  );
}