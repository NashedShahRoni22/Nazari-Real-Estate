import { DotLottiePlayer } from "@dotlottie/react-player";
import React from "react";

export default function OurMarketing() {
  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20 flex flex-col gap-8 md:gap-16">
      <div className="flex flex-col-reverse gap-8 lg:flex-row-reverse lg:items-end lg:gap-16">
        <div className="flex flex-col gap-2.5 lg:w-2/3">
          <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
            One Agency Marketing Advantage
          </h1>
          <span className="text-gray-500">
            Recognised One Agency branding is your advantage.
          </span>
          <h5 className="font-semibold text-xl text-justify">
            One Agency is committed to developing the latest marketing
            technology for the benefit of clients.
          </h5>
          <p className="text-gray-500 text-justify">
            One Agency members pride themselves on their advanced marketing
            skills, tailoring targeted, high-impact campaigns which are
            cost-effective and give their clients the very best chance of
            success. One Agency members have the benefit of being associated
            with the respected One Agency brand and access to advanced marketing
            technology, with access to an expansive Australasia-wide network of
            One Agency members.
          </p>
          <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
            Member Network
          </h1>
          <span className="text-gray-500 font-semibold">
            About the One Agency Member Network
          </span>
          <p className="text-gray-500 text-justify">
            One Agency Members are independent business owners, who own and are
            responsible for operating their own independent real estate agency
            business. One Agency Members are licensed to use the One Agency
            brand and to access the One Agency website platform as they consider
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
            in relation to the conduct of any One Agency Member (including any
            of its agents) or the operation of any One Agency Member business.
            One Agency Pty Limited accepts no responsibility in connection with
            any claim made by any person directly or indirectly against any One
            Agency Member, and does not accept or assume any liability for any
            loss, damage or cost incurred by any person.
          </p>
        </div>
        <div className="lg:w-1/2">
          <DotLottiePlayer src="/building2.lottie" autoplay loop />
        </div>
      </div>
    </section>
  );
}
