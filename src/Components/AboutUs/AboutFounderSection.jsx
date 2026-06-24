import { aboutFounderData } from "../../Data/AboutUsData/AboutUsContent";

const AboutFounderSection = () => {
  const {
    backgroundImage,
    title,
    description,
    youtubeEmbedUrl,
  } = aboutFounderData;

  return (
    <section
      className="bg-fixed bg-cover bg-center md:py-24 py-12.5 md:h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-7xl mx-auto md:px-6 px-3">
        <div className="flex flex-col lg:flex-row md:gap-45 gap-28 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 w-full bg-black bg-opacity-90 md:p-10 p-4.25">
            <h2 className="text-[28px] md:text-3xl font-bold text-[#DB4D27] mb-6 text-center md:text-start">
              {title}
            </h2>

            <p className="text-[#FFFFFF80] leading-relaxed text-base md:text-base text-center md:text-start">
              {description}
            </p>
          </div>

          {/* RIGHT VIDEO */}
          <div className="lg:w-1/2 w-full">
            <div className="relative w-full aspect-video shadow-lg">
              <iframe
                src={youtubeEmbedUrl}
                title="Founder Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutFounderSection;
