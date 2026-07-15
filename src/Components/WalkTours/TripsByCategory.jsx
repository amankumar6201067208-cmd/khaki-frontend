import TripCard from "../Home/TripCard";

const TripsByCategory = ({
  category,
  title,
  description,
  note,
  icon,
  trips,
}) => {

  const publishOrder = (t) =>
    new Date(t.publishDate || t.publishedAt || 0).getTime();

  const filteredTrips = trips
    .filter((trip) => trip.category === category)
    .sort((a, b) => publishOrder(b) - publishOrder(a));

  if (filteredTrips.length === 0) return null;

  return (
    <section className="mb-2.5">
      {/* HEADER */}
      <div className=" mb-3 bg-[url('/src/assets/Background/snow2.png')] w-full flex py-6 md:py-10 justify-center items-center">
        <div className="w-285 flex gap-6 md:items-start flex-col md:flex-row items-center">
          {icon && (
            <img
              src={icon}
              alt={title}
              className="md:w-40 w-auto h-50 md:h-32.5 object-cover rounded-3xl shadow-md"
            />
          )}

          <div>
            <h2 className="text-3xl font-bold text-[#db4d27] mb-4 text-center md:text-start">{title}</h2>
            <p className="text-black leading-relaxed max-w-4xl text-center md:text-start">
              {description}
            </p>
            {note && <p className="mt-2 text-sm font-semibold text-center md:text-start">{note}</p>}
          </div>
        </div>
      </div>
      {/* GRID */}
      <div className=" flex p-6 justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-285">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripsByCategory;
