import React from "react";
import nazari from "../../assets/nazari.jpg";
import { BiPhone } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import Contact from "../Contact";
export default function Agencey() {
  const handleCallClick = () => {
    window.location.href = "tel:+0422415837"; // Replace with the desired phone number
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:tameem@atrealty.com.au"; // Replace with the desired email address
  };

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <div className="flex flex-col gap-4 md:gap-8">
        <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        About One Agency Macquarie Fields
        </h1>
        <p className="text-justify">
        At One Agency Macquarie Fields, we are more than just a real estate agency—we are your
         trusted partner in navigating the complex world of property transactions. Established in 2014
          as My Realty NSW, our agency quickly became one of the most respected and fastest-growing real
           estate firms in the South-West Region of NSW. In March 2022, we rebranded to One Agency Macquarie Fields,
            reflecting our commitment to delivering a more personalized, innovative, and client-focused real estate experience.
        </p>
        <h2 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Why Sell with One Agency Macquarie Fields?
        </h2>
        <p className="text-justify">
        When it comes to selling your property, choosing the right partner can significantly 
        impact your success. Here’s why One Agency Macquarie Fields is the best choice for you:
        </p>
        <ul className="ml-10">
          <li className="text-justify list-disc ">
          <span className="font-bold" >Proven Expertise and Local Knowledge : </span> With years of experience and a deep understanding of the 
          local market, our team knows how to position your property to attract the right buyers and achieve the best possible price. 
          We have a proven track record of successful sales and delighted clients, underpinned by our dedication to excellence and results. 
          </li>
          <li className="text-justify list-disc mt-2">
          <span className="font-bold" >Customized Marketing Strategies :  </span>Every property is unique, and so is our approach to selling it. We develop 
          a bespoke marketing plan tailored to your property, utilizing a mix of digital marketing, social media campaigns,
           professional photography, virtual tours, and traditional advertising. This multi-channel approach maximizes your property’s exposure
            to reach the widest possible audience and generate genuine interest.  
          </li>
          <li className="text-justify list-disc mt-2">
          <span className="font-bold" >Cutting-Edge Tools and Wide Community Support :  </span> 
          We leverage the latest tools and technology to give your property a competitive edge. 
          From advanced property valuation software to targeted digital advertising and virtual staging, 
          we use every resource at our disposal to showcase your property in the best light. Additionally,
           we benefit from strong community connections and support that enable us to tap into an 
          extensive network of buyers and investors, further boosting your property’s visibility and market appeal.
          </li>
          <li className="text-justify list-disc mt-2">
          <span className="font-bold" >Client-Centric Philosophy : </span> 
          At One Agency Macquarie Fields, your needs come first. We take the time to understand your
           unique goals and tailor our approach to meet them. From the moment you list your property
            with us to the day of settlement, we work closely with you, providing guidance, support, 
            and clear communication at every step.
           Our goal is to make the selling process seamless and stress-free
          </li>
          <li className="text-justify list-disc mt-2">
          <span className="font-bold" > Transparent Communication :  </span> 
          We believe in building trust through transparency. You’ll receive regular updates, 
          detailed market feedback, 
          and honest advice, so you’re always informed and confident in your decisions.
          </li>
          <li className="text-justify list-disc mt-2">
          <span className="font-bold" >Comprehensive Service Offering :  </span> 
          We handle every aspect of the sale, from preparing your property for the market to 
          managing negotiations and closing the deal. Our full-service approach includes professional staging, photography,
           open house management, and expert negotiation to ensure you get the best results.
          </li>
        </ul>
        <h2 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Our Commitment to Excellence
        </h2>
        <p className="text-justify">
        We are driven by a commitment to excellence in everything we do.
         As a community-focused agency, we are dedicated to delivering 
        the best possible outcomes for our clients and making .a positive impact in our local area. We approach every 
        transaction with creativity, passion, and a determination to exceed your expectations.
        </p>
        <h2 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Adapting to the Market, Growing with You
        </h2>
        <p className="text-justify">
        In a constantly evolving real estate market, we stay ahead of the curve by continuously 
        investing in the latest technologies, training, and market research. This proactive approach 
        enables us to provide our clients with up-to-date insights, effective strategies, and the best opportunities to succeed. Our growth as a 
        leading agency in the South-West Region of NSW reflects our dedication to innovation and client satisfaction.
        </p>
        <h2 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Your Success is Our Mission
        </h2>
        <p className="text-justify">
        Whether you are selling, buying, renting, or simply curious about your property’s value, 
        One Agency Macquarie Fields is the right step to take. We are here to guide you every step of the way with expertise, integrity, and a commitment to achieving the best possible results.
       Choose One Agency Macquarie Fields, where we combine local expertise, innovative tools, and a strong community network to make your real estate journey success

        </p>
        {/* <div className="flex gap-5">
          <button
            onClick={handleCallClick}
            className="flex items-center gap-2.5 py-2 px-4 bg-primary text-white justify-center shadow rounded"
          >
            <BiPhone className="text-xl" />
            Call Now
          </button>
          <button
            onClick={handleEmailClick}
            className="flex items-center gap-2.5 py-2 px-4 bg-primary text-white justify-center shadow rounded"
          >
            <MdEmail className="text-xl" />
            Email Me
          </button>
        </div> */}
      </div>
      {/* <Contact /> */}
    </section>
  );
}
