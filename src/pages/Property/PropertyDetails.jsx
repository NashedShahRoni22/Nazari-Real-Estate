import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../shared/Loader";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { BiBath, BiBed, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { PiGarage } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";

export default function propertyDetails() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [showImgNum, setShowImgNum] = useState(0);
  const [open, setOpen] = React.useState(false);
  const oaAccessToken = localStorage.getItem("oaAccessToken");

  const publicUrl = `${
    import.meta.env.VITE_API_ROOT_URL
  }/public/appointment/store`

  const handleOpen = () => setOpen(!open);

  const handleNextImage = () => {
    setShowImgNum((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setShowImgNum((prev) => (prev - 1 + images.length) % images.length);
  };

  const [propertyDetails, setPropertyDetails] = useState({});

  const [images, setImages] = useState([]);

  const fetchPropertyDetails = async () => {
    setLoader(true);
    const url = `${
      import.meta.env.VITE_API_ROOT_URL
    }/public/property/details/${id}`;

    try {
      const response = await axios.get(url);
      setPropertyDetails(response?.data?.data);
      setImages(response?.data?.data?.property_images);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  async function handaleSubmit(event) {
    setLoader(true);
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const address = event.target.address.value;
    const message = event.target.message.value;

    console.log(name, email, phone);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("message", message);

    formData.append("property_id", propertyDetails?.id);
    formData.append("agent_id", propertyDetails?.property_users[0]?.id);

    try {
      const response = await fetch( publicUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${oaAccessToken}`, // Include the access token in the headers
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success === true) {
        handleOpen()
        setLoader(false);
        toast.success("Appointment submitted! Our reprentative will reach you soon.");
    
      } else {
        setLoader(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
    }
  }

  return (
    <section className="mx-5 md:container md:mx-auto">
      {loader ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-5 my-5">
          {/* images rendered here  */}
          <div>
            {images?.length > 0 ? (
              <div className="flex justify-center min-h-[50vh] relative">
                <img
                  src={images[showImgNum]?.name}
                  className="max-h-[70vh] rounded shadow w-full"
                  alt=""
                />
                <div className="absolute bottom-5 left-5 p-2 bg-primary text-white shadow-xl rounded">
                  Showing :{showImgNum + 1}/{images?.length}
                </div>
                {/* Chevron Buttons */}
                <div className="absolute bottom-5 right-5 flex gap-2.5">
                  <button
                    onClick={handlePrevImage}
                    className="bg-primary text-white shadow-xl rounded-full"
                  >
                    <BiChevronLeft className="text-3xl md:text-5xl" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-primary text-white shadow-xl rounded-full"
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

          <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:gap-16 items-start">
            {/* property details here  */}
            <div className="flex flex-col gap-5 md:gap-10 lg:w-4/6">
              <h5 className="text-2xl md:text-4xl font-semibold">
                {propertyDetails?.title}
              </h5>
              <h5 className="md:text-xl text-primary font-semibold flex gap-2 items-center">
                <FaLocationDot className="text-xl" />
                {propertyDetails?.location}
              </h5>
              <div className="flex gap-4 flex-wrap">
                {propertyDetails?.floor_plan !== null && (
                  <Link
                    to={propertyDetails?.floor_plan}
                    target="_blank"
                    className="px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white ease-linear duration-300 rounded-xl"
                  >
                    View Floorplans
                  </Link>
                )}
                <Link
                  to={propertyDetails?.brochure}
                  target="_blank"
                  className="px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white ease-linear duration-300 rounded-xl"
                >
                  Broucher
                </Link>
                <button
                  onClick={handleOpen}
                  className="px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white ease-linear duration-300 rounded-xl"
                >
                  Book Appointment
                </button>
              </div>
              <h5 className="text-xl md:text-2xl font-semibold ">
                <span className="font-semibold">Price:</span>{" "}
                <span className="text-primary">{propertyDetails?.price}</span>
              </h5>

              <div className="flex flex-wrap justify-between">
                <div className="flex flex-col items-center gap-2.5 text-2xl">
                  <BiBed className="text-2xl text-primary" />{" "}
                  <p>{propertyDetails?.bedrooms}</p>
                  <p className="text-sm text-primary">Bedrooms</p>
                </div>
                <div className="flex flex-col items-center gap-2.5 text-2xl">
                  <BiBath className="text-2xl text-primary" />{" "}
                  <p>{propertyDetails?.bathrooms}</p>
                  <p className="text-sm text-primary">Bathrooms</p>
                </div>
                <div className="flex flex-col items-center gap-2.5 text-2xl">
                  <PiGarage className="text-2xl text-primary" />{" "}
                  <p>{propertyDetails?.parking}</p>
                  <p className="text-sm text-primary">Parkings</p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <h5 className="text-xl text-primary font-semibold">
                  Property Details
                </h5>
                <p className="">
                  <span className="font-semibold">Property Type:</span>{" "}
                  <span className="uppercase">
                    {propertyDetails?.property_type}
                  </span>
                </p>
                <p className="">
                  <span className="font-semibold">Property Categorey:</span>{" "}
                  <span className="uppercase">{propertyDetails?.category}</span>
                </p>
                <p className="">
                  <span className="font-semibold">Land Area:</span>{" "}
                  {propertyDetails?.land_size}
                </p>
                {propertyDetails?.house_size !== "" && (
                  <p className="">
                    <span className="font-semibold">House Size:</span>{" "}
                    {propertyDetails?.house_size}
                  </p>
                )}
              </div>

              <div>
                <h5 className="text-xl text-primary font-semibold">
                  Property description
                </h5>
                <div
                  className="mt-2.5"
                  dangerouslySetInnerHTML={{ __html: propertyDetails?.content }}
                />
              </div>

              {propertyDetails?.inspection_time?.length > 0 && (
                <div>
                  <h5 className="text-xl text-primary font-semibold">
                    Inspection Dates:
                  </h5>
                  <table className="w-full mt-5">
                    <thead className="bg-primary border border-primary text-white">
                      <tr>
                        <th className="py-2">Date</th>
                        <th className="py-2">Start Time</th>
                        <th className="py-2">End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propertyDetails?.inspection_time?.map((entry, index) => (
                        <tr key={index} className="border-b border-primary">
                          <td className="text-center py-2 border-x border-primary">
                            {entry.date}
                          </td>
                          <td className="text-center py-2 border-primary">
                            {entry.startTime}
                          </td>
                          <td className="text-center py-2 border-x border-primary">
                            {entry.endTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* agent details here  */}

            <div className="w-full lg:w-2/6">
              <h5 className="text-xl text-primary font-semibold">
                Contact our agents
              </h5>
              {propertyDetails?.property_users?.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-2.5 mt-5">
                  {propertyDetails?.property_users?.map((pu) => (
                    <div
                      key={pu?.id}
                      className="p-4 shadow shadow-primary rounded flex flex-col gap-2 justify-center items-center"
                    >
                      <img
                        src={pu?.image}
                        className="h-[100px] w-[100px] rounded-full"
                        alt=""
                      />
                      <p className="font-semibold">{pu?.name}</p>
                      <p className="flex items-center gap-2">
                        <MdEmail className="text-primary" /> {pu?.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <MdPhone className="text-primary" /> {pu?.phone_number}
                      </p>
                      <p className="flex items-center gap-2">
                        <MdLocationOn className="text-primary" /> {pu?.location}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xl text-red-500 font-semibold mt-5">
                  No Agent Found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* <Contact /> */}
      <>
        <Dialog open={open} handler={handleOpen} className="overflow-auto">
          <DialogBody className="p-8">
            <div className="flex justify-between items-center">
              <h5 className="text-xl md:text-3xl font-semibold">Book your appointment </h5>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="m-6"
              >
                <IoMdCloseCircle className="text-red-500 text-3xl" />
              </Button>
            </div>
            <form
              action=""
              className="flex flex-col gap-4 md:gap-8"
              onSubmit={handaleSubmit}
            >
              <p className="md:text-xl font-semibold text-primary">
                Property details:
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Type
                  </label>
                  <Input
                    variant="standard"
                    label="type"
                    name="type"
                    defaultValue={propertyDetails?.type}
                    className=" mt-2.5 px-4"
                    disabled
                  />
                </div>
                <div>
                  <label
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Property Type
                  </label>
                  <Input
                    variant="standard"
                    name="property_type"
                    defaultValue={propertyDetails?.property_type}
                    className=" mt-2.5 px-4"
                    disabled
                  />
                </div>

                <div>
                  <label
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Price
                  </label>
                  <Input
                    variant="standard"
                    name="price"
                    defaultValue={propertyDetails?.price}
                    className=" mt-2.5 px-4"
                    disabled
                  />
                </div>
                <div>
                  <label
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Property Title
                  </label>
                  <Input
                    variant="standard"
                    name="title"
                    defaultValue={propertyDetails?.title}
                    className=" mt-2.5 px-4"
                    disabled
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Property Location
                  </label>
                  <Input
                    variant="standard"
                    name="location"
                    defaultValue={propertyDetails?.location}
                    className=" mt-2.5 px-4"
                    disabled
                  />
                </div>
              </div>
              <p className="md:text-xl font-semibold text-primary">
                Submit your details:
              </p>
              <div className="grid gap-5 md:grid-cols-2">
              <Input required variant="static" name="name" label="Name" />
                <Input required variant="static" name="email" label="Email" />
                <Input required variant="static" name="phone" label="Phone" />
               
                <Input required variant="static" name="address" label="Address" />
                <Input required variant="static" name="message" label="Message" />
              </div>

              <Button
                type="submit"
                className="bg-primary w-fit"
                disabled={loader}
              >
                <span>Submit</span>
              </Button>
            </form>
          </DialogBody>
        </Dialog>
      </>
    </section>
  );
}
