import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { khakiLabSectionImages } from "../../Data/FoundationData/FoundationContent";

const KhakiLabCarousel = () => {
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
    
        const onSelect = () =>
          setSelectedIndex(emblaApi.selectedScrollSnap());
    
        emblaApi.on("select", onSelect);
        onSelect();
      }, [emblaApi]);

  return (
    <div className="md:w-100 md:h-120">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {khakiLabSectionImages.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] flex justify-end"
            >
              <img
                src={img}
                alt="Khaki Lab"
                className="md:w-100 md:h-120 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {khakiLabSectionImages.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
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

export default KhakiLabCarousel;
