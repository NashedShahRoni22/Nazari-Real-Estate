import React from "react";
import balance from "../../assets/services/balance.webp";
import people from "../../assets/services/people.webp";
import donut from "../../assets/services/donut-chart-1.webp";
import bar from "../../assets/services/bar-chart-stats-up.webp";
import shaking from "../../assets/services/shacking-hands.webp";
import barboard from "../../assets/services/bar-chart-board.webp";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export default function OurService() {
  const data = [
    {
      img: balance,
      title: "Recover Asset Value",
      details:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      img: people,
      title: "Property Management",
      details:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      img: donut,
      title: "Capital Improvements",
      details:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      img: bar,
      title: "Financial Reporting",
      details:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      img: shaking,
      title: "Business Development",
      details:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
    {
      img: barboard,
      title: "Finance Real Estate",
      details:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
    },
  ];

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <h1 className="text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">Our Services</h1>
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:gap-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mt-10 md:mt-20">
          {data.map((d, i) => (
            <div key={i} className="flex gap-5">
              <img src={d.img} alt="" className="h-[40px]" />
              <div>
                <h5 className="font-semibold text-xl">{d.title}</h5>
                <p className="text-gray-500 mt-2.5">{d.details}</p>
              </div>
            </div>
          ))}
        </div>
        <DotLottiePlayer src="/building.lottie" autoplay loop />
      </div>
    </section>
  );
}
