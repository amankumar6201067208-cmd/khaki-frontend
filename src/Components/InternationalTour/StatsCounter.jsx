import { useEffect, useState } from "react";

const statsData = [
  {
    value: 1056,
    label: "Customers We Already Served",
  },
  {
    value: 2099,
    label: "Trips We Already Served",
  },
  {
    value: 300,
    label: "Total Trip Types",
  },
  {
    value: 599,
    label: "Adventure Activity",
  },
];

const CounterItem = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 5000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

const StatsCounter = () => {
  return (
    <section className="bg-[url('/src/assets/Background/Tours.jpg')] py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">

        {statsData.map((item, i) => (
          <div key={i}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#ffffff]">
              <CounterItem target={item.value} />
            </h2>
            <p className="mt-2 text-sm md:text-base">
              {item.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default StatsCounter;