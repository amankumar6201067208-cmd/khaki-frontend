import { ourVisionData } from "../../Data/AboutUsData/AboutUsContent";

const OurVisionSection = () => {
  const { icon, image, title, description } = ourVisionData;

  return (
    <section className="bg-[url('/src/assets/Background/snow2.png')] md:py-24 py-16">
      <div className=" mx-auto px-3 text-center">

        {/* Compass / Watch */}
        <div className="flex justify-center mb-10">
          <img
            src={image}
            alt="Our Vision Compass"
            className="w-37.5"
          />
          <img
            src={icon}
            alt="Our Vision Compass"
            className="w-37.5 pendulum compass-arrow -ml-37.25"
          />
        </div>

        {/* Title */}
        <h2 className="text-[32px] font-bold text-[#e4572e] mb-6">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[25px] md:text-[32px] text-black md:leading-[43.2px] leading-[37.5px] mx-auto max-w-285 font-light">
          {description}
        </p>
      </div>
    </section>
  );
};

export default OurVisionSection;
