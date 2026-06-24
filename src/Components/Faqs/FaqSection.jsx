import FaqItem from "./FaqItem";

const FaqSection = ({ category, faqs }) => {
  return (
    <div className="mb-10">
      <h3 className="text-[25px] font-bold mb-4">
        {category}
      </h3>

      <div className="rounded overflow-hidden">
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
