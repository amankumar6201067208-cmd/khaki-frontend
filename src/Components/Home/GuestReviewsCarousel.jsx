import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { reviewsData } from "../../Data/HomeData/WebContent";
import GuestReviewCard from "../Home/GuestReviewCard";

const GuestReviewsCarousel = () => {
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
        setSlidesPerView(3); // desktop → 3 cards
      } else {
        setSlidesPerView(1); // mobile → 1 card
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

  //  Total dots (pages)
  const dotCount = Math.ceil(reviewsData.length / slidesPerView);

  return (
    <section className="bg-[url('/src/assets/Background/snow2.png')] py-16">
      <div className="max-w-285 mx-auto px-6 text-center">
        
        {/* Badge */}
        <img
          src="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775165015/tchotel_2021_LL_1_d0yvcf.png"
          alt="TripAdvisor Award"
          className="mx-auto mb-6 w-37.5 h-25"
        />

        {/* Heading */}
        <h2 className="text-[32px] font-bold text-[#DB4D27] mb-4">
          What our guests have to say
        </h2>

        <p className="text-[16px] text-black mb-12">
          A sampling of guest reviews of our walks and tours on Tripadvisor
        </p>

        {/* Embla */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.play()}
        >
          {/* SLIDER */}
          <div ref={emblaRef}>
            <div className="flex">
              {reviewsData.map((review, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_33.333%]"
                >
                  <GuestReviewCard {...review} />
                </div>
              ))}
            </div>
          </div>

          {/* DOTS */}
          <div className=" justify-center gap-2 mt-10 hidden md:flex">
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
      </div>
    </section>
  );
};

export default GuestReviewsCarousel;