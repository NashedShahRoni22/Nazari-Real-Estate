import React from "react";
import balance from "../../assets/services/balance.webp";
import people from "../../assets/services/people.webp";
import donut from "../../assets/services/donut-chart-1.webp";
import bar from "../../assets/services/bar-chart-stats-up.webp";
import shaking from "../../assets/services/shacking-hands.webp";
import barboard from "../../assets/services/bar-chart-board.webp";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export default function OurService() {
  // const data = [
  //   {
  //     img: balance,
  //     title: "Recover Asset Value",
  //     details:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  //   },
  //   {
  //     img: people,
  //     title: "Property Management",
  //     details:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  //   },
  //   {
  //     img: donut,
  //     title: "Capital Improvements",
  //     details:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  //   },
  //   {
  //     img: bar,
  //     title: "Financial Reporting",
  //     details:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  //   },
  //   {
  //     img: shaking,
  //     title: "Business Development",
  //     details:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  //   },
  //   {
  //     img: barboard,
  //     title: "Finance Real Estate",
  //     details:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
  //   },
  // ];

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20 flex flex-col gap-8 md:gap-16">
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:gap-16">
        <div className="flex flex-col gap-2.5 lg:w-2/3">
          <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
            Our Mission Statement
          </h1>
          <span className="text-gray-500">
            A revolution in real estate, empowering real estate professionals.
          </span>
          <h5 className="font-semibold text-xl text-justify">
            One Agency is a revolution in real estate, empowering both
            individual real estate professionals and established agencies to
            take control of their own business and their future and bring an
            entirely new level of service to clients.
          </h5>
          <p className="text-gray-500 text-justify">
            Every successful agent wants to be in a position to achieve their
            true potential and bring their own vision, ideas and working style
            to life, with many seeking to re-invigorate their brand and enhance
            their market presence. We believe we have achieved the perfect
            vehicle for driven agents to steer their own ship and better
            represent their clients in the marketplace.
            <br />
            We are Australia and New Zealand's fastest growing real estate
            agency network, with new members quickly joining the network
            throughout Australasia. One Agency Principals are all well-known and
            respected real estate professionals who use the One Agency brand and
            technology platform to operate their own business, without
            operational or systems constraints. And because they are vested in
            the success of their own business and it’s their own name connected
            to the business, it is our view that this translates to far greater
            care and attention for clients, as well as a greater incentive to
            achieve premium results.
          </p>
        </div>
        <div className="lg:w-1/2">
          <DotLottiePlayer src="/building.lottie" autoplay loop />
        </div>
      </div>
      
      {/* <div className="flex flex-col gap-2.5">
        <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
          Member Network
        </h1>
        <span className="text-gray-500 font-semibold">
          About the One Agency Member Network
        </span>
        <p className="text-gray-500 text-justify">
          One Agency Members are independent business owners, who own and are
          responsible for operating their own independent real estate agency
          business. One Agency Members are licensed to use the One Agency brand
          and to access the One Agency website platform as they consider
          appropriate for the conduct of their own independent real estate
          agency business.
          <br />
          One Agency Members are not employees, partners, joint venturers,
          franchisees, legal representatives or agents of One Agency Pty
          Limited. One Agency Members have no authority to give any warranties
          or make any representations for or on behalf of One Agency Pty
          Limited, or contract for or assume any obligations on One Agency Pty
          Limited’s behalf.
          <br />
          One Agency Pty Limited makes no representation and gives no warranty
          in relation to the conduct of any One Agency Member (including any of
          its agents) or the operation of any One Agency Member business. One
          Agency Pty Limited accepts no responsibility in connection with any
          claim made by any person directly or indirectly against any One Agency
          Member, and does not accept or assume any liability for any loss,
          damage or cost incurred by any person.
        </p>
        <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
          Member Network
        </h1>
        <p className="text-gray-500">
          All property information disclosed on this website has been obtained
          by and supplied by One Agency Members. One Agency Pty Limited has not
          independently verified the supplied property information. Accordingly
          One Agency Pty Limited makes no representation and gives no warranty
          as to the accuracy, reliability or completeness of any property
          information, and accepts no responsibility for any property
          information. All queries regarding any property or any supplied
          property information should be directed to the relevant One Agency
          Member who holds the property listing.
        </p>
      </div> */}
    </section>
  );
}

{
  /* <div className="grid md:grid-cols-2 gap-8 md:gap-16 mt-10 md:mt-20">
          {data.map((d, i) => (
            <div key={i} className="flex gap-5">
              <img src={d.img} alt="" className="h-[40px]" />
              <div>
                <h5 className="font-semibold text-xl">{d.title}</h5>
                <p className="text-gray-500 mt-2.5">{d.details}</p>
              </div>
            </div>
          ))}
        </div> */
}
