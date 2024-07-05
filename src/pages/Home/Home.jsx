import React from "react";
import LandingBanner from "./LandingBanner";
import OurService from "./OurService";
import TopAgencey from "./TopAgencey";
import Team from "../About/Team";

export default function Home() {
  return (
    <section className="banner">
      <LandingBanner />
      <TopAgencey/>
      <OurService/>
      <Team/>
    </section>
  );
}
