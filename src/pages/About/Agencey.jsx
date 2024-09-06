import React from "react";
import nazari from "../../assets/nazari.jpg";
import { BiPhone } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import Contact from "../Contact";
export default function Agencey() {
  const handleCallClick = () => {
    window.location.href = "tel:+0422415837"; // Replace with the desired phone number
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:tameem@atrealty.com.au"; // Replace with the desired email address
  };

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        About Nazari Property Group
      </h1>
      <div className="mt-5 md:mt-10 grid md:grid-cols-2 gap-5 md:gap-16">
        <div className="flex flex-col items-start gap-2.5">
          <img src={nazari} alt="" />
        </div>
        <div className="flex flex-col gap-2.5 md:gap-5">
          <h5 className="font-semibold text-xl md:text-3xl text-primary">
            Tameem Nazari
          </h5>
          <p>
            Having been raised and went to school in the local area and run
            several successful family businesses for over 20 years. Tameem has a
            firm knowledge of the history of the local area and the people.
            Committed to providing standout service to the local community.
            Tameem is a genuine sales agent who always has his clients’ best
            interests at heart.
          </p>
          <p>
            Tameem is an experienced, knowledgeable and personable professional
            who is committed to achieving outcomes well beyond expectations. His
            desire to achieve outstanding results for his clients means that he
            can be relied upon to create strategic marketing campaigns and
            negotiate with a determination to achieve the best possible outcome.
          </p>
          <p>
            Warm and friendly, Tameem makes you feel right at home which is
            exactly what you want when selling or buying your next property. A
            highly respected sales consultant, Tameem has a major focus on
            service and honesty matched with enthusiasm and extensive knowledge
            of the marketplace. Having lived locally within the Macarthur and
            Camden area, Tameem has a special appreciation for the area which he
            calls home and proudly serves.
          </p>

          <div className="flex gap-5">
            <button
              onClick={handleCallClick}
              className="flex items-center gap-2.5 py-2 px-4 w-full bg-primary text-white justify-center shadow rounded"
            >
              <BiPhone className="text-xl" />
              Call Now
            </button>
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-2.5 py-2 px-4 w-full bg-primary text-white justify-center shadow rounded"
            >
              <MdEmail className="text-xl" />
              Email Me
            </button>
          </div>
        </div>
      </div>
      <Contact />
    </section>
  );
}
