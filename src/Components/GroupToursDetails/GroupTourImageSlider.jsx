import useEmblaCarousel from "embla-carousel-react";

const GroupTourImageSlider = ({ images }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex">
        {images.map((img, i) => (
          <div key={i} className="flex-[0_0_100%]">
            <img
              src={img}
              alt=""
              className="h-140 w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupTourImageSlider;
