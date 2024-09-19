import { Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { BiBath, BiBed } from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";
import { PiGarage } from "react-icons/pi";
import axios from "axios";
import Loader from "../../shared/Loader";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import PropertyCard from "./PropertyCard";

export default function PropertySearch() {
  const [advance, setAdvance] = useState(false);
  const [loader, setLoader] = useState(false);
  const [propertyStatus, setPropertyStatus] = useState("Active");
  // manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [metaData, setMetaData] = useState({});
  const [number, setNumber] = useState("");
  const [size, setSize] = useState("");
  // manage data
  const [propertiesData, setPropertiesData] = useState([]);
  // Access the environment variables
  const apiRoot = import.meta.env.VITE_API_ROOT;
  const token = import.meta.env.VITE_APP_TOKEN;

  const fetchProperties = async (page) => {
    setLoader(true);
    const url = `${apiRoot}/listings?page[number]=1&page[size]=50&include=property`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
      });
      setPropertiesData(response?.data?.data);
      setMetaData(response?.data?.meta?.page);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= metaData?.lastPage) {
      setCurrentPage(page);
    }
  };

  // Filter properties based on the selected status
  const filteredProperties = propertiesData.filter((p) =>
    propertyStatus ? p?.attributes?.status === propertyStatus : true
  );

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black text-center">
        Search the latest properties available today
      </h1>
      {/* search management jsx  */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-5 md:mt-10">
        <Input label="Enter Keyword" />
        <Select label="Status" onChange={value => setPropertyStatus(value)}>
          <Option value="">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Sold">Sold</Option>
          <Option value="Withdrawn">Withdrawn</Option>
          <Option value="Draft">Draft</Option>
          <Option value="Leased">Leased</Option>
        </Select>
        <button
          onClick={() => setAdvance(!advance)}
          className="px-4 py-2 bg-primary text-white font-semibold rounded shadow flex items-center gap-2"
        >
          <GiSettingsKnobs />
          Advance
        </button>
        <button className="px-4 py-2 bg-primary text-white font-semibold rounded shadow">
          Search
        </button>
      </div>
      {advance && (
        <div className="mt-2.5 md:mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          <Select label="Bedroom">
            <Option>1</Option>
            <Option>2</Option>
            <Option>3</Option>
            <Option>4</Option>
            <Option>5</Option>
          </Select>

          <Select label="Bathroom">
            <Option>1</Option>
            <Option>2</Option>
            <Option>3</Option>
            <Option>4</Option>
            <Option>5</Option>
          </Select>
          <Select label="Garrage">
            <Option>1</Option>
            <Option>2</Option>
            <Option>3</Option>
            <Option>4</Option>
            <Option>5</Option>
          </Select>
        </div>
      )}

      {/* <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <h1 className="mt-5 md:mt-10 text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
            {propertyStatus} Properties: 
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5 mt-5 md:mt-10">
            {filteredProperties.map((p, i) => (
              <PropertyCard key={i} p={p} />
            ))}
          </div>
          <h1 className="mt-5 md:mt-10 text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
            Sold Property
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5 mt-5 md:mt-10">
            {propertiesData
              ?.filter((p) => p?.attributes?.status === "Sold")
              .map((p, i) => (
                <PropertyCard key={i} p={p} />
              ))}
          </div>
        </div>
      )}
      </> */}
    </section>
  );
}
