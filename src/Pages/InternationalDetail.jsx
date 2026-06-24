import { useParams } from "react-router-dom";
import { seasonalSpecials } from "../Data/InternationalTourData/internationaltour";
import TourTab from "../Components/InternationalTour/TourTab";
import GroupTourImageSlider from "../Components/GroupToursDetails/GroupTourImageSlider";

const TourDetails = () => {
  const { slug } = useParams();

  const tour = seasonalSpecials.find((item) => item.slug === slug);

  if (!tour) return <div>Tour not found</div>;

  return (
    <section className="bg-[url('/src/assets/Background/snow2.png')] md:py-10 py-2 px-2.5">
      <div className="max-w-285 mx-auto mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div>
            <GroupTourImageSlider
              images={Array.isArray(tour.image) ? tour.image : [tour.image]}
            />
          </div>

          {/* CONTENT */}
          <div>
            <h1 className="text-3xl font-bold text-[#DB4D27]">#{tour.title}</h1>

            <p className="font-semibold mt-2 text-[24px]">
              From {tour.price} /-
            </p>

            {/* DESCRIPTION */}
            <p className="mt-4 text-[16px] leading-6">{tour.description}</p>

            {/* OPTIONAL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 mt-6 ">
              <div>
                <b className="text-[20px]">Duration:</b> {tour.duration}
              </div>
              <div>
                <b className="text-[20px]">Group Size:</b> {tour.distance}
              </div>
              <div>
                <b className="text-[20px]">Location:</b> {tour.location}
              </div>
              <div>
                <b className="text-[20px]">Departure:</b> {tour.date}
              </div>
            </div>

            {/* HIGHLIGHTS */}
            <h3 className="font-bold mt-6 text-[20px]">Highlights</h3>
            <ul className="grid grid-cols-2 gap-2 text-[16px] mt-2">
              {tour.highlights?.map((h, i) => (
                <li key={i}>✔ {h}</li>
              ))}
            </ul>

            <div className="mt-6">
                <button
                onClick={() => setShowBooking(true)}
                className="bg-[#DB4D27] text-white px-8 py-3 rounded text-lg cursor-pointer"
              >
                Book Now
              </button>
            </div>

            
          </div>
        </div>

        {/* PASS DATA */}
        <TourTab data={tour.details} />
      </div>
    </section>
  );
};

export default TourDetails;
