import { LabSectionData } from "../Data/KhakiLabData/KhakiLabContent";
import LabImageCarousel from "../Components/KhakiLab/LabImageCarousel";
import KhakiLibrarySection from "../Components/KhakiLab/KhakiLibrarySection";
import BunderRoomSection from "../Components/KhakiLab/BunderRoomSection";
import KhakiLabEvents from "../Components/KhakiLab/KhakiLabEvents";
import HelpUsSection from "../Components/Foundation/HelpUsSection";

const KhakiLab = () => {
  const { images, textBlocks } = LabSectionData;

  return (
    <>
    <section className="bg-[url('/src/assets/Background/snow2.png')] pt-40 pb-24 ">
      <div className="max-w-285 mx-auto md:px-6 px-3 md:grid flex flex-col lg:grid-cols-2 gap-16 items-center">

        {/* LEFT: Image Carousel */}
        <LabImageCarousel images={images} />

        {/* RIGHT: Text */}
        <div className="md:space-y-8 space-y-4" >
          {textBlocks[0] && (
            <h1 className="md:text-[24px] text-[18px] md:text-start text-center font-semibold leading-7.25">
              {textBlocks[0].text}
            </h1>
          )}

          {textBlocks[1] && (
            <h2 className="md:text-[32px] text-[27px] md:text-start text-center font-light leading-[43.2px]">
              {textBlocks[1].text}
            </h2>
          )}
        </div>

      </div>
    </section>

    <KhakiLabEvents/>

    <BunderRoomSection/>

    <KhakiLibrarySection />

    <HelpUsSection/>
    </>
  );
};

export default KhakiLab;
