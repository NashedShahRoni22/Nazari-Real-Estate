import React from "react";
import { BiBath, BiBed } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { PiGarage } from "react-icons/pi";
import { RiPriceTag3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function PropertyCard({ p }) {
  return (
    <div className="group bg-white flex flex-col shadow hover:shadow-lg hover:shadow-primary">
      <div className="relative overflow-hidden">
        <img
          src={p.property_images[0]?.name}
          alt="property_image"
          className="w-full h-[250px] hover:scale-105 duration-300 ease-linear"
        />
      </div>
      {/* property details here  */}
      <div className="p-4 flex flex-col gap-5 justify-between">
        <div className="flex flex-col gap-2.5">
          <h5 className="text-xl md:text-2xl font-semibold text-primary">{p?.title}</h5>
          <h5 className="font-semibold flex gap-1 items-center"> <IoLocationSharp className="text-primary text-xl" /> {p?.location}</h5>
          <h5 className="flex gap-1 items-center"> <RiPriceTag3Fill className="text-primary text-xl" /> {p?.price}</h5>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <p className="flex items-center gap-1">
            <BiBed className="text-xl" /> {p?.bedrooms}
          </p>
          <p className="flex items-center gap-1">
            <BiBath className="text-xl" /> {p?.bathrooms}
          </p>
          <p className="flex items-center gap-1">
            <PiGarage className="text-xl" /> {p?.parking}
          </p>
        </div>

        <div>
          <Link
            to={`/property-details/${p?.id}`}
            className="px-4 py-2 border border-primary w-fit flex items-center gap-2 hover:bg-primary hover:text-white duration-300 ease-linear group"
          >
            <span>Check It Out</span>
            <MdArrowOutward className="text-xl group-hover:rotate-45 duration-300 ease-linear" />
          </Link>
        </div>
      </div>
    </div>
  );
}
