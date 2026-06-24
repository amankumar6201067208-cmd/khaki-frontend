import { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import strapi from "../api/strapi";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validation
    // if (!captchaToken) {
    //   alert("Please verify reCAPTCHA");
    //   return;
    // }

    try {
      setLoading(true);
      await strapi.post("/contact-us-enquiries", { data: form });
      navigate("/message-received");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* CONTACT SECTION */}
      <section className="pt-40 pb-20 bg-[url('/src/assets/Background/snow2.png')]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold text-[#DB4D27] mb-6">
              Get in touch with us
            </h2>

            <p className="text-black mb-8">
              If you have a story to share or a question that has not been
              answered on our website, please get in touch with us via contact
              details listed below or fill in the form on the right.
            </p>

            {/* ADDRESS */}
            <div className="flex gap-4 mb-6">
              <span className="text-[#DB4D27] text-xl">
                <i class="fa-solid fa-location-dot"></i>
              </span>
              <p className="text-black">
                310, Hari Chambers, 3rd Floor, 58/64, Shahid Bhagat Singh Rd,
                above Copper Chimney, Fort, Mumbai, Maharashtra 400001.
              </p>
            </div>

            {/* PHONE */}
            <div className="flex gap-4 mb-4">
              <span className="text-[#DB4D27] text-xl">
                <i class="fa-solid fa-phone"></i>
              </span>
              <a
                href="tel:+918828100111"
                className="text-[#DB4D27] font-medium"
              >
                +91-8828100111
              </a>
            </div>

            {/* EMAIL */}
            <div className="flex gap-4">
              <span className="text-[#DB4D27] text-xl">
                <i class="fa-regular fa-envelope"></i>
              </span>
              <a
                href="mailto:hi@khakitours.com"
                className="text-[#DB4D27] font-medium"
              >
                hi@khakitours.com
              </a>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid md:grid-cols-2 gap-8">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                  className="border-bbg-transparent border-b focus:outline-none py-2 border-[#DB4D27] bg-transparent"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="border-bbg-transparent border-b focus:outline-none py-2 border-[#DB4D27] bg-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone"
                  className="border-bbg-transparent border-b focus:outline-none py-2 border-[#DB4D27] bg-transparent"
                />
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="border-bbg-transparent border-b focus:outline-none py-2 border-[#DB4D27] bg-transparent"
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Message"
                rows="4"
                className="w-full border-b focus:outline-none py-2 border-[#DB4D27] bg-transparent"
              />

              {/* reCAPTCHA */}
              {/* <ReCAPTCHA
                sitekey="YOUR_RECAPTCHA_SITE_KEY"
                onChange={(token) => setCaptchaToken(token)}
              /> */}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#DB4D27] text-white px-10 py-3 rounded-full cursor-pointer"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="w-full h-100">
        <iframe
          title="Khaki Tours Map"
          src="https://www.google.com/maps?q=Khaki%20Tours%20Mumbai&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
