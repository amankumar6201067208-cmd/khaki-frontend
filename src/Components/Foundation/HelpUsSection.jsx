import { useState } from "react";
import Modal from "../Modal";
import { helpUsData } from "../../Data/FoundationData/FoundationContent";
import ProvideExpertiseForm from "./ProvideExpertiseForm";
import RequestFriendForm from "./RequestFriendForm";
import DonationForm from "./DonationForm";
import VolunteerForm from "./VolunteerForm";

const HelpUsSection = () => {
  const { title, items } = helpUsData;
  const [openExpertise, setOpenExpertise] = useState(false);
  const [openDonation, setOpenDonation] = useState(false);
  const [openRequestFriend, setOpenRequestFriend] = useState(false);
  const [openVolunteer, setOpenVolunteer] = useState(false);

  return (
    <>
      <section className="bg-[#7E9777] py-24 md:pt-30 pt-14">
        <div className="max-w-285 mx-auto md:px-6 px-3">
          {/* Title */}
          <h2 className="text-[32px] font-bold md:mb-16 mb-8 text-center md:text-start">{title}</h2>

          {/* Items */}
          <div className="space-y-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                {/* Icon */}
                <div className="shrink-0">
                  <div className="flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.heading}
                      className="w-32 h-32"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col text-center md:text-start">
                  <h3 className="text-[28px] font-bold mb-4">{item.heading}</h3>
                  <p className="text-[16px] font-normal max-w-2xl">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 md:ml-auto">
                  {item.actions.map((action, idx) => {
                    // OPEN MODAL ONLY FOR PROVIDE EXPERTISE
                    if (item.heading === "Provide Expertise") {
                      return (
                        <button
                          key={idx}
                          onClick={() => setOpenExpertise(true)}
                          className="inline-flex items-center justify-between gap-4 border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition min-w-45 cursor-pointer"
                        >
                          {action.label}
                          <span>→</span>
                        </button>
                      );
                    }

                    if (
                      item.heading === "Raise Funds" &&
                      action.label === "Donate"
                    ) {
                      return (
                        <button
                          key={idx}
                          onClick={() => setOpenDonation(true)}
                          className="inline-flex items-center justify-between gap-4 border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition min-w-45 cursor-pointer"
                        >
                          {action.label} <span>→</span>
                        </button>
                      );
                    }

                    if (
                      item.heading === "Raise Funds" &&
                      action.label === "Request a friend"
                    ) {
                      return (
                        <button
                          key={idx}
                          onClick={() => setOpenRequestFriend(true)}
                          className="inline-flex items-center justify-between gap-4 border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition min-w-45 cursor-pointer"
                        >
                          {action.label} <span>→</span>
                        </button>
                      );
                    }

                    if (item.heading === "Volunteer") {
                      return (
                        <button
                          key={idx}
                          onClick={() => setOpenVolunteer(true)}
                          className="inline-flex items-center justify-between gap-4 border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition min-w-45 cursor-pointer"
                        >
                          {action.label} <span>→</span>
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVIDE EXPERTISE MODAL */}
      <Modal isOpen={openExpertise} onClose={() => setOpenExpertise(false)}>
        <ProvideExpertiseForm />
      </Modal>
      <Modal isOpen={openDonation} onClose={() => setOpenDonation(false)}>
        <DonationForm />
      </Modal>
      <Modal
        isOpen={openRequestFriend}
        onClose={() => setOpenRequestFriend(false)}
      >
        <RequestFriendForm />
      </Modal>
      <Modal isOpen={openVolunteer} onClose={() => setOpenVolunteer(false)}>
        <VolunteerForm />
      </Modal>
    </>
  );
};

export default HelpUsSection;
