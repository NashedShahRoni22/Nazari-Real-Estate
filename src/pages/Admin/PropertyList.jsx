import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Option, Select } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import { BiBath, BiBed } from "react-icons/bi";
import { PiGarage } from "react-icons/pi";
import { MdArrowOutward } from "react-icons/md";

export default function PropertyList() {
  const url = `${import.meta.env.VITE_API_ROOT_URL}/properties`;
  const [properties, setProperties] = useState([]);
  const [type, setType] = useState("buy");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const oaAccessToken = localStorage.getItem("oaAccessToken"); // Retrieve the access token

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${oaAccessToken}`, // Include the access token in the headers
          },
        });

        const data = await response.json();
        if (data.success) {
          setProperties(data.data); // Assuming the properties are in data.data
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching properties.");
      } finally {
        setLoader(false);
      }
    };

    fetchProperties();
  }, []);

  if (loader) {
    return <Loader />; // Optional loading indicator
  }
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
        <h2 className="text-xl font-semibold">
          Property List of <span className="capitalize">{type}</span>{" "}
        </h2>
        <div className="grid grid-cols-2 gap-2.5 items-center">
          <Select
            onChange={(value) => setType(value)}
            variant="standard"
            name="type"
            label="Select Type"
          >
            <Option value="buy">Buy</Option>
            <Option value="rent">Rent</Option>
          </Select>
          <Link
            to={`/admin/add_property`}
            className="px-4 py-2 bg-primary text-white shadow rounded text-center"
          >
            Add Property
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5 mt-10 md:mt-20">
        {properties
          ?.filter((p) => p?.type === type)
          .map((p, index) => (
            <div
              jey={index}
              className="group bg-white flex flex-col shadow hover:shadow-lg hover:shadow-primary hover:-translate-y-5 duration-300 ease-linear"
            >
              <div className="relative">
                <img
                  src={p?.property_images[0]?.name}
                  alt="property_image"
                  className="w-full h-[250px]"
                />
              </div>
              {/* property details here  */}

              <div className="p-4 flex flex-col">
                <div className="flex justify-between items-center">
                  <h5 className="md:text-xl font-semibold">{p?.location}</h5>
                  {p?.status === "active" ? (
                    <p className="px-2 py-1 bg-blue-500 shadow rounded text-white">Active</p>
                  ) : (
                    <p className="px-2 py-1 bg-red-500 shadow rounded text-white">Inactive</p>
                  )}
                </div>
                <h5 className="md:text-lg font-semibold text-primary">
                  {p?.price}
                </h5>

                <div className="flex items-center justify-between my-2.5 flex-wrap">
                  <p className="flex items-center gap-1">
                    <BiBed /> {p?.bedrooms}
                  </p>
                  <p className="flex items-center gap-1">
                    <BiBath /> {p?.bathrooms}
                  </p>
                  <p className="flex items-center gap-1">
                    <PiGarage /> {p?.parking}
                  </p>
                </div>

                <Link
                  to={`/admin/update_property/${p?.id}`}
                  className="px-4 py-2 border border-primary w-fit flex items-center gap-2 hover:bg-primary hover:text-white duration-300 ease-linear group"
                >
                  <span>Update</span>
                  <MdArrowOutward className="text-xl group-hover:rotate-45 duration-300 ease-linear" />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
