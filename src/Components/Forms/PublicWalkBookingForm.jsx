import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { publicWalkBookingSchema } from "./publicWalkBookingSchema";
import { useWatch } from "react-hook-form";
import KhakiLabModel from "../KhakiLab/BunderRoomModel";
import { STRAPI_BASE_URL } from "../../api/strapi";

const BACKEND_URL = STRAPI_BASE_URL;

// A brand-new extra ticket: only a category is needed (defaults to general).
const newExtraTicket = () => ({
  name: "",
  email: "",
  phone: "",
  category: "general",
});

const PublicWalkBookingForm = ({ tour, selectedSlot }) => {
  const availableSeats = selectedSlot?.availableSeats || 0;

  const [limitError, setLimitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  // Fresh remaining discount quota from backend — update on every calculate call
  const [remainingDiscountQuota, setRemainingDiscountQuota] = useState(3);
  // Controls the Terms & Conditions popup (khakilabmodel)
  const [openTerms, setOpenTerms] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publicWalkBookingSchema),
    mode: "onChange",
    defaultValues: {
      // Primary participant starts with an empty category so they actively pick one.
      participants: [{ name: "", email: "", phone: "", category: "" }],
      acceptedTerms: false,
    },
  });

  /* WATCH TERMS ACCEPTANCE */
  const acceptedTerms = watch("acceptedTerms");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  /* WATCH PARTICIPANTS */
  const participants = useWatch({
    control,
    name: "participants",
  });

  /* FIRST PARTICIPANT VALIDATION — only the primary needs full details */
  const firstParticipant = participants?.[0];

  const isFirstParticipantValid =
    firstParticipant?.name &&
    firstParticipant?.email &&
    firstParticipant?.phone &&
    firstParticipant?.category &&
    !errors?.participants?.[0];

  /* TICKET QUANTITY — sync the participants field array to the chosen count */
  const ticketCount = fields.length;

  const setTickets = (next) => {
    if (availableSeats < 1) return;
    const target = Math.max(1, Math.min(next, availableSeats));
    const current = fields.length;

    if (target > current) {
      const toAdd = Array.from({ length: target - current }, newExtraTicket);
      append(toAdd);
      setLimitError("");
    } else if (target < current) {
      const removeIdx = [];
      for (let i = target; i < current; i++) removeIdx.push(i);
      remove(removeIdx);
    }
  };

  /* DISCOUNT FUNCTION — uses fresh backend quota, not stale selectedSlot prop */
  const getDiscountPercent = (category, indexInForm) => {
    if (category !== "student" && category !== "senior") return 0;

    // Count how many eligible participants BEFORE this index already got discount
    const eligibleBefore = participants
      .slice(0, indexInForm)
      .filter((p) => p?.category === "student" || p?.category === "senior")
      .length;

    // remainingDiscountQuota is fresh from backend (updated on every calculate call)
    const quotaLeftForThis = remainingDiscountQuota - eligibleBefore;

    return quotaLeftForThis > 0 ? 25 : 0;
  };

  /* TOTAL AMOUNT — fetch from backend so discountUsedCount is always fresh */
  useEffect(() => {
    const allFilled = participants?.every((p) => p?.category);
    if (!participants || participants.length === 0 || !allFilled) {
      setTotalAmount(0);
      return;
    }

    const calculate = async () => {
      setIsCalculating(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/public-walk-booking/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tourSlug: tour.slug,
            date: selectedSlot?.date,
            slot: selectedSlot?.time,
            participants,
            pricePerPerson: Number(tour.price) || 0,
          }),
        });
        const data = await res.json();
        if (data?.totalAmount !== undefined) {
          setTotalAmount(data.totalAmount);
        }
        // ✅ Store fresh remaining quota — used by getDiscountPercent for UI display
        if (data?.remainingDiscountQuota !== undefined) {
          setRemainingDiscountQuota(data.remainingDiscountQuota);
        }
      } catch {
        // Fallback to local calculation if backend fails
        const fallback = participants.reduce((total, p, idx) => {
          if (!p?.category) return total;
          const price = Number(tour.price) || 0;
          const discount = getDiscountPercent(p.category, idx);
          return total + (discount > 0 ? price - (price * discount) / 100 : price);
        }, 0);
        setTotalAmount(fallback);
      } finally {
        setIsCalculating(false);
      }
    };

    calculate();
  }, [participants, tour.price, selectedSlot?.time]);

  // 🔹 PayU redirect
  const payWithPayU = (data) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.payuBaseUrl;

    Object.entries({
      key: data.key,
      txnid: data.txnid,
      amount: data.amount,
      productinfo: data.productinfo,
      firstname: data.firstname,
      email: data.email,
      phone: data.phone,
      surl: data.surl,
      furl: data.furl,
      udf1: data.udf1,
      hash: data.hash,
    }).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value || "";
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  /* SUBMIT */
  // 🔥 MAIN SUBMIT
  const onSubmit = async (data) => {
    if (!isFirstParticipantValid) return;
    if (!data.acceptedTerms) return;

    if (data.participants.length > availableSeats) {
      setLimitError("Seat limit exceeded");
      return;
    }

    setIsSubmitting(true);

    try {
      const firstParticipant = data.participants[0];

      // ✅ BOOKING PAYLOAD
      const bookingPayload = {
        tourSlug: tour.slug.toLowerCase(),
        date: selectedSlot?.date,
        slot: selectedSlot?.time,
        tickets: data.participants.length,
        totalAmount,

        contact: {
          name: firstParticipant.name,
          email: firstParticipant.email,
          phone: firstParticipant.phone,
        },

        passengers: data.participants,
        tourTitle: tour.title,
        startingPoint: tour.startingPoint?.title,
      };

      // ✅ CREATE BOOKING
      const bookingRes = await fetch(
        `${BACKEND_URL}/api/public-walk-booking/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingPayload),
        }
      );

      const bookingData = await bookingRes.json();

      if (!bookingData?.bookingId) {
        throw new Error("Booking creation failed");
      }

      // ✅ CREATE PAYMENT
      const paymentRes = await fetch(
        `${BACKEND_URL}/api/payment/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(totalAmount).toFixed(2),
            firstname: firstParticipant.name,
            email: firstParticipant.email,
            phone: firstParticipant.phone,
            productinfo: tour.title,
            bookingId: bookingData.bookingId,
          }),
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentData?.hash) {
        throw new Error("Payment initialization failed");
      }

      // ✅ REDIRECT TO PAYU
      payWithPayU(paymentData);

    } catch (error) {
      console.error("PUBLIC WALK ERROR:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* AVAILABLE SEATS */}
      <p className="font-semibold text-[#DB4D27] text-lg">
        Available Seats: {availableSeats}
      </p>

      {/* TICKET QUANTITY SELECTOR */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-[#DB4D27]">Number of Tickets:</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTickets(ticketCount - 1)}
            disabled={ticketCount <= 1}
            className={`w-9 h-9 rounded-full border text-xl leading-none flex items-center justify-center transition
              ${
                ticketCount <= 1
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-[#DB4D27] text-[#DB4D27] hover:bg-[#DB4D27] hover:text-white cursor-pointer"
              }`}
            aria-label="Decrease tickets"
          >
            −
          </button>
          <span className="w-8 text-center text-lg font-bold">{ticketCount}</span>
          <button
            type="button"
            onClick={() => setTickets(ticketCount + 1)}
            disabled={ticketCount >= availableSeats}
            className={`w-9 h-9 rounded-full border text-xl leading-none flex items-center justify-center transition
              ${
                ticketCount >= availableSeats
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-[#DB4D27] text-[#DB4D27] hover:bg-[#DB4D27] hover:text-white cursor-pointer"
              }`}
            aria-label="Increase tickets"
          >
            +
          </button>
        </div>
      </div>

      {/* PARTICIPANTS */}
      {fields.map((field, index) => {
        const participant = participants?.[index] || {};
        const isPrimary = index === 0;

        /* PRIMARY CONTACT — full details required */
        if (isPrimary) {
          return (
            <div
              key={field.id}
              className="border border-[#DB4D27] p-2 rounded-md space-y-4"
            >
              <h4 className="font-bold text-[#DB4D27] mb-0">
                Primary Contact
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* NAME */}
                <div>
                  <input
                    {...register(`participants.${index}.name`)}
                    placeholder="Name"
                    className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                  />
                  <p className="text-[#DB4D27] text-xs">
                    {errors?.participants?.[index]?.name?.message}
                  </p>
                </div>

                {/* EMAIL */}
                <div>
                  <input
                    {...register(`participants.${index}.email`)}
                    placeholder="Email"
                    className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                  />
                  <p className="text-[#DB4D27] text-xs">
                    {errors?.participants?.[index]?.email?.message}
                  </p>
                </div>

                {/* PHONE */}
                <div>
                  <input
                    {...register(`participants.${index}.phone`)}
                    placeholder="Phone"
                    className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                  />
                  <p className="text-[#DB4D27] text-xs">
                    {errors?.participants?.[index]?.phone?.message}
                  </p>
                </div>

                {/* CATEGORY */}
                <div>
                  <select
                    {...register(`participants.${index}.category`)}
                    className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="general">General</option>
                    <option value="senior">Senior Citizen</option>
                    <option value="student">Student</option>
                  </select>

                  <p className="text-xs text-gray-600">
                    {getDiscountPercent(participant.category, index) > 0
                      ? "25% discount applied"
                      : participant.category
                        ? "No discount"
                        : ""}
                  </p>

                  <p className="text-[#DB4D27] text-xs">
                    {errors?.participants?.[index]?.category?.message}
                  </p>
                </div>
              </div>
            </div>
          );
        }

        /* EXTRA TICKET — only category matters (name optional) */
        return (
          <div
            key={field.id}
            className="border border-[#DB4D27]/60 p-2 rounded-md bg-white/40"
          >
            <h4 className="font-semibold text-[#DB4D27] mb-0">
              Person {index + 1} (optional)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* OPTIONAL NAME */}
              <div>
                <input
                  {...register(`participants.${index}.name`)}
                  placeholder="Name"
                  className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                />
              </div>
              <div>
                <input
                  {...register(`participants.${index}.email`)}
                  placeholder="Email"
                  className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                />
              </div>
              <div>
                <input
                  {...register(`participants.${index}.phone`)}
                  placeholder="Phone"
                  className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                />
              </div>

              {/* CATEGORY (drives discount) */}
              <div>
                <select
                  {...register(`participants.${index}.category`)}
                  className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                >
                  <option value="general">General</option>
                  <option value="senior">Senior Citizen</option>
                  <option value="student">Student</option>
                </select>

                <p className="text-xs text-gray-600">
                  {getDiscountPercent(participant.category, index) > 0
                    ? "25% discount applied"
                    : "No discount"}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* LIMIT ERROR */}
      {limitError && <p className="text-red-600 font-semibold">{limitError}</p>}

      {/* TOTAL AMOUNT */}
      <div className="text-lg font-bold text-[#DB4D27]">
        Total Amount: {isCalculating ? "Calculating..." : `₹ ${totalAmount}`}
      </div>

      {/* TERMS & CONDITIONS — required before payment */}
      <div>
        <label className="text-xs flex items-start gap-2">
          <input
            type="checkbox"
            {...register("acceptedTerms")}
            className="mt-0.5"
          />
          <span>
            Click on accept &amp; continue to confirm that you are a citizen of
            India and have read all the{" "}
            <span
              onClick={() => setOpenTerms(true)}
              className="text-orange-600 underline cursor-pointer"
            >
              Terms &amp; Conditions
            </span>
          </span>
        </label>
        <p className="text-[#DB4D27] text-xs mt-1">
          {errors.acceptedTerms?.message}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={
            !isFirstParticipantValid ||
            isCalculating ||
            totalAmount === 0 ||
            !acceptedTerms
          }
          className={`px-6 py-2 rounded
            ${
              !isFirstParticipantValid ||
              isCalculating ||
              totalAmount === 0 ||
              !acceptedTerms
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#DB4D27] text-white cursor-pointer"
            }`}
        >
          {isSubmitting ? "Processing..." : isCalculating ? "Calculating..." : "Submit & Pay"}
        </button>
      </div>

      {/* TERMS & CONDITIONS POPUP (khakilabmodel) */}
      <KhakiLabModel isOpen={openTerms} onClose={() => setOpenTerms(false)}>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-[#DB4D27]">
            Terms &amp; Conditions
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              This is dummy placeholder content for the Terms &amp; Conditions.
              Replace it with the actual policy text later.
            </p>
            <p>
              1. All bookings are subject to availability and confirmation from
              Khaki Tours.
            </p>
            <p>
              2. Payments made are non-refundable unless the tour is cancelled
              by the organiser.
            </p>
            <p>
              3. Participants must carry a valid government-issued ID on the day
              of the tour.
            </p>
            <p>
              4. By accepting these terms you confirm that you are a citizen of
              India and have read all the conditions above.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenTerms(false)}
            className="mt-6 px-6 py-2 rounded bg-[#DB4D27] text-white hover:bg-[#c2401f] cursor-pointer"
          >
            Close
          </button>
        </div>
      </KhakiLabModel>
    </form>
  );
};

export default PublicWalkBookingForm;
