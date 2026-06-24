import { bookingSteps } from "../../Data/InternationalTourData/internationaltour";

const BookingSteps = () => {
  return (
    <section className="max-w-full px-4 py-16 flex items-center justify-center">
      <div className="max-w-285">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Complete Your Booking in 3 Easy Steps
          </h2>
          <p className="text-gray-500 mt-2">
            Just select where you want to go, we take care of rest
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bookingSteps.map((step, index) => (
            <div
              key={step.id}
              className="
              group rounded-2xl bg-white p-8
              transition-all duration-300
              hover:bg-[#e4572e] hover:shadow-2xl
            "
            >
              {/* Icon */}
              <div
                className="
                w-14 h-14 mb-6 flex items-center justify-center
                rounded-full bg-orange-100
                text-orange-500
                group-hover:bg-white group-hover:text-orange-400
                transition-all duration-300
              "
              >
                <i className={`${step.icon} text-xl`} />
              </div>

              {/* Title */}
              <h3
                className="
                text-lg font-semibold text-gray-800
                group-hover:text-white
                transition-colors duration-300
              "
              >
                {index + 1}. {step.title}
              </h3>

              {/* Description */}
              <p
                className="
                mt-3 text-gray-500
                group-hover:text-white/90
                transition-colors duration-300
              "
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;
