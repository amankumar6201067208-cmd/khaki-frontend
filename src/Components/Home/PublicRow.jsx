import { Link } from "react-router-dom";
import { getMonthDay } from "../../utils/dateUtils";

const PublicRow = ({ item }) => {
  const { month, day } = getMonthDay(item.date);
  const link =
    item.type === "walk"
      ? `/public-walks/${item.slug}?date=${item.date}&time=${item.time}`
      : `/public-events/${item.slug}?date=${item.date}&time=${item.time}`;

  return (
    <Link to={link} className="block">
      <div className="flex gap-14 md:ml-10 py-2.5 border-b-[#DEE2E6] border-b hover:bg-gray-50 cursor-pointer">
        {/* DATE BOX */}
        <div className="w-12 h-11.5 text-center rounded overflow-hidden">
          <div className="bg-[#DB4D15] text-white text-xs py-1">
            {month}
          </div>
          <div className="bg-black text-white font-bold py-1 text-xs">
            {day}
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-[80%]">
          {item.type === "event" && (
            <span className="inline-block mb-1 bg-[#DB4D15] text-white text-xs font-medium px-2 py-1 rounded">
              {/* Backend EventType: "Ofline" → Event, "Online" (or unset) → Talk */}
              {item.eventType === "Ofline" ? "Event" : "Talk"}
            </span>
          )}

          <h4 className="font-semibold text-[20px] leading-6 text-[#231F20]">
            {item.title}
          </h4>

          {item.type === "walk" && (
            <p className="text-[#231F20] text-[12px] font-semibold">
              Time: {item.time} | {item.duration} | {item.distance}
            </p>
          )}

          {item.type === "event" && (
            <p className="text-[#231F20] text-[12px] font-semibold">
              Venue: {item.venue} ({item.time})
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PublicRow;