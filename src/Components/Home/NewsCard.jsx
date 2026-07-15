const NewsCard = ({ logo, title, link, date }) => {
  return (
    <div className="px-6 text-center">
      {/* Logo */}
      <img
        src={logo}
        alt="News Logo"
        className="mx-auto mb-6 h-37.5 w-75 object-contain opacity-80"
      />

      {/* Title */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[16px] text-black font-semibold hover:text-[#e4572e] transition"
      >
        {title} →
      </a>

      {/* Date */}
      <p className="text-[15px] text-gray-600 mt-4">{date}</p>
    </div>
  );
};

export default NewsCard;
