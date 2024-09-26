import React from "react";
import sydney from "../../assets/sydney.jpg";
import { Link } from "react-router-dom";

export default function TopAgencey() {
  return (
    <section className="md:flex md:items-center md:gap-8 lg:gap-16 lg:h-[60vh] bg-gray-200 overflow-hidden">
      <img src={sydney} alt="" className="hidden md:block md:w-1/2" />
      <div className="md:w-1/2 flex flex-col items-center md:items-start gap-5 py-10 md:py-0">
        <h1 className="text-xl md:text-3xl font-semibold text-center md:text-left">
          Top Real Estate Agency in Sydney
        </h1>
        <p className="text-gray-500 text-center md:text-left">
          With over $2 Billion in sales, Our agency is the industry’s top luxury
          producer with over 27 years of experience in marketing Australia’s
          most prestigious waterfront properties.
        </p>
        <p className="text-gray-500 text-center md:text-left">
          Due to our unparalleled results, expertise and dedication, we rank
          amongst the Top 6 agencies in Sydney and Australia.
        </p>
        <Link
          to="/contact"
          className="px-8 py-2 bg-black md:hover:translate-x-5 text-white font-semibold rounded w-fit duration-300 ease-linear"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
