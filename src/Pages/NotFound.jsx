import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[url('/src/assets/Background/snow2.png')] flex items-center justify-center px-6">
      
      <div className="max-w-3xl w-full text-center relative">
        
        {/* Content */}
        <div className="relative z-10">
          
          {/* Icon */}
          <div className="flex justify-center md:mb-6 mb-10">
            <div className="bg-[#DB4D15]/20 p-5 rounded-full">
              <i className="fa-solid fa-location-dot text-3xl text-[#DB4D15]"></i>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-7xl font-bold text-black mb-4 tracking-wide">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
            You’ve wandered off the trail
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Looks like this path doesn’t exist. But don’t worry — every great
            journey has a few wrong turns. Let’s get you back to exploring
            something amazing.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            {/* Go Home */}
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-[#1f2937] text-white px-6 py-3 rounded-lg hover:bg-black transition"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Back to Home
            </Link>

            {/* Explore Tours */}
            <Link
              to="/walk-tours"
              className="border border-[#1f2937] text-[#1f2937] px-6 py-3 rounded-lg hover:bg-[#1f2937] hover:text-white transition"
            >
              Explore Tours
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-600 mt-10">
            Lost in the city? Every corner has a story waiting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;