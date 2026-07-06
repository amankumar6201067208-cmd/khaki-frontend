import { useState, useMemo } from "react";
import PublicRow from "./PublicRow";
import { isUpcoming, sortByDateTime } from "../../utils/dateUtils";

const PublicTabSection = ({ title, items }) => {
  const [tab, setTab] = useState("upcoming");
  const flattenedItems = useMemo(() => {
    return (items || []).flatMap((item) =>
      (item.schedule || []).map((slot, index) => ({
        id: `${item.id}-${index}`,
        title: item.title,
        slug: item.slug,
        type: item.type,
        // Carry EventType through so the badge shows Event vs Talk.
        eventType: item.eventType,
        date: slot.date,
        time: slot.time,

        duration: item.duration,
        distance: item.distance,
        venue: item.venue,
      }))
    );
  }, [items]);

  const filteredItems = flattenedItems
    .filter((item) => {
      if (!item.date || !item.time) return false; 
      return tab === "upcoming"
        ? isUpcoming(item.date, item.time)
        : !isUpcoming(item.date, item.time);
    })
    .sort((a, b) =>
      tab === "upcoming"
        ? sortByDateTime(a, b)
        : sortByDateTime(b, a)
    );

  return (
    <div>
      {/* Header + Tabs */}
      <div className="flex justify-between items-center mb-4 border-b border-[#DEE2E6] ">
        <h3 className="text-xl font-bold text-[#DB4D15] ">#{title}</h3>

        <div className="flex gap-4 text-sm">
          <button
            onClick={() => setTab("upcoming")}
            className={
              tab === "upcoming"
                ? "font-bold text-[#495057] border border-[#DEE2E6] p-1.5"
                : "text-[#DB4D15] cursor-pointer"
            }
          >
            Upcoming
          </button>

          <button
            onClick={() => setTab("past")}
            className={
              tab === "past"
                ? "font-bold text-[#495057] border border-[#DEE2E6] p-1.5"
                : "text-[#DB4D15] cursor-pointer"
            }
          >
            Past
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto pr-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <PublicRow key={item.id} item={item} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No items found</p>
        )}
      </div>
    </div>
  );
};

export default PublicTabSection;