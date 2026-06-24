import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { seasonalSpecials } from "../../Data/InternationalTourData/internationaltour";

const tabs = [
  "Overview",
  "Trip Outline",
  "Trip Includes",
  "Trip Excludes",
  "Gallery",
  "FAQ",
  "Downloads",
];

const TripDetails = () => {
  const { slug } = useParams();

  const tabRef = useRef(null); // inside component
  const [selectedIndex, setSelectedIndex] = useState(null);

  const scroll = (direction) => {
    if (tabRef.current) {
      tabRef.current.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  const trip = seasonalSpecials.find((item) => item.slug === slug);

  const [activeTab, setActiveTab] = useState("Overview");

  if (!trip || !trip.details) return <p>No Data Found</p>;

  const data = trip.details;

  return (
    <div className="max-w-285 mx-auto py-4">
      {/* Tabs */}
      <div className="relative">
        {/* LEFT ARROW (mobile only) */}
        <button
          onClick={() => scroll("left")}
          className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full px-2 py-1 shadow"
        >
          ◀
        </button>

        {/* RIGHT ARROW (mobile only) */}
        <button
          onClick={() => scroll("right")}
          className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full px-2 py-1 shadow"
        >
          ▶
        </button>

        {/* TABS CONTAINER */}
        <div
          ref={tabRef}
          className="flex md:grid md:grid-cols-7 border-l border-r border-t h-15 border-gray-200 rounded-lg rounded-b-none overflow-x-auto md:overflow-hidden divide-x divide-gray-200 bg-white scroll-smooth no-scrollba mx-10 md:mx-0"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 md:flex-1 text-center px-5 py-3 text-sm whitespace-nowrap transition ${
                activeTab === tab
                  ? "bg-[#db4d27] font-semibold text-white"
                  : "bg-gray-100 cursor-pointer"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-6 border-l border-r border-b border-gray-200 rounded-b-lg">
        {/* Overview */}
        {activeTab === "Overview" && (
          <p className="text-gray-600 leading-relaxed">{data.overview}</p>
        )}

        {/* Itinerary */}
        {activeTab === "Trip Outline" && (
          <div className="relative py-10">
            {/* Center Vertical Line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400 h-[calc(100%-4rem)] top-16"></div>

            <h2 className="text-center text-2xl font-bold mb-12 -mt-8.75">
              Itineraries
            </h2>

            <div className="space-y-12">
              {data.itinerary?.map((item, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <div key={i} className="relative flex items-center">
                    {/* DOT */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="w-6 h-6 bg-gray-400 rounded-full border-4 border-white"></div>
                    </div>

                    {isLeft ? (
                      <>
                        {/* LEFT SIDE */}
                        <div className="w-1/2 pr-12 text-right">
                          <h3 className="font-bold">{item.day}</h3>
                          <p>Date: {item.date}</p>
                          <p className="">{item.time}</p>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-1/2 pl-12">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* LEFT SIDE */}
                        <div className="w-1/2 pr-12 text-right">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p>{item.description}</p>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-1/2 pl-12">
                          <h3 className="font-bold">{item.day}</h3>
                          <p>Date: {item.date}</p>
                          <p className="">{item.time}</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Includes */}
        {activeTab === "Trip Includes" && (
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            {data.includes?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {/* Excludes */}
        {activeTab === "Trip Excludes" && (
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            {data.excludes?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {/* Gallery */}
        {activeTab === "Gallery" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.gallery?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setSelectedIndex(i)}
                className="rounded-lg object-cover h-40 w-full cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        )}

        {/* FAQ */}
        {activeTab === "FAQ" && (
          <div className="space-y-3">
            {data.faqs?.map((faq, i) => (
              <details key={i} className="border-b border-gray-200 p-3 rounded">
                <summary className="cursor-pointer font-medium">
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        )}

        {/* Downloads */}
        {activeTab === "Downloads" && (
          <div className="space-y-4">
            {data.downloads?.map((file, i) => (
              <div
                key={i}
                className="border p-4 rounded flex items-center gap-4"
              >
                <div className="text-[#db4d27] font-bold text-lg">PDF</div>
                <div>
                  <h4 className="font-semibold">{file.title}</h4>
                  <p className="text-sm text-gray-500">{file.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 text-white text-2xl cursor-pointer"
          >
            ✕
          </button>

          {/* LEFT ARROW */}
          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === 0 ? data.gallery.length - 1 : prev - 1,
              )
            }
            className="absolute left-5 text-white text-3xl cursor-pointer"
          >
            ‹
          </button>

          {/* IMAGE */}
          <img
            src={data.gallery[selectedIndex]}
            className="max-h-[80vh] max-w-[90vw] rounded-lg"
          />

          {/* RIGHT ARROW */}
          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === data.gallery.length - 1 ? 0 : prev + 1,
              )
            }
            className="absolute right-5 text-white text-3xl cursor-pointer"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
