import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import { BiBath, BiBed } from "react-icons/bi";
import { PiGarage } from "react-icons/pi";
import { MdArrowOutward } from "react-icons/md";



export default function PropertyList() {
  const url = `${import.meta.env.VITE_API_ROOT_URL}/properties`;
  const [properties, setProperties] = useState([]);
  console.log(properties);
  

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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Property List</h2>
        <Link to={`/admin/add_property`} className="px-4 py-2 bg-primary text-white shadow rounded">
          Add Property
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5 mt-10 md:mt-20">
        {
          properties?.map( p =>   <div className="group bg-white flex flex-col shadow hover:shadow-lg hover:shadow-primary hover:-translate-y-5 duration-300 ease-linear">
            <div className="relative">
              <img
                //   src={images?.medium}
                src={p?.property_images[1].name}
                alt="property_image"
                className="w-1/2 md:min-w-full h-[200px]"
              />
              {/* <div className="absolute top-0 left-0 h-full w-full bg-black/80 flex items-center justify-center">
                <p className="text-white">No Image Available </p>
              </div> */}
            </div>
            {/* property details here  */}
      
            <div className="p-4 flex flex-col gap-2.5 justify-between">
              <h5 className="md:text-xl font-semibold">{p?.location}</h5>
              <h5 className="md:text-lg font-semibold text-primary">
                {p?.price}
              </h5>
      
              <div className="flex items-center justify-between my-5 flex-wrap">
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
                to={`/property_details/${p?.id}`}
                className="px-4 py-2 border border-primary w-fit flex items-center gap-2 hover:bg-primary hover:text-white duration-300 ease-linear group"
              >
                <span>Update</span>
                <MdArrowOutward className="text-xl group-hover:rotate-45 duration-300 ease-linear" />
              </Link>
            </div>
          </div>)
        }
      </div>
    </div>
  );
}
