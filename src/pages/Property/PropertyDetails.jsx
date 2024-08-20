import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../shared/Loader";
import { BiBath, BiBed } from "react-icons/bi";
import { PiGarage } from "react-icons/pi";
import Contact from "../Contact";

export default function PropertyDetails() {
  const { id } = useParams();
  const token = "37|lbtwQrjuiwgOGHPsCQ0l9mGVe6gfIomYmjPjr1iN";
  const [propertyDetails, setPropertyDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const fetchPropertyDetails = async () => {
    setLoader(true);
    const url = `https://publicapi.myatrealty.com/api/v1/property-details/${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setPropertyDetails(response?.data?.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, []);
  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20 flex flex-col gap-8">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black text-center">
        Property Details
      </h1>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 md:gap-8">
          <img src="" className="h-[300px] w-full" alt="" />
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1">
              <BiBed className="text-xl text-primary" /> {propertyDetails?.attributes?.bedrooms}
            </p>
            <p className="flex items-center gap-1">
              <BiBath className="text-xl text-primary" /> {propertyDetails?.attributes?.bathrooms}
            </p>
            <p className="flex items-center gap-1">
              <PiGarage className="text-xl text-primary" /> {propertyDetails?.attributes?.garages}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <p> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-black font-semibold">Ensuites:</span> {propertyDetails?.attributes?.ensuites}</p>
            <p> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-black font-semibold">Carports:</span> {propertyDetails?.attributes?.carports}</p>
            <p>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-black font-semibold">Floor Area:</span> {propertyDetails?.attributes?.floorAreaMeters}{" "}
              {propertyDetails?.attributes?.floorAreaUnit}
            </p>
            <p>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-black font-semibold">Land Area:</span> {propertyDetails?.attributes?.landArea}{" "}
              {propertyDetails?.attributes?.landAreaUnit}
            </p>
          </div>
          <Contact/>
        </div>
      )}
    </section>
  );
}
