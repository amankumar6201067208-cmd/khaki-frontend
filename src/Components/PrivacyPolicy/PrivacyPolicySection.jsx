import FaqItem from "../Faqs/FaqItem";

const PrivacyPolicySection = ({ faqs }) => {
  return (
    <div className="mb-10">
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

export default PrivacyPolicySection;
