import React from "react";
import videoBg from "../../assets/video.mp4";
import { Link } from "react-router-dom";

export default function LandingBanner() {
  return (
    <section className="relative">
      <video
        className="w-full h-[50vh] md:h-full pointer-events-none object-cover"
        src={videoBg}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 left-0 bg-black/80 h-full w-full flex flex-col gap-8 md:gap-16 justify-center items-center">
        <p className="text-white md:text-3xl text-center">
          Looking to buy, rent or sell a property?
          <br />
          Explore our propert page for Digital Property Report that highlights
          the market value including <br />
          recent sales, listing activity, suburb report and more.
        </p>
        <div>
          <Link
            to="/properties/buy"
            className="px-8 py-2 bg-primary text-white rounded border border-primary"
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
}
