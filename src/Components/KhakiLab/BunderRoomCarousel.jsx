import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const BunderRoomCarousel = ({ images }) => {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [autoplay.current]
  );

  return (
    <div
      className="overflow-hidden"
      ref={emblaRef}
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      <div className="flex">
        {images.map((img, i) => (
          <div key={i} className="flex-[0_0_100%]">
            <img
              src={img}
              alt={`Bunder Room ${i + 1}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BunderRoomCarousel;
