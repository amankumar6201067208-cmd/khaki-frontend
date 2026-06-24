import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { provideExpertiseSchema } from "./provideExpertiseSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import strapi from "../../api/strapi"; // path adjust
// import ReCAPTCHA from "react-google-recaptcha";

const ProvideExpertiseForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(provideExpertiseSchema),
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
      expertise: data.expertise || "",
      about: data.about?.trim() || "",
    };

    try {
      setLoading(true);

      const res = await strapi.post("/provide-expertise-form-enquiries", {
        data: payload,
      });

      console.log("SUCCESS →", res.data);

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
      <h2 className="text-2xl font-bold mb-4">Provide Expertise</h2>

      <p className="text-sm mb-10">
        Do you have specialised domain knowledge that you could share with the
        Foundation? It could be in a creative skill, heritage conservation,
        fund-raising and event management among others.
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
          <p className="text-red-600 text-xs">{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            className="input w-full"
            placeholder="Email"
          />
          <p className="text-red-600 text-xs">{errors.email?.message}</p>
        </div>

        {/* Phone */}
        <div>
          <input
            {...register("phone")}
            className="input w-full"
            placeholder="Phone"
          />
          <p className="text-red-600 text-xs">{errors.phone?.message}</p>
        </div>

        {/* Gender */}
        <div>
          <select {...register("gender")} className="input w-full">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <p className="text-red-600 text-xs">{errors.gender?.message}</p>
        </div>

        {/* Age */}
        <div>
          <input
            {...register("age")}
            className="input w-full"
            placeholder="Age (Years)"
          />
          <p className="text-red-600 text-xs">{errors.age?.message}</p>
        </div>

        {/* Education */}
        <div>
          <input
            {...register("education")}
            className="input w-full"
            placeholder="Education"
          />
          <p className="text-red-600 text-xs">{errors.education?.message}</p>
        </div>

        {/* Profession */}
        <div>
          <input
            {...register("profession")}
            className="input w-full"
            placeholder="Profession"
          />
          <p className="text-red-600 text-xs">{errors.profession?.message}</p>
        </div>

        {/* Expertise */}
        <div>
          <select {...register("expertise")} className="input w-full">
            <option value="">Select Expertise</option>
            <option value="administration">Administration</option>
            <option value="arts">Arts</option>
            <option value="event-management">Event Management</option>
            <option value="audio-visuals">Audio Visuals</option>
            <option value="fundraising">Fundraising</option>
            <option value="heritage-conservation">Heritage Conservation</option>
            <option value="library">Library</option>
            <option value="others">Others</option>
          </select>
          <p className="text-red-600 text-xs">{errors.expertise?.message}</p>
        </div>

        {/* About */}
        <div className="md:col-span-2">
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
        <div className="md:col-span-2 flex justify-end">
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

export default ProvideExpertiseForm;
