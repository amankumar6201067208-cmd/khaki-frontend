import { ourMissionData, khakiheritageData } from "../Data/AboutUsData/AboutUsContent";
import OurStorySection from "../Components/AboutUs/OurStorySection";
import OurVisionSection from "../Components/AboutUs/OurVisionSection";
import AboutFounderSection from "../Components/AboutUs/AboutFounderSection";
import { Link } from "react-router-dom";

const About = () => {
  const { image, title, description } = ourMissionData;
  const { khakiheritagelogo, khakiheritagetitle, khakiheritagedescription, khakiheritagebuttonLink, khakiheritagebuttonText } = khakiheritageData;

  return (
    <>
    <section className="bg-[url('/src/assets/Background/snow2.png')] pb-20 pt-35 md:pt-40">
      <div className="max-w-6xl mx-auto px-3 md:px-6 text-center">

        {/* Image */}
        <img
          src={image}
          alt="Khaki Team"
          className="mx-auto mb-10 max-w-full md:max-w-4xl"
        />

        {/* Title */}
        <h1 className="text-[32px] font-bold text-[#e4572e] mb-6">
          {title}
        </h1>

        {/* Description */}
        <p className="text-[25px] md:text-[32px] font-thin text-black md:leading-[43.2px] leading-[37.5px] mx-auto">
          {description}
        </p>
      </div>
    </section>

    <OurStorySection />

    <OurVisionSection />

    <AboutFounderSection />

    <section className="bg-[#7E9777] py-20 ">
      <div className="max-w-285 mx-auto md:px-6 px-3 text-center text-black">

        {/* Logo */}
        <img
          src={khakiheritagelogo}
          alt="Khaki Logo"
          className="mx-auto mb-6 w-17.25"
        />

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6">
          {khakiheritagetitle}
        </h2>

        {/* Description */}
        <p className="text-base md:text-base leading-relaxed mb-10">
          {khakiheritagedescription}
        </p>

        {/* Button */}
        <Link to={khakiheritagebuttonLink}
          className="inline-flex items-center gap-3 bg-[#db4d27] text-white px-5 py-2 rounded-full font-medium hover:bg-black hover:text-white transition"
        >
          {khakiheritagebuttonText}
        </Link>
      </div>
    </section>

    </>
  );
};

export default About;
