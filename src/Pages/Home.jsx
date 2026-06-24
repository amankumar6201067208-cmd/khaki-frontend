import { useEffect, useState } from "react";
import { bannerSlides } from "../Data/HomeData/WebContent";
import { getTrips } from "../Data/TripData/trips";
import { getPublicActivities } from "../Data/TripData/publicActivities";
import TripSlider from "../Components/Home/TripSlider";
import PublicTabSection from "../Components/Home/PublicTabSection";
import WhatsNewSection from "../Components/Home/WhatsNewSection";
import { getInternationalImage } from "../Data/HomeData/ChangesSection";
import AmbassadorsSection from "../Components/Home/AmbassadorsSection";
import GuestReviewsCarousel from "../Components/Home/GuestReviewsCarousel";
import KhakiInNewsCarousel from "../Components/Home/KhakiInNewsCarousel";
import KhakiLabSection from "../Components/Home/KhakiLabSection";
import KhakiHeritageFoundation from "../Components/Home/KhakiHeritageFoundation";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [internationalImg, setInternationalImg] = useState(null);
  const [trips, setTrips] = useState([]);
  const [publicActivities, setPublicActivities] = useState([]);

  useEffect(() => {
    const loadInternationalImage = async () => {
      try {
        const data = await getInternationalImage();
        setInternationalImg(data);
      } catch (err) {
        console.error("Error loading international image:", err);
      }
    };

    loadInternationalImage();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data);
      } catch (err) {
        console.error("Error loading trips:", err);
      }
    };

    loadTrips();
  }, []);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await getPublicActivities();
        setPublicActivities(data);
      } catch (err) {
        console.error("Error loading public activities:", err);
      }
    };

    loadActivities();
  }, []);

  const groupTours = trips
    .filter((trip) => trip.tourType === "group")
    .filter((trip) => trip.publishDate)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 15);

  const privateTours = trips
    .filter((trip) => trip.tourType === "private")
    .filter((trip) => trip.publishDate)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 15);

  const publicWalks = (publicActivities || []).filter(
    (item) => item.type === "walk",
  );

  const publicEvents = (publicActivities || []).filter(
    (item) => item.type === "event",
  );

  return (
    <>
      {/* Banner */}

      <div className="relative w-full h-150 overflow-hidden">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <h1 className="text-2xl md:text-4xl font-semibold bg-white/80 text-black px-6 py-4 rounded">
                {slide.heading}
              </h1>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trips Section */}

      <section className="bg-[url('/src/assets/Background/Tours.jpg')] bg-center py-16 px-2.5 h-340 md:h-240">
        <div className="bg-white max-w-285 mx-auto rounded-[25px] p-6 md:p-10 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.5)] -mt-40 md:-mt-36 z-10 relative">
          {/* GROUP TOURS */}

          <h2 className="text-2xl text-center md:text-start font-bold mb-3">
            GROUP TOURS
          </h2>

          <p className="text-gray-600 mb-6 text-center md:text-start">
            Are you a solo traveller or a couple looking for an affordable way
            to see Mumbai? Sign up for our group walks and tours. Each group
            experience begins at a fixed time with a motley bunch of travellers
            for company, and is led by one of our Ambassadors of Mumbai.
          </p>

          <TripSlider trips={groupTours} />

          {/* PRIVATE TOURS */}

          <h2 className="text-2xl font-bold mt-7 mb-3 text-center md:text-start">
            PRIVATE TOURS
          </h2>

          <p className="text-gray-600 mb-6 text-center md:text-start">
            Travelling as a family or as a group? Or just want the flexibility
            of a tour at a time of your convenience? Our private tours of the
            city are ideal for you. Choose your time and your pace to explore
            the city with our Ambassadors of Mumbai.
          </p>

          <TripSlider trips={privateTours} />
        </div>
      </section>

      {/* Public Walk & Events */}

      <section className="bg-[url('/src/assets/Background/snow2.png')] py-16 px-3 md:h-170 h-325">
        <div className="bg-white max-w-285 mx-auto rounded-[25px] p-6 md:p-10 -mt-150 md:-mt-60 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.5)]">
          <h2 className="text-3xl font-bold text-center mb-6">
            Public walks and events for Mumbaikars
          </h2>

          <p className="text-center text-gray-600 mb-10">
            For residents of Mumbai who know the city fairly well, we curate and
            conduct heritage walks in various city neighbourhoods as a way for
            them to understand their city's history and heritage better. We also
            organise talks, workshops and exhibitions on the history, heritage
            and culture of the city and beyond at the Khaki Lab as well as
            online.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <PublicTabSection title="KhakiWalks" items={publicWalks} />

            <PublicTabSection title="KhakiEvents" items={publicEvents} />
          </div>
        </div>
      </section>

      <WhatsNewSection />

      {/* International Image */}

      <section className="flex justify-center items-center mt-16">
        <div className="w-285">
          {internationalImg && (
            <a href={internationalImg.imageLink}>
              <img
                src={internationalImg.image}
                alt="International Tours"
                className="h-auto w-full rounded-xl"
              />
            </a>
          )}
        </div>
      </section>

      <AmbassadorsSection />

      <GuestReviewsCarousel />

      <KhakiInNewsCarousel />

      <KhakiLabSection />

      <KhakiHeritageFoundation />
    </>
  );
};

export default Home;
