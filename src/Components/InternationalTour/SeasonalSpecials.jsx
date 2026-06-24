import { seasonalSpecials } from "../../Data/InternationalTourData/internationaltour";
import { useNavigate } from "react-router-dom";

const SeasonalSpecials = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-285 mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-25">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Discover Extraordinary Seasonal Specials 🎉
          </h2>
          <p className="text-gray-500 mt-2">
            Your Ultimate Package Is Ready and Waiting 👋
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-24 mt-16">
        {seasonalSpecials.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 rounded-2xl border border-gray-200 p-6 pt-28 relative"
          >
            {/* Image */}
           <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-[88%]">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                {/* Price */}
                <div className="absolute bottom-4 left-4">
                  {item.oldPrice && (
                    <span className="block text-white/70 text-sm line-through">
                      {item.oldPrice}
                    </span>
                  )}
                  <span className="text-white text-xl font-bold">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
            {/* Content */}
            <h3 className="text-[25px] font-semibold mb-3 pt-15 leading-tight">
              {item.title}
            </h3>
            <div className="flex items-center gap-6 text-gray-500 text-sm mb-6 justify-between">
              
              <span className="flex items-center gap-2">
                
                <i className="fa-solid fa-location-dot text-[#db4d27]"></i>
                {item.location}
              </span>
              <span className="flex items-center gap-2">
                
                <i className="fa-solid fa-clock text-[#db4d27]"></i>
                {item.date}
              </span>
            </div>
            {/* Departure Box */}
            <div className="bg-white rounded-xl p-5 mb-6 border">
              
              <h4 className="font-semibold mb-3 text-gray-800">
                
                Next Departure
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                
                {item.departures.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            </div>
            {/* Button */}
            <button
              onClick={() => navigate(`/international-tour/${item.slug}`)}
              className="bg-[#db4d27] text-white px-6 py-3 rounded-lg w-auto cursor-pointer"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeasonalSpecials;
