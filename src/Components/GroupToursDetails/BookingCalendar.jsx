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
    schedule.find((s) => formatKey(s.date) === date?.toDateString());

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

            // currentTarget = the day button (not an inner dot span).
            const rect = e.currentTarget.getBoundingClientRect();
            const parentRect = calendarRef.current.getBoundingClientRect();

            setTooltipPos({
              top: rect.top - parentRect.top,
              left: rect.left - parentRect.left + rect.width / 2,
            });

            setHoveredDate(date);
          }}
          onDayMouseLeave={() => setHoveredDate(null)}
          disabled={(date) => {
            const isInSchedule = availableDates.some(
              (d) => d.toDateString() === date.toDateString(),
            );

            const isPastDate = date < today;

            return !isInSchedule || isPastDate;
          }}
          components={{
            // Render the day number, then a row of dots — one per slot —
            // green = seats available, red = sold out.
            DayButton: ({ day, modifiers, className, children, ...rest }) => {
              const info = findDay(day.date);
              const hasSlots = !!info?.slots?.length;

              return (
                <button
                  {...rest}
                  className={`${className ?? ""} kk-day ${
                    hasSlots ? "kk-day--has-slots" : ""
                  }`}
                >
                  <span className="kk-day-num">{children}</span>

                  {hasSlots && (
                    <span className="kk-dots">
                      {info.slots.map((slot, i) => (
                        <span
                          key={i}
                          className={`kk-dot ${
                            slot.availableSeats === 0
                              ? "kk-dot--red"
                              : "kk-dot--green"
                          }`}
                        />
                      ))}
                    </span>
                  )}
                </button>
              );
            },
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
            className="bg-white text-black text-sm px-4 py-3 rounded-lg shadow-xl z-50
              transition-all duration-300 ease-out
              opacity-100 scale-100 animate-fadeIn"
          >
            <p className="font-semibold mb-2 border-b border-gray-700 pb-1 whitespace-nowrap">
              Available slots
            </p>

            {hoveredDay.slots.map((slot, i) => (
              <div
                key={i}
                className="mb-1 whitespace-nowrap flex items-center gap-2"
              >
                <span>{slot.time}</span>
                {slot.availableSeats === 0 ? (
                  <span className="text-red-400">Sold Out</span>
                ) : (
                  <span className="text-[#1c9150]">
                    ({slot.availableSeats} seats)
                  </span>
                )}
              </div>
            ))}

            {/* Arrow */}
            <div className="absolute left-1/2 -bottom-2 w-3 h-3 bg-white text-black rotate-45 -translate-x-1/2"></div>
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
