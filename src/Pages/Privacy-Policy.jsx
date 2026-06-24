import { PrivacyPolicyQuestions } from "../Data/PrivacyPolicyData/PrivacyPolicyContent";
import FaqItem from "../Components/Faqs/FaqItem";

const PrivacyPolicy = () => {
  return (
    <section className="pt-40 pb-10 bg-[url('/src/assets/Background/snow2.png')]">
      <div className="max-w-285 mx-auto px-6">
        <h2 className="text-[32px] font-bold mb-10">
          PRIVACY POLICY
        </h2>

        <div className="rounded overflow-hidden">
          {PrivacyPolicyQuestions.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
