import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const bookingId = searchParams.get("bookingId");
  const txnid = searchParams.get("txnid");
  const tourSlug = searchParams.get("tourSlug");

  const redirectPath = tourSlug ? `/walk-tours` : "/walk-tours";

  const TIMER_SECONDS = 10;
  const [countdown, setCountdown] = useState(TIMER_SECONDS);

  useEffect(() => {
    if (countdown <= 0) {
      navigate(redirectPath);
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate, redirectPath]);

  // Both "paid" and "confirmed" are success states
  const isSuccess = status === "paid" || status === "confirmed";
  const hasTxnid = Boolean(txnid);

  return (
    <section className="min-h-[80vh] bg-[url('/src/assets/Background/snow2.png')] flex items-center justify-center">
      <div className="text-center px-6">

        {isSuccess ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-[#231F20] mb-4">
             Booking Confirmed!
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#231F20] mb-2">
              Our team will get in touch with you soon.
            </p>
            <p className="text-[14px] text-gray-500 mb-1">
              Booking ID: <strong>{bookingId}</strong>
            </p>
            {hasTxnid && (
              <p className="text-[14px] text-gray-500 mb-4">
                Transaction ID: <strong>{txnid}</strong>
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              Payment Failed
            </h1>
            <p className="text-[16px] text-[#231F20] mb-2">
              Something went wrong. Please try again.
            </p>
            <p className="text-[14px] text-gray-500 mb-4">
              Booking ID: <strong>{bookingId}</strong>
            </p>
          </>
        )}

        {/* Text-only countdown */}
        <p className="text-[13px] text-gray-400 mb-8">
          Redirecting in <strong>{countdown}s</strong>...
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/walk-tours")}
            className="border border-[#E4572E] text-[#E4572E] px-8 py-3 rounded-full font-semibold hover:bg-[#E4572E] hover:text-white transition duration-300 cursor-pointer"
          >
            Other Tours
          </button>
        </div>

      </div>
    </section>
  );
};

export default SuccessPage;