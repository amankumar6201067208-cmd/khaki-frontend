const GuestReviewCard = ({ name, text, link }) => {
  return (
    <div className="px-6 text-center md:text-left">
      <h3 className="text-[20px] font-semibold text-[#DB4D27] mb-3">
        {name}
      </h3>

      <p className="text-[16px] text-black leading-relaxed mb-4">
        {text}
      </p>

      <a
        href={link}
        className="text-[#9A2100] font-semibold inline-flex items-center gap-1 hover:underline"
      >
        Read more →
      </a>
    </div>
  );
};

export default GuestReviewCard;
