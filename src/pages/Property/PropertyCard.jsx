import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiBath, BiBed } from "react-icons/bi";
import { MdArrowOutward } from "react-icons/md";
import { PiGarage } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function PropertyCard({ p }) {
  const [propertiesDetails, setPropertiesDetails] = useState({});
  const [images, setImages] = useState([]);
  const [property, setProperty] = useState({});
  const [listing, setListing] = useState({});

  // Access the environment variables
  const apiRoot = import.meta.env.VITE_API_ROOT;
  const token = import.meta.env.VITE_APP_TOKEN;

  const fetchPropertyDetails = async () => {
    // setLoader(true);
    const url = `${apiRoot}/property-details/${p?.id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setPropertiesDetails(response?.data?.data?.attributes);
      //   setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setLoader(false);
    }
  };

  const fetchImages = async () => {
    // setLoader(true);
    const url = `${apiRoot}/listings/${p?.id}/images`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      //   if (response?.data?.data?.length > 0) {
      // }
      setImages(response?.data?.data);
      //   setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setLoader(false);
    }
  };

  const fetchProperty = async () => {
    const url = `${apiRoot}/listings/${p?.id}/property`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setProperty(response?.data?.data?.attributes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchListing = async () => {
    const url = `${apiRoot}/listings/${p?.id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setListing(response?.data?.data?.attributes);
      // setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
    fetchProperty();
    fetchListing();
  }, []);

  return (
    <div className="group bg-white flex flex-col shadow hover:shadow-lg hover:shadow-primary hover:-translate-y-5 duration-300 ease-linear">
      <div className="relative">
        <img
          //   src={images?.medium}
          src="https://sydneywpresidence.b-cdn.net/wp-content/uploads/2014/05/book-525x328.jpg"
          alt="property_image"
          className="w-1/2 md:w-full h-[200px]"
        />
        {/* <div className="absolute top-0 left-0 h-full w-full bg-black/80 flex items-center justify-center">
          <p className="text-white">No Image Available </p>
        </div> */}
      </div>
      {/* property details here  */}

      <div className="p-4 flex flex-col gap-2.5 justify-between">
        <h5 className="md:text-xl font-semibold">{property?.fullAddress}</h5>
        <h5 className="md:text-lg font-semibold text-primary">
          {listing?.displayPrice}
        </h5>
        <div className="flex justify-between">
          {/* <h5 className="px-2 py-1 bg-primary w-fit rounded text-white">
            Type: {p?.attributes?.type}
          </h5> */}
          <h5
            className={`px-2 py-1 border border-primary w-fit rounded ${
              p?.attributes?.status === "Sold" &&
              "border-red-500 bg-red-500 text-white"
            }`}
          >
            Status: {p?.attributes?.status}
          </h5>
        </div>

        <div className="flex items-center justify-between my-5 flex-wrap">
          <p className="flex items-center gap-1">
            <BiBed /> {propertiesDetails?.bedrooms}
          </p>
          <p className="flex items-center gap-1">
            <BiBath /> {propertiesDetails?.bathrooms}
          </p>
          <p className="flex items-center gap-1">
            <PiGarage /> {propertiesDetails?.garages}
          </p>
          <p className="flex items-center gap-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kzzqzgKaARKFhJputoMZngxcvMGXP312sA&s"
              alt=""
              className="h-[16px]"
              loading="lazy"
            />
            {propertiesDetails?.ensuites}
          </p>
          <p className="flex items-center gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/64/64650.png"
              alt=""
              className="h-[16px]"
            />
            {propertiesDetails?.carports}
          </p>
        </div>

        <Link
          to={`/property_details/${p?.id}`}
          className="px-4 py-2 border border-primary w-fit flex items-center gap-2 hover:bg-primary hover:text-white duration-300 ease-linear group"
        >
          <span>Check It Out</span>
          <MdArrowOutward className="text-xl group-hover:rotate-45 duration-300 ease-linear" />
        </Link>
      </div>
    </div>
  );
}
