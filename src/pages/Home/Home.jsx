import React from "react";
import LandingBanner from "./LandingBanner";
import OurService from "./OurService";
import TopAgencey from "./TopAgencey";
import Team from "../About/Team";
import Property from "../Property/Property";
import FavouriteListing from "../Property/FavouriteListing";
import GoogleReviews from "./GoogleReviews";

export default function Home() {
  return (
    <section className="banner">
      <LandingBanner />
      <TopAgencey/>
      <OurService/>
      <Property/>
      <FavouriteListing/>
      <Team/>
      <GoogleReviews/>
    </section>
  );
}
