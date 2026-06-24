import { useState, useRef } from "react";

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="border-b border-orange-200">
      {/* QUESTION */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full test-[14px] text-left px-2.5 py-3 bg-[#edded0] text-[#9a2100] font-semibold hover:bg-[#ecd9c6] transition cursor-pointer"
      >
        {question}
      </button>

      {/* ANSWER */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out bg-[#fff4ea]"
        style={{
          maxHeight: open
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-6 py-4 text-gray-700 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
