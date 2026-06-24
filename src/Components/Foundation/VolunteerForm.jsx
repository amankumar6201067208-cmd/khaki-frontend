import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { volunteerSchema } from "./volunteerSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import strapi from "../../api/strapi";

const VolunteerForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(volunteerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name?.trim(),
      email: data.email?.trim(),
      phone: data.phone?.trim(),
      gender: data.gender || "",
      age: String(data.age || ""),
      education: data.education?.trim() || "",
      profession: data.profession?.trim() || "",
      about: data.about?.trim() || "",
    };

    console.log("VOLUNTEER PAYLOAD →", payload);

    try {
      setLoading(true);

      const res = await strapi.post("/volunteer-form-enquiries", {
        data: payload,
      });

      console.log("SUCCESS →", res.data);

      reset(); // optional
      navigate("/message-received");
    } catch (error) {
      console.error("ERROR →", error.response?.data);
      alert(error.response?.data?.error?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Volunteer</h2>

      {/* Description */}
      <p className="text-sm mb-10">
        Khaki needs many hands on deck to take the message of heritage
        conservation across. If you have time and energy and can help us with
        the nitty-gritties of organising workshops and events, we would be more
        than grateful.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Row 1 */}
        <div>
          <input
            {...register("name")}
            className="input w-full"
            placeholder="Name"
          />
          <p className="text-red-600 text-xs">{errors.name?.message}</p>
        </div>

        <div>
          <input
            {...register("email")}
            className="input w-full"
            placeholder="Email"
          />
          <p className="text-red-600 text-xs">{errors.email?.message}</p>
        </div>

        {/* Row 2 */}
        <div>
          <input
            {...register("phone")}
            className="input w-full"
            placeholder="Phone"
          />
          <p className="text-red-600 text-xs">{errors.phone?.message}</p>
        </div>

        <div>
          <select {...register("gender")} className="input w-full">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <p className="text-red-600 text-xs">{errors.gender?.message}</p>
        </div>

        <div>
          <input
            {...register("age")}
            className="input w-full"
            placeholder="Age (Years)"
          />
          <p className="text-red-600 text-xs">{errors.age?.message}</p>
        </div>

        {/* Row 3 */}
        <div>
          <input
            {...register("education")}
            className="input w-full"
            placeholder="Education"
          />
          <p className="text-red-600 text-xs">{errors.education?.message}</p>
        </div>

        <div>
          <input
            {...register("profession")}
            className="input w-full"
            placeholder="Profession"
          />
          <p className="text-red-600 text-xs">{errors.profession?.message}</p>
        </div>

        {/* About */}
        <div className="md:col-span-3">
          <textarea
            {...register("about")}
            className="input w-full"
            placeholder="Tell us something about yourself"
            rows={4}
          />
          <p className="text-red-600 text-xs">{errors.about?.message}</p>
        </div>

        {/* reCAPTCHA */}
        {/* <ReCAPTCHA
          sitekey="YOUR_RECAPTCHA_SITE_KEY"
          onChange={(token) => setCaptchaToken(token)}
        /> */}

        {/* Submit */}
        <div className="md:col-span-3 flex justify-end">
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`px-8 py-2 rounded-full font-semibold transition
    ${
      isValid && !loading
        ? "bg-[#e4572e] text-white hover:bg-[#cc4c27] cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;
