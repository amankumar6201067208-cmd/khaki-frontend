import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { checkoutSchema } from "../Components/checkoutSchema";
import KhakiLabModel from "../Components/KhakiLab/BunderRoomModel";
import { getOrderedCountries } from "../utils/countries";
import { STRAPI_BASE_URL } from "../api/strapi";

const countries = getOrderedCountries();

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
  .toLocaleDateString("en-CA");

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

  //  PAYU FORM SUBMIT
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

  //  FORM SUBMIT
  const onSubmit = async (data) => {
    try {
      // STEP 1 — Create Booking in Strapi
      const bookingPayload = {
        tourSlug: tour.slug.toLowerCase(), //  ensure lowercase
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
          <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Please read the following terms and conditions very carefully as
              your use of our service is subject to your acceptance of and
              compliance with the following terms and conditions (hereinafter
              referred to as “Terms”).
            </p>
            <p>
              By subscribing to or using any of our services you agree that you
              have read, understood and are bound by the Terms, regardless of
              how you subscribe to or use the services. In these Terms,
              references to “client”, “guest” shall mean the end user (including
              individuals, corporates and other bodies) availing tour services
              by Khaki Tours Private Limited (hereinafter referred to as “the
              Company”).Reference to the term “host”, “Ambassador of Mumbai”
              shall refer to the person conducting the tour on behalf of the
              company.
            </p>
            <ul className="list-inside list-disc pl-4">
              <li>
                The guest shall note that it is expected of him to arrive at the
                starting point of the tour 15 minutes prior to the given
                starting time. In the event of the guest delaying the
                commencement of the tour at the given time for any reason
                whatsoever , the host holds the absolute right to modify the
                route of the tour and also reduce its duration in a manner so as
                to finish the tour at the pre-decided timing.
              </li>
              <br />
              <li>
                The guest should also take note that the duration and route of
                the tour will vary depending on circumstances like traffic
                conditions, pace of walking, time spent by the guest at
                different locations and also the number of questions asked by
                the guest.
              </li>
              <br />
              <li>
                The guest shall note that entry to religious and holy places or
                any other places where a dress code is mandated may be
                prohibited on grounds of inappropriate clothing. Instructions
                regarding an appropriate dress code for certain tours shall be
                given in advance to the guest. The Company shall not be held
                responsible and/ or liable for such restrictions.
              </li>
              <br />
              <li>
                Smoking and consumption of alcoholic beverages are strictly
                prohibited during the tour
              </li>
              <br />
              <li>
                We take utmost care in selecting a vehicle for the tour.
                However, we do not own or control any vehicles and do not employ
                any chauffeur. Any additional usage of vehicle other than that
                specified in the itinerary will attract an additional cost and
                must be settled on tour directly. Any damages caused by the
                guest to the vehicle/coach during the travel shall be payable by
                the guest and the Company shall not be held responsible and/ or
                Iiable for the same.
              </li>
              <br />
              <li>
                Inclusions:
                <ul className="list-inside list-disc pl-4">
                  <li>Service of a local expert</li>
                  <li>Transportation wherever specified</li>
                  <li>
                    Host may offer local food as part of the experience but it
                    is not mandatory
                  </li>
                  <li>Local taxes, unless specifically excluded</li>
                </ul>
              </li>
              <br />
              <li>
                Exclusions: Extra expenses such as shopping, food & beverages,
                fees for camera etc. and those not mentioned above.
              </li>
              <br />
              <li>
                The guest consents to the use of his/her personal information by
                the Company and/ or its third party providers solely for the
                purposes of the tour.
              </li>
              <br />
              <li>
                Tipping (in the form of cash or kind) is not mandatory but the
                guest is at liberty to tip the host and/ or the driver
              </li>
              <br />
              <li>
                The Company and/ or its representatives hereby assume no
                liability in contract, tort or otherwise on account of loss of
                life, personal injuries or property damages to the guest arising
                out of any events, happenings or occurrence during the tour
                except where such loss of life, personal injuries or property
                was caused by the fault or negligence of the Company.
              </li>
              <br />
              <li>
                The guest agrees to indemnify the Company from and against any
                and all actions, claims, losses, damages, liabilities and
                expenses (including legal fees) arising out of the conduct of
                any of the customers on the tour.
              </li>
              <br />
              <li>
                With respect to food tours, the guest understands that the tour
                will include physically walking to various locations and
                sampling street foods and beverages where hygiene could be an
                issue especially for foreigners. The guest agrees to inform the
                Company of any restrictions that may affect him before starting
                the tour, including, without limitation, food allergies, dietary
                restrictions and any other health concerns. The guest shall not
                hold the Company responsible and/ or liable in the event of any
                health complications arising during or post the tour.
              </li>
              <br />
              <li>
                The Company may use Photographs/ Videos taken during the tour
                for publication on its or third party websites, social medai
                platforms and/ or in print advertising and for promotional
                literature.
              </li>
              <br />
              <li>
                The health and wellbeing of our guests, staff, hosts and other
                stakeholders is of utmost importance to us. In times of the
                <strong> prevailing Covid 19 pandemic,</strong> the guest shall
                follow social distancing norms and wear a mask at all times
                throughout the tour along with regularly using hand sanitizers
                and also follow any other measures as may be mandated by the
                authorities from time to time. The Company remains committed to
                maintaining hygiene and sanitation standards as per latest
                government protocols in effect. In case the guest experiences
                any Covid-19 (or any other contagious disease) symptoms before
                or during the tour, he is expected to inform the Company
                immediately. Further, the guest shall confirm that he resides in
                a non-containment zone. In the event of the occurrence of
                symptoms before a tour , the cancellation rules stated above
                will apply. In the event of the guest contracting Covid-19 (or
                any other disease) at any time after the tour, he shall not hold
                the Company responsible and/ or liable for the same.
              </li>
              <br />
              <li>
                The guest shall also note that the company may cancel a tour if
                related Covid 19 restrictions are enforced by the local
                government authorities from time to time.
              </li>
              <br />
              <li>
                The company also reserves the right to cancel a tour in case of
                adverse weather conditions or any problems with the host
                conducting the tour.
              </li>
              <br />
              <li>
                The Company reserves the sole right to change or modify these
                terms and conditions without notice.
              </li>
              <br />
              <li>
                Where the context so requires, all references in this document
                to the singular shall be deemed to include the plural and all
                references to the masculine shall be deemed to include the
                feminine and a body corporate and vice versa. Unenforceability
                or invalidity of one or more clauses in these Terms shall not
                have an effect on any other clause in these Terms. If it is
                possible, any unenforceable or invalid clause in these Terms
                shall be modified to show the original intention of the parties.
              </li>
              <br />
              <li>
                The validity, construction, interpretation and enforceability of
                these Terms and Conditions and the capacity of the parties shall
                be determined and governed by the laws of the Republic of India.
              </li>
              <br />
              <li>
                These terms are subject to jurisdiction of the courts in Mumbai
              </li>
              <br />
            </ul>
          </div>
        </div>
      </KhakiLabModel>
    </div>
  );
};

export default Checkout;
