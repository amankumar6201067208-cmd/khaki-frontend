import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {

  const routeMap = {
    group: "/group-tours",
    private: "/private-tours",
  };

  const link = `${routeMap[trip.tourType] || "/tours"}/${trip.slug}`;

  const priceType = (trip.priceType || "").trim();
  const priceLabel =
    priceType.toLowerCase() === "from"
      ? `From ₹ ${trip.price}/-`
      : priceType
        ? `₹ ${trip.price}/- ${priceType}`
        : `₹ ${trip.price}/-`;


  return (
    <Link to={link} className="min-w-65">
      <div className="relative overflow-hidden shadow-md">
        <img
          src={trip.featureImage}
          alt={trip.title}
          className="h-56 w-full object-cover"
        />

        <div className="absolute bottom-0 w-full bg-[#ffffffb3]">
          <h3 className="font-semibold text-[18px] pt-3 pl-3 leading-4.75">
            #{trip.title} ({trip.duration})
          </h3>

          <div className="grid grid-cols-2 items-center mt-2 gap-5">
            <div className="bg-[#db4d15] p-1.25 text-center w-[85%]">
              <span className="text-white text-xs px-2 py-1">• {trip.tag}</span>
            </div>

            <div className="flex justify-end pr-3">
              <span className="font-bold text-[17px]">
                {priceLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
