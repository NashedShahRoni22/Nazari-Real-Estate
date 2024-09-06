import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../shared/Loader";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import {
  BiBath,
  BiBed,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import { PiGarage } from "react-icons/pi";
import Contact from "../Contact";
import ReactPlayer from "react-player";

export default function propertyDetails() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [showImgNum, setShowImgNum] = useState(0);
  const handleNextImage = () => {
    setShowImgNum((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setShowImgNum((prev) => (prev - 1 + images.length) % images.length);
  };
  // Access the environment variables
  const apiRoot = import.meta.env.VITE_API_ROOT;
  const token = import.meta.env.VITE_APP_TOKEN;
  const [propertyDetails, setPropertyDetails] = useState({});
  const [images, setImages] = useState([]);
  const [property, setProperty] = useState({});
  const [listing, setListing] = useState({});
  const [floorPlans, setFloorPlans] = useState([]);
  const [advertisement, setAdvertisement] = useState({});
  const [agent, setAgent] = useState({});
  const [inspections, setInspections] = useState({});

  const fetchPropertyDetails = async () => {
    setLoader(true);
    const url = `${apiRoot}/property-details/${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setPropertyDetails(response?.data?.data?.attributes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchImages = async () => {
    const url = `${apiRoot}/listings/${id}/images`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setImages(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProperty = async () => {
    const url = `${apiRoot}/listings/${id}/property`;

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
    const url = `${apiRoot}/listings/${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setListing(response?.data?.data?.attributes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFloorPlans = async () => {
    const url = `${apiRoot}/listings/${id}/floorplans`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setFloorPlans(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAdvertisement = async () => {
    const url = `${apiRoot}/listings/${id}/advertisements`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setAdvertisement(response?.data?.data[0]?.attributes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAgents = async () => {
    const url = `${apiRoot}/listings/${id}/agents`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setAgent(response?.data?.data[0]?.attributes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchInspections = async () => {
    const url = `${apiRoot}/listings/${id}/inspections`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setInspections(response?.data?.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchPropertyDetails();
    fetchProperty();
    fetchListing();
    fetchFloorPlans();
    fetchAdvertisement();
    fetchAgents();
    fetchInspections();
  }, []);

  return (
    <section className="mx-5 md:container md:mx-auto py-10">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Property Details
      </h1>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-8 md:gap-16 mt-5 md:mt-10">
          {/* images rendered here  */}
          <div>
            {images?.length > 0 ? (
              <div className="flex justify-center min-h-[50vh] relative">
                <img
                  src={images[showImgNum]?.meta?.thumbnails?.large}
                  className="max-h-[50vh] rounded shadow border"
                  alt=""
                />
                {/* Chevron Buttons */}
                <div className="absolute bottom-5 right-5 flex gap-2.5">
                  <button
                    onClick={handlePrevImage}
                    className="bg-blue-600 text-white shadow-xl rounded-full"
                  >
                    <BiChevronLeft className="text-3xl md:text-5xl" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-blue-600 text-white shadow-xl rounded-full"
                  >
                    <BiChevronRight className="text-3xl md:text-5xl" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/80 min-w-full min-h-[50vh] flex justify-center items-center">
                <p className="text-white">No Image Available</p>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-8 md:flex-row md:gap-16 items-start">
            {/* property details here  */}
            <div className="flex flex-col gap-5 md:gap-10 md:w-4/6">
              <h5 className="text-2xl md:text-4xl font-semibold">
                {property?.fullAddress}
              </h5>
              <h5 className="text-xl md:text-2xl font-semibold text-primary">
                {listing?.displayPrice}
              </h5>
              <div className="flex justify-between">
                <h5 className="px-2 py-1 bg-primary w-fit rounded text-white">
                  Type: {listing?.type}
                </h5>
                <h5 className="px-2 py-1 border border-primary w-fit rounded">
                  Status: {listing?.status}
                </h5>
              </div>

              <div className="flex flex-wrap justify-between">
                <p className="flex items-center gap-5 text-2xl p-4 shadow rounded">
                  <BiBed className="text-2xl" /> {propertyDetails?.bedrooms}
                </p>
                <p className="flex items-center gap-5 text-2xl p-4 shadow rounded">
                  <BiBath className="text-2xl" /> {propertyDetails?.bathrooms}
                </p>
                <p className="flex items-center gap-5 text-2xl p-4 shadow rounded">
                  <PiGarage className="text-2xl" /> {propertyDetails?.garages}
                </p>
                <p className="flex items-center gap-5 text-2xl p-4 shadow rounded">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kzzqzgKaARKFhJputoMZngxcvMGXP312sA&s"
                    alt=""
                    className="h-[20px]"
                    loading="lazy"
                  />
                  {propertyDetails?.ensuites}
                </p>
                <p className="flex items-center gap-5 text-2xl p-4 shadow rounded">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/64/64650.png"
                    alt=""
                    className="h-[20px]"
                  />
                  {propertyDetails?.carports}
                </p>
              </div>

              <div>
                <h5 className="text-xl text-primary font-semibold">
                  {advertisement?.headline}
                </h5>
                <p className="my-5">{advertisement?.description}</p>
                {advertisement?.videoLink !== "" && (
                  <div>
                    <ReactPlayer url={advertisement?.videoLink} />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2.5">
                <h5 className="text-xl text-primary font-semibold">
                  Property Details
                </h5>
                <p className="text-xl">
                  <span className="font-semibold">Type:</span> {property?.type}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Floor Area:</span>{" "}
                  {propertyDetails?.floorAreaMeters}{" "}
                  {propertyDetails?.floorAreaUnit}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Land Area:</span>{" "}
                  {propertyDetails?.landArea} {propertyDetails?.landAreaUnit}
                </p>
              </div>

              <div>
                <h5 className="text-xl text-primary font-semibold">Address:</h5>
                <div className="grid md:grid-cols-2 gap-2.5 mt-2.5">
                  <p className="text-xl">
                    <span className="font-semibold">City:</span>{" "}
                    {property?.city}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">State:</span>{" "}
                    {property?.state}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Street Name:</span>{" "}
                    {property?.streetName}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Street Number:</span>{" "}
                    {property?.streetNumber}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Suburb:</span>{" "}
                    {property?.suburb}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Country:</span>{" "}
                    {property?.country}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Country Code:</span>{" "}
                    {property?.countryCode}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Post Code:</span>{" "}
                    {property?.postcode}
                  </p>
                </div>
              </div>

              {floorPlans?.length > 0 && (
                <div>
                  <h5 className="text-xl text-primary font-semibold">
                    Floor Plans:
                  </h5>
                  <div className="flex flex-wrap gap-2.5 mt-2.5">
                    {floorPlans?.map((fp, i) => (
                      <img key={i} src={fp?.meta?.thumbnails?.large} alt="" />
                    ))}
                  </div>
                </div>
              )}
              {inspections?.length > 0 && (
                <div>
                  <h5 className="text-xl text-primary font-semibold">
                    Inspection:
                  </h5>
                  <div className="mt-2.5">
                    <table className="min-w-full">
                      <thead className="px-4 py-2 bg-primary text-white border border-primary">
                        <th className="px-2 py-1">Date</th>
                        <th className="px-2 py-1 border-l border-white">
                          Start Time
                        </th>
                        <th className="px-2 py-1 border-l border-white">
                          End Time
                        </th>
                        <th className="px-2 py-1 border-l border-white">
                          Visit Type
                        </th>
                      </thead>
                      <tbody>
                        {inspections?.map((ins, i) => (
                          <tr
                            key={i}
                            className="px-4 py-2 border border-primary"
                          >
                            <td className="text-center px-2 py-1">
                              {ins?.attributes?.date}
                            </td>
                            <td className="text-center px-2 py-1 border-l border-primary">
                              {ins?.attributes?.startTime}
                            </td>
                            <td className="text-center px-2 py-1 border-l border-primary">
                              {ins?.attributes?.endTime}
                            </td>
                            <td className="text-center px-2 py-1 border-l border-primary uppercase">
                              {ins?.attributes?.type}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* agent details here  */}
            <div className="w-full md:w-2/6 p-4 shadow rounded">
              <div className="flex justify-center">
                <img
                  src={agent?.image}
                  className="h-[150px] w-[150px]"
                  alt={`${agent?.firstName} ${agent?.lastName}`}
                />
              </div>
              <p className="text-2xl md:text-3xl font-semibold my-2.5 text-center">
                {agent?.firstName} {agent?.lastName}
              </p>
              <p className="text-xl md:text-2xl font-semibold text-primary text-center">
                Property Expert
              </p>

              {/* Social Media Links */}
              <div className="flex justify-between mt-5">
                {agent?.facebookUrl && (
                  <a
                    href={agent.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-blue-600" size={36} />
                  </a>
                )}
                {agent?.instagramUrl && (
                  <a
                    href={agent.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-orange-400" size={36} />
                  </a>
                )}
                {agent?.linkedinUrl && (
                  <a
                    href={agent.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-blue-800" size={36} />
                  </a>
                )}
                {agent?.twitterUrl && (
                  <a
                    href={agent.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="text-blue-400" size={36} />
                  </a>
                )}
                {agent?.youtubeUrl && (
                  <a
                    href={agent.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="text-red-600" size={36} />
                  </a>
                )}
              </div>

              {/* Contact Links */}
              <div className="flex flex-col gap-4 mt-5">
                {agent?.email && (
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex justify-center gap-2 items-center py-2 bg-black shadow-xl shadow-primary md:hover:scale-105 text-white font-semibold rounded w-full duration-300 ease-linear"
                  >
                    <MdEmail size={24} />
                    <span>Email Now</span>
                  </a>
                )}
                {agent?.mobile && (
                  <a
                    href={`tel:${agent.mobile}`}
                    className="flex justify-center gap-2 items-center py-2 bg-black shadow-xl shadow-primary md:hover:scale-105 text-white font-semibold rounded w-full duration-300 ease-linear"
                  >
                    <MdPhone size={24} />
                    <span>Call Now</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Contact />
    </section>
  );
}
