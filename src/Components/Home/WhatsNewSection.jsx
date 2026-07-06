import { hasWhatsNewContent } from "../../Data/HomeData/ChangesSection";
import RichTextRenderer from "../RichTextRenderer";

// `data` is fetched once in Home and passed down (so the parent can also
// adjust surrounding layout when this section is hidden).
const WhatsNewSection = ({ data }) => {
  // Hide the whole section when the backend has no What's New content.
  if (!hasWhatsNewContent(data)) return null;

  const paragraphBlocks = Array.isArray(data?.description)
    ? data.description
    : null;

  return (
    <section className="md:-mt-40">
      <div className="max-w-285 mx-auto -mt-160 md:mt-auto px-3 md:px-0">
        <div className="bg-[url('/src/assets/Background/Tours.jpg')] rounded-2xl p-3.5 md:p-4 flex md:flex-row flex-col gap-10 items-center md:items-start">
          {/* LEFT IMAGE */}
          <div className="rounded-xl flex justify-center">
            {data?.image && (
              <img
                src={data.image}
                alt="Whats New"
                className="md:h-80 w-auto"
              />
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-white leading-8 w-[90%] flex flex-col items-center md:items-start">
            <p className="md:text-[28px] text-[20px] font-semibold text-center md:text-start">
              {data.tag}
            </p>

            <h2 className="md:text-[28px] text-[20px] text-center md:text-start font-bold ">
              {data.title}
            </h2>

            {paragraphBlocks ? (
              <RichTextRenderer
                nodes={paragraphBlocks}
                className="leading-6 text-white/90 mt-5 text-center md:text-start"
              />
            ) : (
              <p className=" leading-6 text-white/90 mt-5 text-center md:text-start ">
                {data.description}
              </p>
            )}

            {/* LINKED BUTTON */}
            <a
              href={data.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-black px-6 py-1 mt-5 rounded-full font-semibold hover:bg-black hover:text-white transition uppercase"
            >
              {data.buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
