import { useState } from "react";

const BookingModal = ({
  selectedDate,
  dayData,
  onClose,
  onContinue,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [tickets, setTickets] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Select Slot
        </h2>

        <p className="mb-4 text-sm text-gray-600">
          {selectedDate?.toDateString()}
        </p>

        {/* TIME SLOTS */}
        {dayData.slots.map((slot, i) => {
          const isSoldOut =
            slot.availableSeats === 0;

          return (
            <button
              key={i}
              disabled={isSoldOut}
              onClick={() =>
                !isSoldOut &&
                setSelectedSlot(slot)
              }
              className={`md:w-[40%] p-3 mb-3 mr-2.5 border transition cursor-pointer 
                ${
                  isSoldOut
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : selectedSlot?.time ===
                      slot.time
                    ? "bg-[#DB4D27] text-white"
                    : "hover:bg-orange-100"
                }`}
            >
              {slot.time}
              {isSoldOut &&
                " (Sold Out)"}
            </button>
          );
        })}

        {/* TICKET SELECTOR */}
        {selectedSlot &&
          selectedSlot.availableSeats >
            0 && (
            <div className="mt-4">
              <label className="block mb-2 font-semibold">
                No. of Tickets
              </label>

              <select
                value={tickets}
                onChange={(e) =>
                  setTickets(
                    Number(e.target.value)
                  )
                }
                className="border p-2 cursor-pointer w-[40%] mr-2.5"
              >
                {[...Array(
                  selectedSlot.availableSeats
                ).keys()].map((i) => (
                  <option
                    key={i + 1}
                    value={i + 1}
                  >
                    {i + 1}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  onContinue(
                    selectedSlot,
                    tickets
                  )
                }
                className="mt-4 w-[40%] bg-[#DB4D27] text-white py-3 rounded cursor-pointer"
              >
                Continue
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default BookingModal;
