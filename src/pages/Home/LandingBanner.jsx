import React from "react";
import videoBg from "../../assets/video.mp4";

export default function LandingBanner() {
  return (
    <section className="relative">
      <video className="w-full h-full" src={videoBg} autoPlay loop muted />
      <div className="absolute top-0 left-0 bg-black/80 h-full w-full flex flex-col gap-8 md:gap-16 justify-center items-center">
        {/* <h1 className="text-3xl md:text-6xl font-extrabold text-center">
          <span className="text-primary">ONE</span>
          <span className="text-white">AGENCY</span>{" "}
        </h1> */}
        <p className="text-white md:text-3xl text-center">
          Looking to buy or sell a property?
          <br />
          Search the address below for a Digital Property Report that highlights
          the market value including <br />
          recent sales, listing activity, suburb report and more.
        </p>
        <div>
          <input
            className="px-5 py-2.5 rounded-l"
            placeholder="Enter Address"
            type="text"
          />
          <button className="px-5 py-2.5 bg-primary text-white rounded-r">
            Find
          </button>
        </div>
      </div>
    </section>
  );
}
