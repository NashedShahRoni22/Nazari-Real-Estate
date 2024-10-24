import { Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../shared/Loader";
import { useParams } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { MdAccessTimeFilled } from "react-icons/md";
import { RiCoinFill } from "react-icons/ri";
import { FaCoins } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { CgClose } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";

export default function PropertySearch() {
  const { type } = useParams();
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const rooms = Array.from({ length: 10 }, (_, i) => i + 1);
  const getPrices = (type) => {
    if (type === "rent") {
      return Array.from({ length: 5 }, (_, i) => 500 + i * 500);
    } else {
      // For other types, adjust as needed
      return Array.from({ length: 20 }, (_, i) => (i + 1) * 50000);
    }
  };
  const prices = getPrices(type);
  const lands = Array.from({ length: 40 }, (_, i) => (i + 1) * 50);

  const [propertiesData, setPropertiesData] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parkings, setParkings] = useState("");
  const [landSize, setLandSize] = useState("");
  const [mobility, setMobility] = useState(false);
  const [newest, setNewest] = useState(false);
  const [lowest, setLowest] = useState(false);
  const [highest, setHighest] = useState(false);
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    setSearchText(text);
  };
  const handleReset = (setter) => {
    setter("");
  };

  const url = `${import.meta.env.VITE_API_ROOT_URL}/public/property/filter`;

  const fetchProperties = async () => {
    setLoader(true);
    try {
      const params = {
        type,
        search: searchText,
        propertyType,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        parking: parkings,
        landSize,
        mobility,
        latest: newest,
        lowPrice: lowest,
        highPrice: highest,
      };

      // Filter out empty values
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== false)
      );

      const response = await axios.get(url, { params: filteredParams });
      setPropertiesData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [
    type,
    searchText,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    parkings,
    landSize,
    mobility,
    newest,
    lowest,
    highest,
  ]);

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black text-center">
        The latest properties available today
      </h1>
      {/* <div className="flex items-center mt-5 lg:hidden">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="px-4 py-2 border-2 border-primary rounded-l focus:outline-none w-full"
          placeholder="Enter Address, Region, Suburb or Postcode"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 border-2 border-primary rounded-r flex items-center gap-2 bg-primary text-white"
        >
          <BiSearch />
          Search
        </button>
      </div> */}
      <div className="mt-5">
        {/* filter options */}
        {/* <div className="hidden lg:flex flex-col gap-5 lg:w-1/4 shadow p-4 max-h-fit">
          <p className="font-semibold text-primary">
            Enter Address, Region, Suburb or Postcode
          </p>
          <div className="flex items-center">
            <input
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="px-4 py-2 border-2 border-primary rounded-l focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-4 border-2 border-primary rounded-r flex items-center gap-2 bg-primary text-white h-full"
            >
              <BiSearch className="text-xl" />
            </button>
          </div>
          <p className="font-semibold text-primary">Sort Property</p>
          <button
            onClick={() => {
              setNewest(!newest);
            }}
            className={`px-4 py-2 border-2 border-primary ${
              newest && "bg-primary text-white"
            } shadow rounded flex gap-2 items-center justify-start`}
          >
            <MdAccessTimeFilled /> Newest
          </button>
          <button
            onClick={() => {
              setLowest(!lowest);
              setHighest(false);
            }}
            className={`px-4 py-2 border-2 border-primary ${
              lowest && "bg-primary text-white"
            } shadow rounded flex gap-2 items-center justify-start`}
          >
            <RiCoinFill /> Lowest Price
          </button>
          <button
            onClick={() => {
              setHighest(!highest);
              setLowest(false);
            }}
            className={`px-4 py-2 border-2 border-primary ${
              highest && "bg-primary text-white"
            } shadow rounded flex gap-2 items-center justify-start`}
          >
            <FaCoins /> Highest Price
          </button>
          <p className="font-semibold text-primary">More Refinements</p>
          <Select
            label="Property Type"
            onChange={(value) => setPropertyType(value)}
          >
            <Option value="">Any</Option>
            <Option value="Residential">Residential</Option>
            <Option value="Projects">Projects</Option>
            <Option value="Commercial">Commercial</Option>
            <Option value="Rural">Rural</Option>
            <Option value="Business">Business</Option>
          </Select>

          <Select
            label="Minimum Price"
            onChange={(value) => setMinPrice(value)}
          >
            {prices.map((p, i) => (
              <Option value={p} key={i}>
                ${p}
              </Option>
            ))}
          </Select>

          <Select
            label="Maximum Price"
            onChange={(value) => setMaxPrice(value)}
          >
            {prices.map((p, i) => (
              <Option value={p} key={i}>
                ${p}
              </Option>
            ))}
          </Select>

          <Select label="Bedroom" onChange={(value) => setBedrooms(value)}>
            {rooms.map((r, i) => (
              <Option value={r} key={i}>
                {r}
              </Option>
            ))}
          </Select>

          <Select label="Bathroom" onChange={(value) => setBathrooms(value)}>
            {rooms.map((r, i) => (
              <Option value={r} key={i}>
                {r}
              </Option>
            ))}
          </Select>

          <Select label="Garage" onChange={(value) => setParkings(value)}>
            {rooms.map((r, i) => (
              <Option value={r} key={i}>
                {r}
              </Option>
            ))}
          </Select>

          <Select label="Land Size" onChange={(value) => setLandSize(value)}>
            {lands.map((l, i) => (
              <Option value={l} key={i}>
                To {l} SQM.
              </Option>
            ))}
          </Select>

          <Select label="Mobility" onChange={(value) => setMobility(value)}>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </div> */}
        {/* filter box */}
        <div className="">
          {/* {(propertyType ||
            minPrice ||
            maxPrice ||
            bedrooms ||
            bathrooms ||
            parkings ||
            landSize) && (
            <div>
              <p>Filters:</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {propertyType && (
                  <button
                    className="px-4 py-2 bg-primary text-white flex justify-between gap-4items-center rounded min-w-[160px]"
                    onClick={() => handleReset(setPropertyType)}
                  >
                    {propertyType} <IoMdCloseCircle className="text-xl" />
                  </button>
                )}

                {minPrice && (
                  <button
                    className="px-4 py-2 bg-primary text-white flex justify-between gap-4 items-center rounded min-w-[160px]"
                    onClick={() => handleReset(setMinPrice)}
                  >
                    Min Price:{minPrice} <IoMdCloseCircle className="text-xl" />
                  </button>
                )}

                {maxPrice && (
                  <button
                    className="px-4 py-2 bg-primary text-white flex justify-between gap-4 items-center rounded min-w-[160px]"
                    onClick={() => handleReset(setMaxPrice)}
                  >
                    Max Price:{maxPrice} <IoMdCloseCircle className="text-xl" />
                  </button>
                )}

                {bedrooms && (
                  <button
                    className="px-4 py-2 bg-primary text-white flex justify-between gap-4 items-center  rounded min-w-[160px]"
                    onClick={() => handleReset(setBedrooms)}
                  >
                    Bedrooms: {bedrooms} <IoMdCloseCircle className="text-xl" />
                  </button>
                )}

                {bathrooms && (
                  <button
                    className="px-4 py-2 bg-primary text-white flex justify-between gap-4 items-center rounded min-w-[160px]"
                    onClick={() => handleReset(setBathrooms)}
                  >
                    Bathrooms: {bathrooms}{" "}
                    <IoMdCloseCircle className="text-xl" />
                  </button>
                )}

                {parkings && (
                  <button
                    className="px-4 py-2 bg-primary text-white flex justify-between gap-4 items-center  rounded min-w-[160px]"
                    onClick={() => handleReset(setParkings)}
                  >
                    Parkings: {parkings} <IoMdCloseCircle className="text-xl" />
                  </button>
                )}

                {landSize && (
                  <button
                    className="px-4 py-2 bg-primary text-white flex justify-between gap-4 items-center  rounded min-w-[160px]"
                    onClick={() => handleReset(setLandSize)}
                  >
                    {landSize} SQM <IoMdCloseCircle className="text-xl" />
                  </button>
                )}
              </div>
            </div>
          )} */}

          {loader ? (
            <Loader />
          ) : (
            <>
              {propertiesData?.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-5 mt-5">
                  {propertiesData?.map((p, i) => (
                    <PropertyCard key={i} p={p} />
                  ))}
                </div>
              ) : (
                <div className="h-[50vh] flex justify-center items-center rounded mt-5">
                  <p className="text-xl font-semibold text-primary">
                    No property found
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {/* search button for mobile */}
        {/* <button
          onClick={handleOpen}
          className="fixed lg:hidden right-2 bottom-2 bg-primary size-12 rounded-full flex justify-center items-center text-white"
        >
          <BiSearch className="text-3xl" />
        </button> */}
        {/* <Dialog open={open} handler={handleOpen} className="lg:hidden">
          <DialogBody>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-primary">Sort Property</p>
                <button
                  className="size-6 bg-red-600 text-white rounded-full flex justify-center items-center"
                  onClick={handleOpen}
                >
                  <CgClose className="text-xl" />
                </button>
              </div>

              <button
                onClick={() => {
                  setNewest(!newest);
                }}
                className={`px-4 py-2 border-2 border-primary ${
                  newest && "bg-primary text-white"
                } shadow rounded flex gap-2 items-center justify-start`}
              >
                <MdAccessTimeFilled /> Newest
              </button>
              <button
                onClick={() => {
                  setLowest(!lowest);
                  setHighest(false);
                }}
                className={`px-4 py-2 border-2 border-primary ${
                  lowest && "bg-primary text-white"
                } shadow rounded flex gap-2 items-center justify-start`}
              >
                <RiCoinFill /> Lowest Price
              </button>
              <button
                onClick={() => {
                  setHighest(!highest);
                  setLowest(false);
                }}
                className={`px-4 py-2 border-2 border-primary ${
                  highest && "bg-primary text-white"
                } shadow rounded flex gap-2 items-center justify-start`}
              >
                <FaCoins /> Highest Price
              </button>
              <p className="font-semibold text-primary">More Refinements</p>
              <Select
                label="Property Type"
                onChange={(value) => setPropertyType(value)}
              >
                <Option value="">Any</Option>
                <Option value="Residential">Residential</Option>
                <Option value="Projects">Projects</Option>
                <Option value="Commercial">Commercial</Option>
                <Option value="Rural">Rural</Option>
                <Option value="Business">Business</Option>
              </Select>

              <Select
                label="Minimum Price"
                onChange={(value) => setMinPrice(value)}
              >
                {prices.map((p, i) => (
                  <Option value={p} key={i}>
                    ${p}
                  </Option>
                ))}
              </Select>

              <Select
                label="Maximum Price"
                onChange={(value) => setMaxPrice(value)}
              >
                {prices.map((p, i) => (
                  <Option value={p} key={i}>
                    ${p}
                  </Option>
                ))}
              </Select>

              <Select label="Bedroom" onChange={(value) => setBedrooms(value)}>
                {rooms.map((r, i) => (
                  <Option value={r} key={i}>
                    {r}
                  </Option>
                ))}
              </Select>

              <Select
                label="Bathroom"
                onChange={(value) => setBathrooms(value)}
              >
                {rooms.map((r, i) => (
                  <Option value={r} key={i}>
                    {r}
                  </Option>
                ))}
              </Select>

              <Select label="Garage" onChange={(value) => setParkings(value)}>
                {rooms.map((r, i) => (
                  <Option value={r} key={i}>
                    {r}
                  </Option>
                ))}
              </Select>

              <Select
                label="Land Size"
                onChange={(value) => setLandSize(value)}
              >
                {lands.map((l, i) => (
                  <Option value={l} key={i}>
                    To {l} SQM.
                  </Option>
                ))}
              </Select>

              <Select label="Mobility" onChange={(value) => setMobility(value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </div>
          </DialogBody>
        </Dialog> */}
      </div>
    </section>
  );
}
