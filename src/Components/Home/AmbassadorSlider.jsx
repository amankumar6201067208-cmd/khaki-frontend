import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import AmbassadorCard from "./AmbassadorCard";
import { ambassadors } from "../../Data/HomeData/WebContent";

const AmbassadorSlider = () => {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  //  Detect screen size
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 768) {
        setSlidesPerView(2); // desktop
      } else {
        setSlidesPerView(1); // mobile
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);

    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  //  Update selected index (page-wise)
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(Math.floor(index / slidesPerView));
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, slidesPerView]);

  // Total dots (pages)
  const dotCount = Math.ceil(ambassadors.length / slidesPerView);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      {/* SLIDER */}
      <div ref={emblaRef}>
        <div className="flex">
          {ambassadors.map((ambassador) => (
            <div
              key={ambassador.id}
              className="
                flex-[0_0_100%]
                md:flex-[0_0_50%]
              "
            >
              <AmbassadorCard ambassador={ambassador} />
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: dotCount }).map((_, index) => (
          <button
            key={index}
            onClick={() =>
              emblaApi && emblaApi.scrollTo(index * slidesPerView)
            }
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === selectedIndex
                ? "bg-[#DB4D27]"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AmbassadorSlider;