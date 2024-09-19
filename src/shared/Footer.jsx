import React from "react";
import { BiCopyright, BiPhone } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Buy",
      link: "/property-search",
    },
    {
      name: "Rent",
      link: "/property-search",
    },
    {
      name: "Sell",
      link: "/property-search",
    },
    {
      name: "Our Agency",
      link: "/our-agencey",
    },
    {
      name: "Our Team",
      link: "/our-team",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];
  return (
    <footer className="bg-black/90 text-white py-10 md:py-20">
      <div className="mx-5 md:container md:mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="logo text-primary font-bold text-2xl">
            One Agency Macquarie Fields
          </h1>
          {/* <h5>Office Location</h5> */}
          <p className="flex gap-2.5">
            {" "}
            <CiLocationOn className="text-primary text-xl" />
            50 Saywell Rd, Macquarie Fields NSW 2564, Australia
          </p>
          {/* <h5>Contact Number</h5> */}
          <p className="flex gap-2.5">
            {" "}
            <BiPhone className="text-primary text-xl" /> (02) 9829 2476
          </p>
          <p className="flex gap-2.5">
            {" "}
            <MdEmail className="text-primary text-xl" /> contact@oneagencyms.com.au
          </p>
        </div>
        <div className="">
          <h5 className="font-bold text-2xl text-primary">Quick Links</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-5">
            {menuItems.map((m, i) => (
              <div key={i} className="relative">
                <Link className="hover:text-primary" to={m.link}>
                  {m.name}
                </Link>
                <div className="flex flex-col gap-2.5 ml-2.5 mt-2.5">
                  {m.childs &&
                    m.childs.map((mc, i) => (
                      <Link key={i} to={mc.link}>
                        {mc.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h5 className="font-bold text-2xl text-primary">
            Subscribe to our newsletter
          </h5>
          <div className="flex items-center mt-5">
            <input
              type="text"
              className="px-4 py-2 rounded-l"
              placeholder="Enter your email"
            />
            <button className="px-4 py-2 bg-primary text-white font-semibold rounded-r">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-white my-5 md:my-10"></div>
      <p className="flex items-center justify-center gap-2">
        <BiCopyright className="text-xl" />
        Copyright reserved by{" "}
        <span className="text-primary">One Agency Macquarie Fields</span>
      </p>
    </footer>
  );
}
