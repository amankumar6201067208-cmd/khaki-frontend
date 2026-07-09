import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bunderRoomBookingSchema } from "./bunderRoomBookingSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import strapi from "../../api/strapi";

const BunderRoomBookingForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(bunderRoomBookingSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name?.trim(),
      email: data.email?.trim(),
      phone: data.phone?.trim(),
      organization: data.organization?.trim() || "",
      bookingDate: data.bookingDate,
      timing: data.timing || "",
      layout: data.layout || "",
      comments: data.comments?.trim() || "",
    };

    console.log("BUNDER ROOM BOOKING PAYLOAD →", payload);

    try {
      setLoading(true);

      const res = await strapi.post("/bunder-room-enquiries", {
        data: payload,
      });

      console.log("SUCCESS →", res.data);

      reset();
      navigate("/message-received");
    } catch (error) {
      console.error("ERROR →", error.response?.data);
      alert(error.response?.data?.error?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* NAME */}
      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
        />
        <p className="text-[#DB4D27] text-xs">{errors.name?.message}</p>
      </div>

      {/* EMAIL */}
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
        />
        <p className="text-[#DB4D27] text-xs">{errors.email?.message}</p>
      </div>

      {/* PHONE */}
      <div>
        <input
          {...register("phone")}
          placeholder="Phone"
          className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
        />
        <p className="text-[#DB4D27] text-xs">{errors.phone?.message}</p>
      </div>

      {/* ORGANIZATION */}
      <div>
        <input
          {...register("organization")}
          placeholder="Organization"
          className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
        />
        <p className="text-[#DB4D27] text-xs">{errors.organization?.message}</p>
      </div>

      {/* DATE */}
      <div>
        <input
          type="date"
          {...register("bookingDate")}
          onClick={(e) => e.currentTarget.showPicker?.()}
          onFocus={(e) => e.currentTarget.showPicker?.()}
          className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
        />
        <p className="text-[#DB4D27] text-xs">{errors.bookingDate?.message}</p>
      </div>

      {/* TIMING */}
      <div>
        <select
          {...register("timing")}
          className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
        >
          <option value="">Select Timing</option>
          <option value="m(9am-12pm)">M (9am-12pm)</option>
          <option value="a(1pm-4pm)">A (1pm-4pm)</option>
          <option value="e(5pm-8pm)">E (5pm-8pm)</option>
          <option value="m+a(9am-4pm)">M+A (9am-4pm)</option>
          <option value="a+e(1pm-8pm)">A+E (1pm-8pm)</option>
          <option value="m+a+e(9am-8pm)">M+A+E (9am-8pm)</option>
        </select>
        <p className="text-[#DB4D27] text-xs">{errors.timing?.message}</p>
      </div>

      {/* LAYOUT */}
      <div>
        <select
          {...register("layout")}
          className="border-b border-[#DB4D27] w-full p-2 bg-transparent"
        >
          <option value="">Select Layout</option>
          <option value="exhibition-layout">EXHIBITION LAYOUT</option>
          <option value="12-PAX-CONFERENCE-ROOM">12 PAX CONFERENCE ROOM</option>
          <option value="16-PAX-CLASSROOM-STYLE-SITTING">16 PAX CLASSROOM STYLE SITTING</option>
          <option value="16-PAX-CONFERENCE-ROOM">16 PAX CONFERENCE ROOM</option>
          <option value="24-PAX-THEATRE-STYLE-SITTING">24 PAX THEATRE STYLE SITTING</option>
          <option value="40-PAX-THEATRE-STYLE-SITTING">40 PAX THEATRE STYLE SITTING</option>
        </select>
        <p className="text-[#DB4D27] text-xs">{errors.layout?.message}</p>
      </div>

      {/* COMMENTS */}
      <div>
        <textarea
          {...register("comments")}
          placeholder="Any Other Comments"
          rows={3}
          className="border-b border-[#DB4D27] w-full p-2 bg-transparent resize-none"
        />
        <p className="text-[#DB4D27] text-xs">{errors.comments?.message}</p>
      </div>

      {/* reCAPTCHA */}
      {/* <ReCAPTCHA
            sitekey="YOUR_RECAPTCHA_SITE_KEY"
            onChange={(token) => setCaptchaToken(token)}
          /> */}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={!isValid || loading}
        className={`inline-flex items-center gap-2 bg-[#e4572e] text-white px-6 py-2 rounded-full font-semibold
          ${
            isValid && !loading
              ? "bg-[#DB4D27] text-white hover:bg-[#c54322] cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {loading ? "Processing..." : "Booking Request"}
      </button>
    </form>
  );
};

export default BunderRoomBookingForm;
