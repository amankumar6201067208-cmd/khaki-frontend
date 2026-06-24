import { useEffect, useState } from "react";
import { getHomePage } from "../../Data/HomeData/ChangesSection";

const WhatsNewSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHomePage();
      setData(res);
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="md:-mt-40">
      <div className="max-w-285 mx-auto -mt-160 md:mt-auto px-3 md:px-0">
        <div className="bg-[url('/src/assets/Background/Tours.jpg')] rounded-2xl p-3.5 md:p-4 flex md:flex-row flex-col gap-10 items-center md:items-start">
          {/* LEFT IMAGE */}
          <div className="rounded-xl flex justify-center">
            {data?.image && (
              <img
                src={data.image}
                alt="Whats New"
                className="md:h-80 w-auto"
              />
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-white leading-8 w-[90%] flex flex-col items-center md:items-start">
            <p className="md:text-[28px] text-[20px] font-semibold text-center md:text-start">
              {data.tag}
            </p>

            <h2 className="md:text-[28px] text-[20px] text-center md:text-start font-bold ">
              {data.title}
            </h2>

            <p className=" leading-6 text-white/90 mt-5 text-center md:text-start ">
              {data.description}
            </p>

            {/* LINKED BUTTON */}
            <a
              href={data.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-black px-6 py-1 mt-5 rounded-full font-semibold hover:bg-black hover:text-white transition uppercase"
            >
              {data.buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
