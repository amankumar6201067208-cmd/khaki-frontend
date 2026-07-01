import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateTourSchema } from "./privateTourSchema";
import { getNames } from "country-list";
import Modal from "../Modal";
import { STRAPI_BASE_URL } from "../../api/strapi";
// import ReCAPTCHA from "react-google-recaptcha";

const countries = getNames();

const addDuration = (time, hours) => {
  if (!time) return "";

  const [h, m] = time.split(":").map(Number);
  const totalMinutes = h * 60 + m + hours * 60;

  const newH = Math.floor(totalMinutes / 60);
  const newM = totalMinutes % 60;

  return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
};
const PrivateTourRequestForm = ({ tour }) => {
  const navigate = useNavigate();

  const privateConfig = tour?.privateConfig || {};
  const pricing = privateConfig?.pricing || {};
  const startSlots = privateConfig?.startSlots || [];
  const endSlots = privateConfig?.endSlots || [];

  const [totalAmount, setTotalAmount] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [captchaToken, setCaptchaToken] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(privateTourSchema),
    defaultValues: {
      title: "Mr",
      people: "",
    },
  });

  const selectedPeople = watch("people");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  useEffect(() => {
    if (!selectedPeople || !pricing) {
      setTotalAmount(0);
      return;
    }
    setTotalAmount(pricing[selectedPeople] || 0);
  }, [selectedPeople, pricing]);

  useEffect(() => {
    if (!startTime || !privateConfig.durationHours) return;
    const calculatedEnd = addDuration(startTime, privateConfig.durationHours);
    if (endSlots.includes(calculatedEnd)) {
      setValue("endTime", calculatedEnd);
    }
  }, [startTime]);

  useEffect(() => {
    if (!endTime || !privateConfig.durationHours) return;
    const calculatedStart = addDuration(endTime, -privateConfig.durationHours);
    if (startSlots.includes(calculatedStart)) {
      setValue("startTime", calculatedStart);
    }
  }, [endTime]);

  useEffect(() => {
    if (tour?.title) {
      setValue("tourName", tour.title);
    }
  }, [tour]);

  const onSubmit = async (data) => {
    console.log("FORM SUBMITTED ", data);
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      preferredDate: data.preferredDate,
      title: data.namePrifix,
      startTime: data.startTime, 
      endTime: data.endTime, 
      countryCode: data.countryCode,
      people: data.people,
      otherRequest: data.otherRequest,
      totalAmount,
      tourName: data.tourName,
    };

    try {
      setLoading(true);

      const res = await fetch(
        `${STRAPI_BASE_URL}/api/private-tour-bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: payload }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error?.message || "Booking failed");
      }

      //  Redirect
      navigate("/message-received");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-4">
          <select
            {...register("namePrifix")}
            className="border-[#DB4D27] border-b p-2 bg-transparent"
          >
            <option value="Mr">Mr.</option>
            <option value="Ms">Ms.</option>
            <option value="Mrs">Mrs.</option>
          </select>

          <div className="flex-1">
            <input
              {...register("name")}
              placeholder="Name"
              className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
            />
            <p className="text-[#DB4D27] text-sm">{errors.name?.message}</p>
          </div>
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
          />
          <p className="text-[#DB4D27] text-sm">{errors.email?.message}</p>

         <input type="hidden" {...register("tourName")} />
        </div>

        <div className="flex gap-3">
          <div className="w-28">
            <input
              {...register("countryCode")}
              placeholder="+91"
              className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
            />
            <p className="text-[#DB4D27] text-sm">
              {errors.countryCode?.message}
            </p>
          </div>

          <div className="flex-1">
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
            />
            <p className="text-[#DB4D27] text-sm">{errors.phone?.message}</p>
          </div>
        </div>

        <div>
          <select
            {...register("country")}
            className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <p className="text-[#DB4D27] text-sm">{errors.country?.message}</p>
        </div>

        <div>
          <input
            type="date"
            {...register("preferredDate")}
            className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
          />
          <p className="text-[#DB4D27] text-sm">
            {errors.preferredDate?.message}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            Preferred Timing (Tour Duration {privateConfig?.durationHours || 0}{" "}
            Hours)
          </h4>

          <div className="flex gap-4">
            {/* START TIME */}
            <select
              {...register("startTime")}
              className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
            >
              <option value="">Start Time</option>
              {startSlots.map((time, i) => (
                <option key={i} value={time}>
                  {time}
                </option>
              ))}
            </select>

            {/* END TIME */}
            <select
              {...register("endTime")}
              className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
            >
              <option value="">End Time</option>
              {endSlots.map((time, i) => (
                <option key={i} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <select
            {...register("people")}
            className="border-[#DB4D27] border-b w-full p-2 bg-transparent"
          >
            <option value="">Select No. of People</option>
            {Object.keys(pricing).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Any Other Request */}
        <div>
          <textarea
            {...register("otherRequest")}
            placeholder="Any other Request"
            rows={3}
            className="border-[#DB4D27] border-b w-full p-2 bg-transparent resize-none"
          />

          <p className="text-[#DB4D27] text-sm">
            {errors.otherRequest?.message}
          </p>
        </div>

        <div className="text-sm">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("acceptedTerms")}
              className="mt-1"
            />
            <span className="cursor-pointer">
              Please tick to show acceptance of{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-[#DB4D27] underline font-medium cursor-pointer"
              >
                Terms & Conditions
              </button>
            </span>
          </label>
          <p className="text-[#DB4D27] text-sm">
            {errors.acceptedTerms?.message}
          </p>
        </div>

        <div className="text-[16px] font-semibold">
          Total Amount Payable:<span className="text-[32px]"> ₹ {totalAmount}/-</span>
        </div>

        {/* reCAPTCHA */}
        {/* <ReCAPTCHA
          sitekey="6LcalpQsAAAAALjBVAMVp64pk37CgoMxcjgOUAxa"
          onChange={(token) => setCaptchaToken(token)}
        /> */}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#DB4D27] text-white px-6 py-3 rounded hover:bg-[#cc4c27] cursor-pointer"
        >
          {loading ? "Processing..." : "Click to send a request"}
        </button>
      </form>
      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)}>
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
                The Company may use photographs taken during the tour for
                publications on its websites, social media platforms and/ or in
                print advertising and for promotional literature.
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
      </Modal>
    </>
  );
};

export default PrivateTourRequestForm;
