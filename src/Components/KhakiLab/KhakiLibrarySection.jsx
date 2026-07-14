import { khakiLibrarySectionData } from "../../Data/KhakiLabData/KhakiLabContent";
import { Link } from "react-router-dom";

const KhakiLibrarySection = () => {
  const { backgroundImage, title, description, buttonText, buttonLink } =
    khakiLibrarySectionData;

  return (
    <section
      className="relative min-h-100 flex items-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative max-w-285 mx-auto px-6 w-full flex flex-col md:flex-row justify-end items-center gap-8 py-10">
        {/* Content Box */}
        <div className="bg-black text-white p-7 max-w-132">
          <h2 className="text-[24px] font-bold text-[#e4572e] mb-3">{title}</h2>

          <p className="text-[16px] leading-relaxed mb-3 text-[#FFFFFF80]">
            {description}
          </p>

          {/* <Link
            to={buttonLink}
            className="inline-block bg-[#e4572e] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#cc4c27] transition"
          >
            {buttonText}
          </Link> */}

          <form
            action="https://khakilab.librarika.com/search"
            method="get"
            target="_blank"
            className="mt-4 w-full bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden text-left"
          >
            {/* Header bar */}
            <div className="bg-[#dddddd] px-5 py-3">
              <h3
                className="text-[20px] font-bold text-[#444]"
                style={{ textShadow: "0 1px 0 #fff" }}
              >
                Khaki Lab Library
              </h3>
            </div>

            {/* Search row */}
            <div className="px-5 py-4">
              <div className="flex gap-3">
                <input
                  id="library-search"
                  type="text"
                  name="q"
                  required
                  placeholder="Search Catalog"
                  className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-1.5 text-[16px] text-gray-600 focus:outline-none focus:border-gray-400"
                />
                <button
                  type="submit"
                  className="bg-[#6b8e23] hover:bg-[#6b8a29] text-white px-6 rounded font-bold text-[15px] transition"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-5 py-3">
              <p className="text-[14px] text-[#444]">
                Powered by:{" "}
                <a
                  href="https://librarika.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2f6db5] underline"
                >
                  Librarika.com
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default KhakiLibrarySection;
