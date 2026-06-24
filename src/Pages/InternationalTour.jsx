import { useEffect, useState } from "react";
import { internationalBannerSlides } from "../Data/InternationalTourData/internationaltour";
import BookingSteps from "../Components/InternationalTour/BookingSteps";
import SeasonalSpecials from "../Components/InternationalTour/SeasonalSpecials";
import StatsCounter from "../Components/InternationalTour/StatsCounter";

const InternationalTour = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === internationalBannerSlides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <section className="bg-[url('/src/assets/Background/snow2.png')] pb-12">
      {/* ===== Banner Slider ===== */}
      <div className="relative w-full h-150 overflow-hidden">
        {internationalBannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <h1 className="text-2xl md:text-4xl font-semibold bg-white/80 text-black px-6 py-4 rounded">
                {slide.heading}
              </h1>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {internationalBannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                current === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <BookingSteps />
      <SeasonalSpecials />
      <StatsCounter />
      </section>
    </>
  );
};

export default InternationalTour;
