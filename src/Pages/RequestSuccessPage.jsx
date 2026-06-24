import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[80vh] bg-[url('/src/assets/Background/snow2.png')] flex items-center justify-center">
      <div className="text-center px-6">
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#231F20] mb-4">
          Request Received
        </h1>

        {/* SUB TEXT */}
        <p className="text-[16px] md:text-[18px] text-[#231F20] mb-8">
          Our team will get in touch with you soon.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="bg-[#E4572E] text-white px-8 py-3 rounded-full font-semibold
                     hover:bg-[#cc4c27] transition duration-300 cursor-pointer"
        >
          Go To Home
        </button>
      </div>
    </section>
  );
};

export default SuccessPage;
