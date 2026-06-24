const AmbassadorCard = ({ ambassador }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:px-6">
      <div className="rounded-full flex items-center justify-center overflow-hidden mb-6">
        <img
          src={ambassador.image}
          alt={ambassador.name}
          className=" md:w-50 md:h-auto h-55"
        />
      </div>
      <div className="flex flex-col overflow-hidden mb-6 text-start ml-6">
      <p className="text-gray-700 mb-4 max-w-md">
        {ambassador.description}
      </p>

      <h4 className="text-[#DB4D27] text-xl font-medium">
        {ambassador.name}
      </h4>
      </div>
    </div>
  );
};

export default AmbassadorCard;
