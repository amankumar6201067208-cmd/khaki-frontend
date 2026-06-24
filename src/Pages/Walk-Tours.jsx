import { useEffect, useState } from "react";
import { getTrips } from "../Data/TripData/trips";
import { getPublicActivities } from "../Data/TripData/publicActivities";
import TripsByCategory from "../Components/WalkTours/TripsByCategory";
import PublicTabSection from "../Components/Home/PublicTabSection";

const Walks = () => {
  const [trips, setTrips] = useState([]);
  const [publicActivities, setPublicActivities] = useState([]);

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
        console.error("Error loading activities:", err);
      }
    };

    loadActivities();
  }, []);

  const publicWalks = publicActivities.filter((item) => item.type === "walk");

  const publicEvents = publicActivities.filter((item) => item.type === "event");

  return (
    <>
      {/* INTRO SECTION */}
      <section className="bg-[url('/src/assets/Background/snow2.png')] py-10 md:pt-40">
        <div className="max-w-285 mx-auto text-center">
          <h2 className="text-[32px] font-bold text-[#db4d27] mb-6">
            Our Experiences
          </h2>

          <p className="text-base text-black leading-relaxed mx-auto">
            At Khaki Tours, we have a variety of experiences for you to savour
            the city - on foot, by car, in a sail-boat, and in an open-top jeep.
            Whichever one you choose, you can be sure it will be special, as our
            Ambassadors of Mumbai don't follow a script but customise the
            experience taking into account your country of origin, your
            profession and your interests. Discover Mumbai with us, and you'll
            love the city as much as we do.
          </p>

          <div className="mt-4 h-px w-full bg-[#db4d27]"></div>
        </div>
      </section>

      {/* TRIPS BY CATEGORY */}
      <section>
        <div className="max-w-full mx-auto">
          <TripsByCategory
            category="Walking Tours"
            title="Walking Tours"
            description="They say the best way to understand a city is to walk its streets. So walk through the narrowest of lanes, where cars can't reach, with our Ambassadors of Mumbai to experience the city. We conduct walks in Mumbai's heritage district as well as in areas not normally on the tourist trail. We'll also be glad to customise a route for you based on your interests."
            icon="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119292/1_vmevux.png"
            trips={trips}
          />

          <TripsByCategory
            category="AC Vehicle Tours"
            title="AC Vehicle Tours"
            description="Don’t have enough time to see the city? Our City Tours are designed to give you a taste of the metropolis in a few hours and leave you asking for more. From essential views of Mumbai to explorations of off-beat areas, our city tours will make you fall in love with Mumbai."
            icon="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119292/4_miylpr.jpg"
            trips={trips}
          />

          <TripsByCategory
            category="Open Vehicle Tours"
            title="Open Vehicle Tours"
            description="With wind in your hair and wonder in your eyes, explore the city’s heritage at close quarters and discover the secrets the city holds, in an open-top jeep."
            note="Note: Closed during monsoon"
            icon="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119291/3_tporlh.png"
            trips={trips}
          />

          <TripsByCategory
            category="eVictoria rides"
            title="eVictoria rides"
            description="See Mumbai as the travellers of yore used to, a century ago - in a 'Victoria', a horse-drawn buggy, but with a modern twist: The horses have been replaced with batteries."
            icon="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119291/14-1_mesvim.jpg"
            trips={trips}
          />

          <TripsByCategory
            category="Food Tours"
            title="Food Tours"
            description="As varied as the city itself, Mumbai’s food culture will satiate your taste buds in countless ways. Join us on our journeys across cuisines and cultures - something we like to call ‘Food for Thought’!"
            icon="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119291/11_rw7v4p.jpg"
            trips={trips}
          />

          <TripsByCategory
            category="Boat Tours"
            title="Boat Tours"
            description="Before air travel became common, the sea was from where the visitors got their first glimpse of the city. Retrace the path of the traders and travellers of yore in an open yacht and take the sea route for a different view of the city skyline."
            icon="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119291/12-1_pmlq4w.jpg"
            trips={trips}
          />

          <TripsByCategory
            category="Day Tours"
            title="Day Tours"
            description="While our love for this city has no bounds, Khaki Tours offers you full day experiences that go beyond the Maximum City into the many historical enclaves of this region."
            icon="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119294/13_o7o2ko.jpg"
            trips={trips}
          />

          <TripsByCategory
            category="Group Tours"
            title="Group Tours"
            description="Are you a solo traveller or a couple looking for an affordable way to see Mumbai? Sign up for our group walks and tours. Each group experience begins at a fixed time with a motley bunch of travellers for company, and is led by one of our Ambassadors of Mumbai."
            icon="https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119289/9-1_glry5q.jpg"
            trips={trips}
          />
        </div>
      </section>

      {/* PUBLIC EVENTS */}
      <section className="bg-[#7E9777] py-16 px-3 md:h-190 h-325">
        <div className="bg-white max-w-285 mx-auto rounded-[25px] p-6 md:p-10 shadow-md">
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
    </>
  );
};

export default Walks;
