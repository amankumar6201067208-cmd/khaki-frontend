import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BookingModal from "./BookingModal";

const formatKey = (d) => new Date(d).toDateString();

const GroupTourCalendar = ({ schedule, tour }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tooltipPos, setTooltipPos] = useState(null);
  const calendarRef = useRef(null);

  const availableDates = schedule.map((s) => new Date(s.date));

  const today = new Date();
  today.setHours(0, 0, 0, 0); // start of today

  const findDay = (date) =>
    schedule.find(
      (s) => formatKey(s.date) === date?.toDateString()
    );

  const hoveredDay = hoveredDate ? findDay(hoveredDate) : null;
  const selectedDay = selectedDate ? findDay(selectedDate) : null;

  const handleContinue = (slot, tickets) => {
    navigate("/checkout", {
      state: {
        booking: {
          date: selectedDate,
          slot,
          tickets,
        },
        tour,
      },
    });
  };

  return (
    <div className="mt-3 relative">
      <div ref={calendarRef} className="relative inline-block">
        <DayPicker
          mode="single"
          onSelect={(date) => {
            setSelectedDate(date);
            setShowModal(true);
          }}
          onDayMouseEnter={(date, modifiers, e) => {
            if (!e) return;

            const rect = e.target.getBoundingClientRect();
            const parentRect =
              calendarRef.current.getBoundingClientRect();

            setTooltipPos({
              top: rect.top - parentRect.top,
              left:
                rect.left -
                parentRect.left +
                rect.width / 2,
            });

            setHoveredDate(date);
          }}
          onDayMouseLeave={() => setHoveredDate(null)}
          disabled={(date) => {
            const isInSchedule = availableDates.some(
              (d) =>
                d.toDateString() ===
                date.toDateString()
            );

            const isPastDate = date < today;

            return !isInSchedule || isPastDate;
          }}
        />

        {/* TOOLTIP ABOVE DATE */}
        {hoveredDay && tooltipPos && (
          <div
            style={{
              position: "absolute",
              top: tooltipPos.top - 10,
              left: tooltipPos.left,
              transform: "translate(-50%, -100%)",
            }}
            className="bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl z-50
              transition-all duration-300 ease-out
              opacity-100 scale-100 animate-fadeIn"
          >
            <p className="font-semibold mb-2 border-b border-gray-700 pb-1">
              Available For Booking
            </p>

            {hoveredDay.slots.map((slot, i) => (
              <div key={i} className="mb-1 whitespace-nowrap">
                {slot.time}{" "}
                {slot.availableSeats === 0 ? (
                  <span className="text-red-400">
                    Sold Out
                  </span>
                ) : (
                  <span className="text-green-300">
                    ({slot.availableSeats} Seats)
                  </span>
                )}
              </div>
            ))}

            {/* Arrow */}
            <div className="absolute left-1/2 -bottom-2 w-3 h-3 bg-gray-900 rotate-45 -translate-x-1/2"></div>
          </div>
        )}
      </div>

      {/* BOOKING MODAL */}
      {showModal && selectedDay && (
        <BookingModal
          selectedDate={selectedDate}
          dayData={selectedDay}
          onClose={() => setShowModal(false)}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default GroupTourCalendar;
