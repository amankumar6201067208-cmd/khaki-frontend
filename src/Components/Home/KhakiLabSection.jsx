import { khakiLabContent } from "../../Data/HomeData/WebContent";
import KhakiLabImageCarousel from "./KhakiLabImageCarousel";
import { Link } from "react-router-dom";

const KhakiLabSection = () => {
  return (
    <section className="bg-[#7E9777] py-16 ">
      <div className="max-w-285 mx-auto md:px-6 px-3 -mt-70">
        <div className="bg-white rounded-3xl p-4 md:p-12 flex flex-col md:flex-row items-center gap-10 ">

          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6">
              {khakiLabContent.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              {khakiLabContent.description}
            </p>

            <Link to={khakiLabContent.buttonLink}
              className="inline-flex items-center gap-2 bg-[#e4572e] text-white px-10 py-2 rounded-full font-semibold hover:bg-[#cc4c27] transition"
            >
              {khakiLabContent.buttonText} <i class="fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>

          {/* Right Carousel */}
          <div className="md:w-1/2 w-full flex justify-end">
            <KhakiLabImageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KhakiLabSection;
