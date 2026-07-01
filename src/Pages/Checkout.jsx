import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { checkoutSchema } from "../Components/checkoutSchema";
import KhakiLabModel from "../Components/KhakiLab/BunderRoomModel";
import { getNames } from "country-list";
import { STRAPI_BASE_URL } from "../api/strapi";

const countries = getNames();

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Controls the Terms & Conditions popup (khakilabmodel)
  const [openTerms, setOpenTerms] = useState(false);

  if (!state?.booking || !state?.tour) {
    return (
      <div className="p-8">
        No booking data found. Please start booking from the trip page.
      </div>
    );
  }

  const { booking, tour } = state;
  const tickets = booking.tickets;
  const totalAmount = tickets * tour.price;

  const formattedAmount = totalAmount.toFixed(2); // "1.00"

  const formattedDate = new Date(booking.date)
  .toLocaleDateString("en-CA"); // ✅ gives YYYY-MM-DD

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      contact: {
        name: "",
        email: "",
        country: "",
        countryCode: "+91",
        phone: "",
      },
      passengers: Array.from({ length: tickets }, () => ({
        name: "",
        email: "",
        phone: "",
      })),
      acceptedTerms: false,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "passengers",
  });

  // 🔹 PAYU FORM SUBMIT
  const payWithPayU = (data) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.payuBaseUrl;

    const fields = {
      key: data.key,
      txnid: data.txnid,
      amount: data.amount,
      productinfo: data.productinfo,
      firstname: data.firstname,
      email: data.email,
      phone: data.phone,
      surl: data.surl,
      furl: data.furl,
      udf1: data.udf1, // This is your bookingId
      hash: data.hash,
    };

    Object.keys(fields).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = fields[key] || "";
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  // 🔹 FORM SUBMIT
  const onSubmit = async (data) => {
    try {
      // STEP 1 — Create Booking in Strapi
      const bookingPayload = {
        tourSlug: tour.slug.toLowerCase(), // ✅ ensure lowercase
        date: formattedDate,
        slot: booking.slot.time,
        tourTitle: tour.title,
        startingPoint: tour.startingPoint?.title,
        tickets,
        ...data,
        totalAmount,
      };

      const bookingRes = await fetch(
        `${STRAPI_BASE_URL}/api/booking/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingPayload),
        },
      );

      const bookingData = await bookingRes.json();

      if (!bookingData?.bookingId) {
        throw new Error("Booking creation failed");
      }

      console.log("BOOKING CREATED →", bookingData);

      // STEP 2 — Create Payment
      const paymentPayload = {
        amount: formattedAmount,
        firstname: data.contact.name,
        email: data.contact.email,
        phone: data.contact.phone,
        productinfo: tour.title,
        bookingId: bookingData.bookingId, // important
      };

      const paymentRes = await fetch(
        `${STRAPI_BASE_URL}/api/payment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentPayload),
        },
      );

      const paymentData = await paymentRes.json();

      if (!paymentData?.hash) {
        throw new Error("Payment initialization failed");
      }

      // STEP 3 — Redirect to PayU
      payWithPayU(paymentData);
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong while processing payment.");
    }
  };

  return (
    <div className="bg-[url('/src/assets/Background/snow2.png')]">
      <div className="max-w-285 mx-auto p-8 pt-25 md:pt-40">
        <h1 className="text-[#e4572e] text-[30px] font-bold mb-4 text-center md:text-start">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-semibold mb-2.5">Primary Contact</h3>

            <input
              {...register("contact.name")}
              className="w-full border-b p-2 mb-1"
              placeholder="Full Name"
            />
            <p className="text-red-600 text-xs">
              {errors.contact?.name?.message}
            </p>

            <input
              {...register("contact.email")}
              className="w-full border-b p-2 mb-1"
              placeholder="Email"
            />
            <p className="text-red-600 text-xs">
              {errors.contact?.email?.message}
            </p>

            <div className="flex gap-2 mb-1">
              <input
                {...register("contact.countryCode")}
                className="w-1/3 border-b p-2"
              />
              <input
                {...register("contact.phone")}
                className="w-2/3 border-b p-2"
                placeholder="Phone"
              />
            </div>

            <p className="text-red-600 text-xs">
              {errors.contact?.phone?.message}
            </p>

            <div>
              <select
                {...register("contact.country")}
                className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <p className="text-[#DB4D27] text-sm">
                {errors.contact?.country?.message}
              </p>
            </div>

            <h3 className="font-semibold mt-6 mb-2.5">
              Passenger Details (Optional)
            </h3>

            {fields.map((field, index) => (
              <div key={field.id} className="p-4 mb-4 rounded">
                <p className="font-medium mb-2">Passenger {index + 1}</p>

                <input
                  {...register(`passengers.${index}.name`)}
                  className="w-full border-b p-2 mb-1"
                  placeholder="Full Name"
                />

                <p className="text-red-600 text-xs">
                  {errors.passengers?.[index]?.name?.message}
                </p>

                <input
                  {...register(`passengers.${index}.email`)}
                  className="w-full border-b p-2 mb-1"
                  placeholder="Email"
                />

                <p className="text-red-600 text-xs">
                  {errors.passengers?.[index]?.email?.message}
                </p>

                <input
                  {...register(`passengers.${index}.phone`)}
                  className="w-full border-b p-2"
                  placeholder="Phone"
                />

                <p className="text-red-600 text-xs">
                  {errors.passengers?.[index]?.phone?.message}
                </p>
              </div>
            ))}

            {/* TERMS & CONDITIONS — required before payment */}
            <div className="mt-6 mb-4">
              <label className="text-xs flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register("acceptedTerms")}
                  className="mt-0.5"
                />
                <span>
                  Click on accept &amp; continue to confirm that you are a
                  citizen of India and have read all the{" "}
                  <span
                    onClick={() => setOpenTerms(true)}
                    className="text-orange-600 underline cursor-pointer"
                  >
                    Terms &amp; Conditions
                  </span>
                </span>
              </label>
              <p className="text-red-600 text-xs mt-1">
                {errors.acceptedTerms?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-3 rounded transition
                ${
                  isValid
                    ? "bg-[#e4572e] hover:bg-[#cc4c27] text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {isSubmitting ? "Processing..." : "Submit & Pay"}
            </button>
          </form>

          {/* SUMMARY */}
          <div className="relative">
            <div className="mb-6 p-4 border rounded sticky top-30 z-20">
              <h2 className="font-semibold text-[24px] mb-4">
                Booking Summary
              </h2>

              <p className="text-[20px] font-bold">{tour.title}</p>

              <p>
                Date: {new Date(booking.date).toDateString()} • Slot:{" "}
                {booking.slot.time}
              </p>

              <p>
                Tickets: {tickets} • Price: ₹ {tour.price} / person
              </p>

              <hr className="my-3" />

              <p className="font-semibold text-lg">
                Total Amount: ₹ {totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TERMS & CONDITIONS POPUP (khakilabmodel) */}
      <KhakiLabModel isOpen={openTerms} onClose={() => setOpenTerms(false)}>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-[#e4572e]">
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
            className="mt-6 px-6 py-2 rounded bg-[#e4572e] text-white hover:bg-[#cc4c27] cursor-pointer"
          >
            Close
          </button>
        </div>
      </KhakiLabModel>
    </div>
  );
};

export default Checkout;
