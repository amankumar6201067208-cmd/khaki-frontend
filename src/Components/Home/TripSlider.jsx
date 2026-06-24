import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import TripCard from "./TripCard";

const TripSlider = ({ trips }) => {
  
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

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      {/* SLIDER */}
      <div ref={emblaRef}>
        <div className="flex gap-1.75 md:px-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
            >
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-3 mt-6">
        {trips.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-2 h-2 rounded-full cursor-pointer transition ${
              index === selectedIndex
                ? "bg-[url('/src/assets/Background/Tours.jpg')]  bg-center "
                : "bg-orange-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TripSlider;
