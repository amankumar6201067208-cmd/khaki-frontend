import { khakiHeritageFoundationData } from "../Data/FoundationData/FoundationContent";
import KhakiLabSection2 from "../Components/Foundation/KhakiLabSection2";
import HelpUsSection from "../Components/Foundation/HelpUsSection";

const Foundation = () => {
  const { title, intro, pillars } = khakiHeritageFoundationData;

  return (
    <>
    <section className="bg-[url('/src/assets/Background/snow2.png')] pb-30 pt-40">
      <div className="max-w-285 mx-auto md:px-6 px-3 text-center">

        {/* Title */}
        <h1 className="text-[32px] font-bold text-[#DB4D27] mb-5">
          {title}
        </h1>

        {/* Intro */}
        <p className=" mx-auto text-base leading-6 mb-8">
          {intro}
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((item, index) => (
            <div key={index} className="text-center">

              {/* Icon */}
              <img
                src={item.icon}
                alt={item.heading}
                className="mx-auto mb-6 h-30 w-37.5"
              />

              {/* Heading */}
              <h2 className="text-[32px] font-bold text-[#DB4D27] mb-4 uppercase">
                {item.heading}
              </h2>

              {/* Description */}
              <p className="text-[16px]  leading-6 text-start">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>

    <KhakiLabSection2 />

    <HelpUsSection />

    </>
  );
};

export default Foundation;
