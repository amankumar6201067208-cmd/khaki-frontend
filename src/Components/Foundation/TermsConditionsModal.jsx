import { termsConditionsData } from "../../Data/FoundationData/FoundationContent";

const TermsConditionsModal = ({ onClose }) => {
  const { title, content } = termsConditionsData;

  return (
    <div className="p-10 " >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 ">{title}</h2>

      {/* Content */}
      <div className="text-sm leading-relaxed whitespace-pre-line max-h-[60vh] overflow-y-auto pr-4">
        {content}
      </div>

      {/* Close */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={onClose}
          className="border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsConditionsModal;
