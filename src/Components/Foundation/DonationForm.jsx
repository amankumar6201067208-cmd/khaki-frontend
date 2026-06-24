import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../Components/KhakiLab/BunderRoomModel";
import TermsConditionsModal from "../Foundation/TermsConditionsModal";
import { donationSchema } from "./donationSchema";
// import ReCAPTCHA from "react-google-recaptcha";

const DonationForm = () => {
  const [openTerms, setOpenTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(donationSchema),
    mode: "onChange",
  });

 const onSubmit = async (data) => {
  try {
    // STEP 1 — Create donation
    const res = await fetch("http://localhost:1337/api/donation/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const donationData = await res.json();

    if (!donationData?.donationId) {
      throw new Error("Donation creation failed");
    }

    // STEP 2 — Create payment
    const paymentRes = await fetch(
      "http://localhost:1337/api/donation-payment/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(data.amount).toFixed(2),
          name: data.name,
          email: data.email,
          phone: data.phone,
          donationId: donationData.donationId,
        }),
      }
    );

    const paymentData = await paymentRes.json();

    // STEP 3 — PayU redirect
    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentData.payuBaseUrl;

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  return (
    <>
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Donation</h2>

        <p className="text-sm mb-10">
          The Khaki Heritage Foundation needs your help to make heritage a mass
          movement. Your donations will enable us to create awareness for the
          city’s heritage and archive and conserve it.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Name */}
          <div>
            <input
              {...register("name")}
              className="input w-full"
              placeholder="Name"
            />
            <p className="text-red-600 text-xs">
              {errors.name?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              className="input w-full"
              placeholder="Email"
            />
            <p className="text-red-600 text-xs">
              {errors.email?.message}
            </p>
          </div>

          {/* Phone */}
          <div>
            <input
              {...register("phone")}
              className="input w-full"
              placeholder="Phone"
            />
            <p className="text-red-600 text-xs">
              {errors.phone?.message}
            </p>
          </div>

          {/* Address */}
          <div>
            <input
              {...register("address")}
              className="input w-full"
              placeholder="Residence Address"
            />
            <p className="text-red-600 text-xs">
              {errors.address?.message}
            </p>
          </div>

          {/* PAN */}
          <div>
            <input
              {...register("pan")}
              className="input w-full"
              placeholder="PAN card details"
            />
            <p className="text-red-600 text-xs">
              {errors.pan?.message}
            </p>
          </div>

          {/* Donation Amount */}
          <div className="relative">
            <input
              {...register("amount")}
              className="input pr-12 w-full"
              placeholder="Donation Amount"
            />
            <span className="absolute right-0 bottom-2 text-sm font-semibold text-orange-600">
              INR
            </span>
            <p className="text-red-600 text-xs">
              {errors.amount?.message}
            </p>
          </div>

          {/* Comments */}
          <div className="md:col-span-2">
            <textarea
              {...register("comments")}
              className="input w-full"
              placeholder="Any other comments"
              rows={4}
            />
          </div>

          {/* reCAPTCHA */}
          {/* <ReCAPTCHA
            sitekey="YOUR_RECAPTCHA_SITE_KEY"
            onChange={(token) => setCaptchaToken(token)}
          /> */}

          {/* Terms */}
          <div className="md:col-span-2">
            <label className="text-xs flex items-start gap-2">
              <input
                type="checkbox"
                {...register("acceptedTerms")}
              />
              <span>
                Click on accept & continue to confirm that you are a citizen of
                India and have read all the{" "}
                <span
                  onClick={() => setOpenTerms(true)}
                  className="text-orange-600 underline cursor-pointer"
                >
                  Terms & Conditions
                </span>
              </span>
            </label>
            <p className="text-red-600 text-xs">
              {errors.acceptedTerms?.message}
            </p>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className={`px-8 py-2 rounded-full font-semibold transition
                ${
                  isValid
                    ? "bg-[#e4572e] text-white hover:bg-[#cc4c27] cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Accept & Continue
            </button>
          </div>
        </form>
      </div>

      {/* TERMS MODAL */}
      <Modal
        isOpen={openTerms}
        onClose={() => setOpenTerms(false)}
      >
        <TermsConditionsModal onClose={() => setOpenTerms(false)} />
      </Modal>
    </>
  );
};

export default DonationForm;
