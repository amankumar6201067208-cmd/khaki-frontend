import { khakiFoundationData } from "../../Data/HomeData/WebContent";
import { Link } from "react-router-dom";

const KhakiHeritageFoundation = () => {
  const { logo, title, description, buttonText, buttonLink } =
    khakiFoundationData;

  return (
    <section className="bg-[#7E9777] py-20 ">
      <div className="max-w-5xl mx-auto px-6 text-center text-black">

        {/* Logo */}
        <img
          src={logo}
          alt="Khaki Logo"
          className="mx-auto mb-6 w-40 md:w-48"
        />

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base leading-relaxed mb-10">
          {description}
        </p>

        {/* Button */}
        <Link to={buttonLink}
          className="inline-flex items-center gap-3 border border-black px-10 py-1 rounded-full font-medium hover:bg-black hover:text-white transition"
        >
          {buttonText}
          <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
};

export default KhakiHeritageFoundation;
