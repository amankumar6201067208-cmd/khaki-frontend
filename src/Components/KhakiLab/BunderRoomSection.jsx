import { bunderRoomData } from "../../Data/KhakiLabData/KhakiLabContent";
import BunderRoomCarousel from "./BunderRoomCarousel";
import { useState } from "react";
import BunderRoomModel from "./BunderRoomModel";
import BunderRoomBookingForm from "./BunderRoomBookingForm";

const BunderRoomSection = () => {
  const {
    title,
    description,
    details,
    bookingTable,
    notes,
    buttonText,
    contactEmail,
    images,
  } = bunderRoomData;
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <section className="bg-[url('/src/assets/Background/snow2.png')] py-24">
        <div className="max-w-285 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-[28px] font-bold text-[#e4572e] mb-6">
              {title}
            </h2>

            {description.map((text, i) => (
              <p key={i} className="mb-4 text-[16px] leading-relaxed">
                {text}
              </p>
            ))}

            <ul className="list-disc pl-6 mb-8">
              {details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <h3 className="text-[20px] font-bold mb-4">Booking Cost</h3>

            {/* TABLE */}
            <div className="overflow-x-auto mb-6">
              <table className="border border-black text-sm w-full">
                <thead>
                  <tr>
                    <th className="border p-2">Slot</th>
                    {bookingTable.headers.slice(1).map((h, i) => (
                      <th key={i} className="border p-2">
                        {h}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold">Timing</td>
                    {bookingTable.timings.map((t, i) => (
                      <td key={i} className="border p-2 font-semibold">
                        {t}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingTable.rows.map((row, i) => (
                    <tr key={i}>
                      <td className="border p-2 font-semibold">{row.label}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="border p-2">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mb-6">
              {notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>

            <button
              onClick={() => setOpenPopup(true)}
              className="inline-flex items-center gap-2 bg-[#e4572e] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#cc4c27] transition cursor-pointer"
            >
              {buttonText} →
            </button>

            <p className="mt-4 text-sm">
              If you want to book for more than one day or have any other
              queries write to us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-[#e4572e] underline"
              >
                {contactEmail}
              </a>
            </p>
          </div>

          {/* RIGHT IMAGE CAROUSEL */}
          <BunderRoomCarousel images={images} />
        </div>
      </section>

      <BunderRoomModel isOpen={openPopup} onClose={() => setOpenPopup(false)} >
        <div className="p-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            Bunder Room Booking Form
          </h2>

          {/* ACTUAL FORM */}
          <BunderRoomBookingForm />
        </div>
      </BunderRoomModel>
    </>
  );
};

export default BunderRoomSection;
