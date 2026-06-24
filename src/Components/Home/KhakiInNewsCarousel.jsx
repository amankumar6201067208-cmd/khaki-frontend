import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { newsData } from "../../Data/HomeData/WebContent";
import NewsCard from "./NewsCard";

const KhakiInNewsCarousel = () => {
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
    <section className="bg-[url('/src/assets/Background/snow2.png')] pb-20 h-200">
      <div className="max-w-285 mx-auto px-6 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <img src="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775131388/Screenshot-2025-11-09-162023_p7wt3a.png"/>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#e4572e] mb-12">
          Khaki in the news
        </h2>

        {/* Embla */}
        <div
      className="overflow-hidden"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      {/* SLIDER */}
      <div ref={emblaRef}>
        <div className="flex">
          {newsData.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] md:flex-[0_0_33.333%]"
              >
                <NewsCard {...item} />
              </div>
            ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="hidden md:flex justify-center gap-2 mt-10">
         {newsData.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === selectedIndex
                ? "bg-[#e4572e]"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
      </div>
    </section>
  );
};

export default KhakiInNewsCarousel;
