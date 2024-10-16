import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import Loader from "../../shared/Loader";

export default function Property() {
  const [loader, setLoader] = useState(false);
  const [type, setType] = useState("buy");
  const [properties, setProperties] = useState([]);
  const url = `${
    import.meta.env.VITE_API_ROOT_URL
  }/public/property/filter?type=${type}`;

  useEffect(() => {
    setLoader(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.data);
        setLoader(false);
      });
  }, [type]);
  return (
    <section className="py-10 md:py-20 bg-[#F7F7F7]">
      <div className="mx-5 md:container md:mx-auto ">
        <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black text-center">
          Discover the latest properties available today
        </h1>

        <div className="flex gap-8 items-center justify-center mt-10 md:mt-20">
          <button
            className={`${
              type === "buy" &&
              "text-primary font-semibold border-b-2 border-primary duration-300 ease-linear"
            } md:text-xl`}
            onClick={() => setType("buy")}
          >
            Buy
          </button>
          <button
            className={`${
              type === "rent" &&
              "text-primary font-semibold border-b-2 border-primary duration-300 ease-linear"
            } md:text-xl`}
            onClick={() => setType("rent")}
          >
            Rent
          </button>
          {/* <button
            className={`${
              type === "sale" &&
              "text-primary font-semibold border-b-2 border-primary duration-300 ease-linear"
            } md:text-xl`}
            onClick={() => setType("sale")}
          >
            Sold
          </button> */}
        </div>

        {loader ? (
          <Loader />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5 mt-10 md:mt-20">
            {properties?.slice(0, 4)?.map((p, i) => (
              <PropertyCard p={p} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-5 md:mt-10">
          <Link
            to={`/properties/${type}`}
            className="px-4 py-2 bg-primary text-white shadow rounded border border-primary hover:bg-transparent hover:text-primary duration-300 ease-linear"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
