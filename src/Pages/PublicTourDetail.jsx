import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import { getPublicActivities } from "../Data/TripData/publicActivities";
import GroupTourImageSlider from "../Components/GroupToursDetails/GroupTourImageSlider";
import StartingPointMap from "../Components/GroupToursDetails/StartingPointMap";
import PublicWalkBookingForm from "../Components/Forms/PublicWalkBookingForm";
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

/* CALCULATE END TIME */
const calculateEndTime = (startTime, duration) => {
  if (!startTime || !duration) return "";

  const start = new Date(`1970-01-01T${startTime}`);
  const hours = parseFloat(duration);

  const end = new Date(start.getTime() + hours * 60 * 60 * 1000);

  return end.toTimeString().slice(0, 5);
};

/* TOTAL AVAILABLE SEATS */
const getAvailableSeats = (tour) => {
  if (!tour.schedule?.length) return 0;

  return tour.schedule.reduce(
    (total, slot) => total + (slot.availableSeats || 0),
    0,
  );
};

const PublicTourDetail = () => {
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
        (t) => t.slug === slug && t.type === "walk",
      );

      setTour(selectedTour);
    };

    loadTour();
  }, [slug]);

  if (!tour) {
    return <div className="py-20 text-center">Loading...</div>;
  }
  const selectedSlot = tour.schedule?.find(
    (slot) => slot.date === selectedDate && slot.time === selectedTime,
  );

  const fallbackSlot = tour.schedule?.find((slot) =>
    isUpcoming(slot.date, slot.time),
  );

  const finalSlot = selectedSlot || fallbackSlot;

  const startTime = finalSlot?.time;
  const tourDate = finalSlot?.date;
  const endTime = calculateEndTime(startTime, tour.duration);

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

            <p className="text-[18px] font-semibold mt-2">
              Date: {tourDate ? formatDate(tourDate) : "N/A"} | Time:{" "}
              {startTime ? `${startTime} - ${endTime}` : "N/A"}
            </p>

            <p className="font-semibold mt-4 text-[24px]">
              INR {tour.price} /-
              <span className="text-[20px]"> Per Person (All inclusive)</span>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
              <div className="flex gap-2.5">
                <div className="text-[30px]">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div>
                  <strong>Duration</strong>
                  <p>{tour.duration}</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <div className="text-[30px]">
                  <i className="fa-regular fa-compass"></i>
                </div>
                <div>
                  <strong>Distance</strong>
                  <p>{tour.distance}</p>
                </div>
              </div>
            </div>

            <h3 className="font-bold mt-6 text-[24px]">HIGHLIGHTS</h3>

            <ul className="grid grid-cols-2 gap-2 text-[16px] mt-2">
              {tour.highlights.map((h, i) => (
                <li key={i}>✔ {h}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* MAP + BOOKING */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
          {tour.startingPoint && (
            <div>
              <p className="text-3xl font-bold text-[#DB4D27] my-5">
                Starting Point
              </p>

              <p className="text-[20px] font-bold">
                {tour.startingPoint.title}
              </p>

              <StartingPointMap
                location={`${tour.startingPoint.location_name} ${tour.startingPoint.location_address || ""}`}
              />
            </div>
          )}

          {/* BOOKING */}
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

          <PublicWalkBookingForm tour={tour} selectedSlot={finalSlot} />
        </div>
      </Modal>
    </section>
  );
};

export default PublicTourDetail;
