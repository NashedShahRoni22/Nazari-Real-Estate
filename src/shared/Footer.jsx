import React from "react";
import { BiCopyright } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Footer() {
  const menuItems = [
    {
      name: "Buy",
      link: "",
      childs: [
        {
          name: "Residential",
          link: "",
        },
        {
          name: "Rular",
          link: "",
        },
        {
          name: "Land",
          link: "",
        },
        {
          name: "Open Homes",
          link: "",
        },
      ],
    },
    {
      name: "Comercial",
      link: "",
      childs: [
        {
          name: "For Sale",
          link: "",
        },
        {
          name: "For Lease",
          link: "",
        },
      ],
    },
    {
      name: "Sell",
      link: "",
      childs: [
        {
          name: "Recently Sold",
          link: "",
        },
      ],
    },
    {
      name: "Rent",
      link: "",
      childs: [
        {
          name: "Residential",
          link: "",
        },
      ],
    },
    {
      name: "About",
      link: "",
      childs: [
        {
          name: "Our Agency",
          link: "",
        },
        {
          name: "Our Team",
          link: "",
        },
      ],
    },
  ];
  return (
    <footer className="bg-black/90 text-white py-10 md:py-20">
      <div className="mx-5 md:container md:mx-auto flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="logo text-primary font-bold text-2xl">NRA</h1>
          <h5>Office Location</h5>
          <p>
            3755 Commercial St SE Salem, Corner with Sunny Boulevard, 37557,
            Sydney, Australia
          </p>
        </div>
        <div>
          <h5 className="font-bold text-2xl">Quick Links</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-5">
            {menuItems.map((m, i) => (
              <div key={i} className="relative">
                <Link className="text-primary">{m.name}</Link>
                <div className="flex flex-col gap-2.5 ml-2.5 mt-2.5">
                  {m.childs && m.childs.map((mc) => <Link>{mc.name}</Link>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-white my-5 md:my-10"></div>
      <p className="flex items-center justify-center gap-2">
        <BiCopyright className="text-xl"/>Copyright reserved by <span className="text-primary">Nazari Real Estate</span>
      </p>
    </footer>
  );
}
