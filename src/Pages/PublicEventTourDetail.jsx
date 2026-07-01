import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StartingPointMap from "../Components/GroupToursDetails/StartingPointMap";
import Modal from "../Components/Modal";
import { getPublicActivities } from "../Data/TripData/publicActivities";
import GroupTourImageSlider from "../Components/GroupToursDetails/GroupTourImageSlider";
import PublicEventBookingForm from "../Components/Forms/PublicEventBookingForm";
import RichTextRenderer from "../Components/RichTextRenderer";
import { isUpcoming } from "../utils/dateUtils";

/* FORMAT DATE */
const formatDate = (date) => {
  const d = new Date(date);

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const PublicEventTourDetail = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");

  const [tour, setTour] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const loadTour = async () => {
      const activities = await getPublicActivities();

      const selectedTour = activities.find(
        (t) => t.slug === slug && t.type === "event",
      );

      setTour(selectedTour);
    };

    loadTour();
  }, [slug]);

  if (!tour) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  //  SELECTED SLOT (from URL)
  const selectedSlot = tour.schedule?.find(
    (slot) => slot.date === selectedDate && slot.time === selectedTime,
  );

  // fallback (direct open case)
  const fallbackSlot = tour.schedule?.find((slot) =>
    isUpcoming(slot.date, slot.time),
  );

  const finalSlot = selectedSlot || fallbackSlot;

  const tourDate = finalSlot?.date;
  const startTime = finalSlot?.time;

  const isTourUpcoming = finalSlot
    ? isUpcoming(finalSlot.date, finalSlot.time)
    : false;

const slotAvailableSeats = finalSlot?.availableSeats || 0;
const isSoldOut = slotAvailableSeats === 0;

  return (
    <section className="bg-[url('/src/assets/Background/snow2.png')] py-10">
      <div className="max-w-285 mx-auto mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT IMAGE */}
          <div>
            <GroupTourImageSlider images={tour.images} />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h1 className="text-3xl font-bold text-[#DB4D27]">{tour.title}</h1>

            {/* DATE + TIME FIX */}
            <p className="text-[18px] font-semibold mt-2">
              Date: {tourDate ? formatDate(tourDate) : "N/A"} | Time:{" "}
              {startTime || "N/A"}
            </p>

            <p className="font-semibold mt-4 text-[24px]">
              INR {tour.price} /-
              <span className="text-[20px"> Per Person (All inclusive)</span>
            </p>

            {Array.isArray(tour.description) ? (
              <RichTextRenderer
                nodes={tour.description}
                className="mt-4 text-[16px] leading-6"
              />
            ) : (
              <p className="mt-4 text-[16px] leading-6">{tour.description}</p>
            )}

            <div className="mt-6 font-semibold">
              <p>{tour.note}</p>
            </div>
          </div>
        </div>

        {/* VENUE + BOOKING */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
          {tour.startingPoint && (
            <div>
              <p className="text-3xl font-bold text-[#DB4D27] my-5">
                Venue
              </p>

              <p className="text-[20px] font-bold">
                {tour.startingPoint.title}
              </p>

              {(tour.startingPoint.location_name ||
                tour.startingPoint.location_address) && (
                <StartingPointMap
                  location={`${tour.startingPoint.location_name || ""} ${tour.startingPoint.location_address || ""}`}
                />
              )}
            </div>
          )}
          <div className="mt-8 flex justify-center items-center">
            {!isTourUpcoming ? (
              <p className="text-gray-600 text-2xl font-bold">Booking Closed</p>
            ) : isSoldOut ? (
              <p className="text-red-600 text-2xl font-bold">SOLD OUT</p>
            ) : (
              <button
                onClick={() => setShowBooking(true)}
                className="bg-[#DB4D27] text-white px-8 py-3 rounded text-lg cursor-pointer"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={showBooking && isTourUpcoming}
        onClose={() => setShowBooking(false)}
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#DB4D27] mb-4">
            Booking Information
          </h2>

          {/*  FIX: selected slot pass */}
          <PublicEventBookingForm tour={tour} selectedSlot={finalSlot} />
        </div>
      </Modal>
    </section>
  );
};

export default PublicEventTourDetail;
