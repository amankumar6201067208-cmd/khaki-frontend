import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { khakiLabImages } from "../../Data/HomeData/WebContent";

const KhakiLabImageCarousel = () => {
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
    <div className="w-87.5">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {khakiLabImages.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] flex justify-end"
            >
              <img
                src={img}
                alt="Khaki Lab"
                className="w-87.5 h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {khakiLabImages.map((_, index) => (
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

export default KhakiLabImageCarousel;
