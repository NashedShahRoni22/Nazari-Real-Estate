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
      <div className="flex flex-col gap-6 md:gap-12">
        <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
          About One Agency
        </h1>
        <p>
          At One Agency, we believe that buying, selling, or renting a property
          should be a seamless and stress-free experience. With deep expertise
          in the Australian property market, we offer tailored solutions that
          meet the diverse needs of homeowners, investors, and tenants. Whether
          you're looking to sell your home for top value, find the perfect
          rental, or secure a long-term investment, our dedicated team of agents
          works with transparency, integrity, and a client-first approach.
        </p>
        <p>
          Our comprehensive services cover every aspect of property management,
          from personalized consultations to market analysis and efficient
          transaction handling. With years of experience and an unwavering
          commitment to excellence, we strive to build lasting relationships
          with our clients by consistently delivering results. At One Agency, we
          don’t just help you find a property; we help you find a place to call
          home.
        </p>

        <div className="flex gap-5">
          <button
            onClick={handleCallClick}
            className="flex items-center gap-2.5 py-2 px-4 bg-primary text-white justify-center shadow rounded"
          >
            <BiPhone className="text-xl" />
            Call Now
          </button>
          <button
            onClick={handleEmailClick}
            className="flex items-center gap-2.5 py-2 px-4 bg-primary text-white justify-center shadow rounded"
          >
            <MdEmail className="text-xl" />
            Email Me
          </button>
        </div>
      </div>
      <Contact />
    </section>
  );
}
