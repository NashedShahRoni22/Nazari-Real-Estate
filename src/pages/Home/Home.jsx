import React, { useEffect } from "react";
import LandingBanner from "./LandingBanner";
import OurService from "./OurService";
import TopAgencey from "./TopAgencey";
import Team from "../About/Team";
import Property from "../Property/Property";
import FavouriteListing from "../Property/FavouriteListing";
import GoogleReviews from "./GoogleReviews";
import { IoMdCloseCircle } from "react-icons/io";
import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";
import Testimonials from "./Testimonials";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const handleDelayedOpen = () => {
      setTimeout(() => {
        setOpen(true);
      }, 5000);
    };

    // Initiate the delayed opening only once
    handleDelayedOpen();
  }, []);

  const handleOpen = () => setOpen(!open);
  return (
    <section className="banner">
      <LandingBanner />
      <Property/>
      <OurService />
      <TopAgencey />
      <Testimonials/>
      {/* <FavouriteListing /> */}
      {/* <Team/> */}
      {/* <GoogleReviews/> */}
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogBody className="p-5">
          <p className="text-xl text-black font-semibold mb-5">
            One Agency in your inbox.
          </p>
          {/* <div className="h-0.5 w-full bg-blue my-5"></div> */}
          <form className="flex flex-col w-full gap-5 mt-5">
            <p className="text-black text-3xl">Sign up for email to get the latest update about properties</p>
            <Input
              // className="px-4 py-2 focus:outline-blue rounded border border-orange"
              required
              name="email"
              label="Enter Email Address"
              type="email"
              variant="standard"
              // placeholder="Enter Phone Number"
            />
            <div>
              <button
                type="submit"
                size="sm"
                className="bg-primary py-2.5 w-full shadow rounded text-white"
              >
                Subscribe
              </button>
            </div>
          </form>
          <button onClick={handleOpen} className="absolute top-0 right-0">
            <IoMdCloseCircle className="text-red-600 text-3xl" />
          </button>
        </DialogBody>
      </Dialog>
    </section>
  );
}
