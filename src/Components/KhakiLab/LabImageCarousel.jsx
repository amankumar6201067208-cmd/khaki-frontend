import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";

const LabImageCarousel = ({ images }) => {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () =>
      setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="flex flex-col justify-end items-center md:items-end">
      <div
        className="overflow-hidden w-87.5 h-100 md:w-120 md:h-130"
        ref={emblaRef}
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
      >
        <div className="flex ">
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-[0_0_100%]"
            >
              <img
                src={src}
                alt="Khaki Lab"
                className="w-87.5 h-100 md:w-120 md:h-130 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2 md:w-120">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-2 h-2 rounded-full ${
              index === selectedIndex
                ? "bg-orange-600"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LabImageCarousel;
