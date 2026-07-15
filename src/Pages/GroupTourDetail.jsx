import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getTripBySlug } from "../Data/TripData/trips";
import GroupTourImageSlider from "../Components/GroupToursDetails/GroupTourImageSlider";
import GroupTourCalendar from "../Components/GroupToursDetails/BookingCalendar";
import StartingPointMap from "../Components/GroupToursDetails/StartingPointMap";
import RichTextRenderer from "../Components/RichTextRenderer";

const GroupTourDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendarKey, setCalendarKey] = useState(0); // calendar force re-mount key

  const loadTour = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTripBySlug(slug);
      console.log("=== FETCHED SCHEDULE ===", JSON.stringify(data?.schedule, null, 2));
      if (data && data.tourType === "group") {
        setTour(data);
        setCalendarKey((k) => k + 1); // fresh data aane pe calendar re-mount
      }
    } catch (err) {
      console.error("Error loading tour:", err);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    loadTour();
  }, [loadTour]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("refresh") === "1") {
      loadTour();
      navigate(location.pathname, { replace: true });
    }
  }, [location.search]);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!tour) {
    return <div className="py-20 text-center">Tour not found</div>;
  }

  return (
    <section className="bg-[url('/src/assets/Background/snow2.png')] py-10">
      <div className="max-w-285 mx-auto mt-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <GroupTourImageSlider images={tour.images} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#DB4D27]">
              #{tour.title}
            </h1>

            <p className="font-semibold mt-2 text-[24px]">
              INR {tour.price} /-
              <span className="text-[20px]"> Per Person (All inclusive)</span>
            </p>

            <RichTextRenderer
              nodes={tour.description}
              className="mt-4 text-[16px] leading-6"
            />

            <div className="mt-6 font-semibold">
              <RichTextRenderer nodes={tour.note} className="mt-1" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
              <div className="flex gap-2.5">
                <div className="text-[30px]">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div>
                  <strong className="text-[16px]">Duration</strong>
                  <p className="text-[14px]">{tour.duration}</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <div className="text-[30px]">
                  <i className="fa-regular fa-compass"></i>
                </div>
                <div>
                  <strong className="text-[16px]">Distance</strong>
                  <p className="text-[14px]">{tour.distance}</p>
                </div>
              </div>
            </div>

            <h3 className="font-bold mt-6 text-[24px]">HIGHLIGHTS</h3>
            <ul className="grid grid-cols-2 gap-2 text-[16px] mt-2">
              {tour.highlights?.map((h, i) => (
                <li key={i}>✔ {h}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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

          {/* key prop se calendar completely re-mount hoga jab fresh data aayega */}
          <GroupTourCalendar
            key={calendarKey}
            schedule={tour.schedule}
            tour={tour}
          />
        </div>

      </div>
    </section>
  );
};

export default GroupTourDetail;