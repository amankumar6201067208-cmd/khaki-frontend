import { faqSections } from "../Data/FaqsData/FaqsContent";
import FaqSection from "../Components/Faqs/FaqSection";

const Faqs = () => {
  return (
    <section className="pt-40 pb-10 bg-[url('/src/assets/Background/snow2.png')]">
      <div className="max-w-285 mx-auto px-6">
        <h2 className="text-[32px] font-bold mb-10">
          FAQs
        </h2>

        {faqSections.map((section, index) => (
          <FaqSection
            key={index}
            category={section.category}
            faqs={section.faqs}
          />
        ))}
      </div>
    </section>
  );
};

export default Faqs;
