import { useEffect, useState } from "react";
import PublicTabSection from "../../Components/Home/PublicTabSection";
import { getPublicActivities } from "../../Data/TripData/publicActivities";

const KhakiLabEvents = () => {
  const [publicEvents, setPublicEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getPublicActivities();

        const events = data.filter((item) => item.type === "event");

        setPublicEvents(events);
      } catch (err) {
        console.error("Error loading public events:", err);
      }
    };

    loadEvents();
  }, []);

  return (
    <section className="bg-[url('https://res.cloudinary.com/dsnnuxkfu/image/upload/v1775119298/mumbai-left_avq0dm.jpg')] bg-cover bg-center py-20">
      <div className="max-w-285 mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-60 items-center justify-center">
          {/* LEFT EVENTS */}

          <div className="bg-white p-6">
            <PublicTabSection title="KhakiEvents" items={publicEvents} />
          </div>

          {/* RIGHT INFO */}

          <div className="bg-black text-white p-8 w-87.5">
            <h3 className="text-[#DB4D27] text-2xl font-bold mb-4">
              Events @ K.H.A.K.I Lab
            </h3>

            <p className="text-[#FFFFFF80] leading-6 font-normal mb-4">
              While events at the K.H.A.K.I Lab such as lectures and exhibitions
              are hosted by Khaki, we are open to partner with other individuals
              or organisations to co-host events. You can also rent out our
              space to organise your own event. For more information, contact
              Amit at 8828100111
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KhakiLabEvents;
