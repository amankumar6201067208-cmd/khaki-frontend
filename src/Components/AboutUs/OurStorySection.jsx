import { ourStoryData } from "../../Data/AboutUsData/AboutUsContent";
import { Link } from "react-router-dom";

const OurStorySection = () => {
  const {
    title,
    content,
    podcastText,
    buttonText,
    buttonLink,
  } = ourStoryData;

  return (
    <section className="w-full h-200 bg-cover bg-center bg-fixed bg-[url('https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119295/story_ywifsd.jpg')] ">
      <div className="w-full flex justify-end items-center">

        {/* Right Content */}
        <div className="md:w-[45%]  bg-[url('/src/assets/Background/Tours.jpg')] text-white px-3.5 md:px-12 py-3.5 md:py-12 flex items-center my-12 md:my-28 md:z-100 md:mr-35">
          <div className="max-w-full">

            <h2 className="text-[28px] font-bold pb-2.5">
              {title}
            </h2>

            <p className="text-[16px] leading-relaxed mb-8">
              {content}
            </p>

            {/* <h4 className="text-[24px] font-semibold mb-4">
              {podcastText}
            </h4> */}

            {/* <Link
              to={buttonLink}
              className="inline-flex items-center gap-3 bg-white text-black px-5 py-1.5 rounded-full font-medium hover:bg-black hover:text-white transition"
            >
              {buttonText}
              <i className="fa-solid fa-arrow-right-long"></i>
            </Link> */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
