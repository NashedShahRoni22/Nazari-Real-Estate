import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import ContactBar from "../shared/ContactBar";

export default function Root() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <main className="relative">
      <ContactBar/>
      <Navbar />
      <Outlet />
      <Footer />
      {/* <Link
        to={"/contact"}
        className="fixed right-1.5 md:right-5 bottom-1.5 md:bottom-5 h-[120px] md:h-[200px] z-50"
      >
        <DotLottiePlayer src="/bot.lottie" autoplay loop />
      </Link> */}
    </main>
  );
}
