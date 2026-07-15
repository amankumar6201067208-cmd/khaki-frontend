import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useMemo } from "react";
import { publicWalkBookingSchema } from "./publicWalkBookingSchema";
import { STRAPI_BASE_URL } from "../../api/strapi";

const BACKEND_URL = STRAPI_BASE_URL;

// A brand-new extra ticket: only a category is needed (defaults to general).
const newExtraTicket = () => ({
  name: "",
  email: "",
  phone: "",
  category: "general",
});

const PublicEventBookingForm = ({ tour, selectedSlot }) => {
  const availableSeats = selectedSlot?.availableSeats || 0;

  const [limitError, setLimitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publicWalkBookingSchema),
    mode: "onChange",
    defaultValues: {
      participants: [{ name: "", email: "", phone: "", category: "" }],
      acceptedTerms: true, // events have no separate terms gate
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const participants = useWatch({ control, name: "participants" });

  // Total amount (flat price per ticket; events have no discount) 
  const totalAmount = useMemo(() => {
    if (!participants || participants.length === 0) return 0;
    return participants.reduce((total, p) => {
      if (!p?.category) return total;
      return total + (Number(tour.price) || 0);
    }, 0);
  }, [participants, tour.price]);

  // Primary participant validation 
  const isParticipantValid = (index) => {
    const p = participants?.[index];
    return (
      p?.name && p?.email && p?.phone && p?.category &&
      !errors?.participants?.[index]
    );
  };

  // Ticket quantity 
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

  // PayU form submit 
  const payWithPayU = (data) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.payuBaseUrl;

    const fieldMap = {
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
    };

    Object.entries(fieldMap).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value || "";
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  // Main submit 
  const onSubmit = async (data) => {
    if (!isParticipantValid(0)) return;

    if (data.participants.length > availableSeats) {
      setLimitError("Seat limit exceeded");
      return;
    }

    setIsSubmitting(true);

    try {
      const firstParticipant = data.participants[0];

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

      const bookingRes = await fetch(
        `${BACKEND_URL}/api/public-booking/create`,
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

      // FREE CASE
      if (bookingData.isFree) {
        window.location.href = `/thank-you?bookingId=${bookingData.bookingId}&status=confirmed&free=true`;
        return;
      }

      // PAID CASE — public events use their OWN PayU gateway (event-payment)
      const paymentRes = await fetch(`${BACKEND_URL}/api/event-payment/create`, {
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
      });

      const paymentData = await paymentRes.json();

      if (!paymentData?.hash) {
        throw new Error("Payment initialization failed");
      }

      payWithPayU(paymentData);

    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Available seats */}
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

      {/* Participants */}
      {fields.map((field, index) => {
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
                  <p className="text-[#DB4D27] text-xs">
                    {errors?.participants?.[index]?.category?.message}
                  </p>
                </div>
              </div>
            </div>
          );
        }

        /* EXTRA TICKET — name optional, no other required fields */
        return (
          <div
            key={field.id}
            className="border border-[#DB4D27]/60 p-2 rounded-md bg-white/40"
          >
            <h4 className="font-semibold text-[#DB4D27] mb-0">
              Person {index + 1} (optional)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="text-[#DB4D27] text-xs">
                  {errors?.participants?.[index]?.email?.message}
                </p>
              </div>
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
              <div>
                <select
                  {...register(`participants.${index}.category`)}
                  className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
                >
                  <option value="general">General</option>
                  <option value="senior">Senior Citizen</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>
          </div>
        );
      })}

      {limitError && <p className="text-red-600 font-semibold">{limitError}</p>}

      {/* Total amount */}
      <div className="text-lg font-bold text-[#DB4D27]">
        Total Amount: ₹ {totalAmount}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!isParticipantValid(0) || isSubmitting}
          className={`px-6 py-2 rounded transition
            ${!isParticipantValid(0) || isSubmitting
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-[#DB4D27] text-white cursor-pointer hover:bg-[#c44421]"
            }`}
        >
          {isSubmitting ? "Processing..." : "Submit & Continue"}
        </button>
      </div>
    </form>
  );
};

export default PublicEventBookingForm;
