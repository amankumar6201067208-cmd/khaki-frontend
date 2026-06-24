import { khakiLabSectionContent } from "../../Data/FoundationData/FoundationContent";
import KhakiLabCarousel from "./KhakiLabCarousel";
import { Link } from "react-router-dom";

const KhakiLabSection2 = () => {
  return (
    <section className="bg-[url('/src/assets/Background/Tours.jpg')]  md:h-88">
      <div className="max-w-285 mx-auto px-6 ">
        <div className="flex flex-col md:flex-row items-center gap-10 ">

          {/* Left Content */}
          <div className="md:w-1/2 w-full flex justify-center md:-mt-16 mt-10">
            <KhakiLabCarousel />
          </div>

          {/* Right Carousel */}
          <div className="md:w-1/2 text-center md:text-left text-white md:-mt-16 mb-10">
            <h2 className="text-3xl font-bold mb-6">
              {khakiLabSectionContent.title}
            </h2>

            <p className=" leading-relaxed mb-8">
              {khakiLabSectionContent.description}
            </p>

            <Link to={khakiLabSectionContent.buttonLink}
              className="inline-flex items-center gap-2 text-white border border-white px-8 py-2 rounded-full font-normal hover:bg-white hover:text-black transition"
            >
              {khakiLabSectionContent.buttonText} <i class="fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KhakiLabSection2;
