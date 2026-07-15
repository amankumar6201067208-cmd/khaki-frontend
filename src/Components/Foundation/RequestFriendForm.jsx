import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { requestFriendSchema } from "./requestFriendSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import strapi from "../../api/strapi";

const RequestFriendForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(requestFriendSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const payload = {
      yourName: data.yourName?.trim(),
      yourEmail: data.yourEmail?.trim(),
      friendName: data.friendName?.trim(),
      friendEmail: data.friendEmail?.trim(),
      message: `Support an NGO that's doing good work in the
            areas of heritage awareness, archiving and
            conservation - Khaki Heritage Foundation. <br>They
            need financial help for their initiatives, and I
            thought you may like to contribute to them. <br> Do
            visit their web page for more information:
            <a href="https://khakitours.com/foundation/">
              https://khakitours.com/foundation/
            </a>
            Cheers!`,
    };

    console.log("REQUEST FRIEND PAYLOAD →", payload);

    try {
      setLoading(true);

      const res = await strapi.post("/request-friend-forms", {
        data: payload,
      });

      console.log("SUCCESS →", res.data);

      reset();
      navigate("/message-received");

    } catch (error) {
      console.error("ERROR →", error.response?.data);
      alert(
        error.response?.data?.error?.message ||
        "Something went wrong "
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        Request a friend for donation
      </h2>

      {/* Description */}
      <p className="text-sm mb-10">
        We need your help in spreading the message of heritage
        awareness, archiving and conservation. Do send this
        message to your friends requesting them to contribute.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Your Name */}
        <div>
          <input
            {...register("yourName")}
            className="input w-full"
            placeholder="Your Name"
          />
          <p className="text-red-600 text-xs">
            {errors.yourName?.message}
          </p>
        </div>

        {/* Your Email */}
        <div>
          <input
            {...register("yourEmail")}
            className="input w-full"
            placeholder="Your Email"
          />
          <p className="text-red-600 text-xs">
            {errors.yourEmail?.message}
          </p>
        </div>

        {/* Friend Name */}
        <div>
          <input
            {...register("friendName")}
            className="input w-full"
            placeholder="Friend's Name"
          />
          <p className="text-red-600 text-xs">
            {errors.friendName?.message}
          </p>
        </div>

        {/* Friend Email */}
        <div>
          <input
            {...register("friendEmail")}
            className="input w-full"
            placeholder="Friend's Email"
          />
          <p className="text-red-600 text-xs">
            {errors.friendEmail?.message}
          </p>
        </div>

        {/* Message (STATIC TEXT) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            Message:
          </label>
          <p className="requestformanchor">
            Hi! Support an NGO that's doing good work in the
            areas of heritage awareness, archiving and
            conservation - Khaki Heritage Foundation. They
            need financial help for their initiatives, and I
            thought you may like to contribute to them. Do
            visit their web page for more information:{" "}
            <a href="/foundation">
              https://khakitours.com/foundation/
            </a>{" "}
            Cheers!
          </p>
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
            className={`px-10 py-2 rounded-full font-semibold transition 
              ${
                isValid
                  ? "bg-[#e4572e] text-white hover:bg-[#cc4c27] cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestFriendForm;
