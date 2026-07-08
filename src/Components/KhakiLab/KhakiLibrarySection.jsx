import { khakiLibrarySectionData } from "../../Data/KhakiLabData/KhakiLabContent";
import { Link } from "react-router-dom";

const KhakiLibrarySection = () => {
  const {
    backgroundImage,
    title,
    description,
    buttonText,
    buttonLink,
  } = khakiLibrarySectionData;

  return (
    <section
      className="relative min-h-100 flex items-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative max-w-285 mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-center gap-8 py-10">
        {/* Library Search Widget */}
        <div className="bg-white p-3 rounded-md shadow-lg w-full max-w-117">
          <iframe
            src="https://khakilab.librarika.com/widgets/search/horizontal"
            title="K.H.A.K.I. Library Search"
            width="468"
            height="150"
            scrolling="no"
            style={{ border: 0, width: "100%", maxWidth: "100%" }}
          />
        </div>

        {/* Content Box */}
        <div className="bg-black text-white p-7 max-w-90">
          <h2 className="text-[24px] font-bold text-[#e4572e] mb-3">
            {title}
          </h2>

          <p className="text-[16px] leading-relaxed mb-3 text-[#FFFFFF80]">
            {description}
          </p>

          {/* <Link
            to={buttonLink}
            className="inline-block bg-[#e4572e] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#cc4c27] transition"
          >
            {buttonText}
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default KhakiLibrarySection;
