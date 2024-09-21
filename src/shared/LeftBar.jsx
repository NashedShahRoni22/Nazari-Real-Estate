import React from "react";
import { BiBuilding, BiMessage, BiNews, BiUser } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function LeftBar({ setShow }) {
  const menus = [
    {
      name: "Agents",
      link: "/admin/contact_message",
      icon: <BiUser />,
    },
    {
      name: "Property",
      link: "/admin/add_service",
      icon: <BiBuilding />,
    },

    {
      name: "Blog",
      link: "/admin/blogs",
      icon: <BiNews />,
    },
    {
      name: "Appointments",
      link: "/admin",
      icon: <BiMessage />,
    },
    {
      name: "Contact",
      link: "/admin/manage_service",
      icon: <MdEmail />,
    },
  ];
  return (
    <section className="shadow-xl min-h-screen sticky top-0 bg-black text-white md:w-1/3 lg:w-full">
      <div className="p-2.5 flex justify-center">
        <img src={logo} alt="" className="h-[40px]" />
      </div>
      <div className="p-5 flex flex-col">
        {menus.map((m, i) => (
          <Link
            to={m.link}
            key={i}
            onClick={() => setShow(false)}
            className=" p-2.5 min-w-full text-center md:text-left flex items-center gap-2"
          >
            {m.icon}
            {m.name}
          </Link>
        ))}
      </div>
      <div className="flex justify-center absolute bottom-4 min-w-full">
        <Link
          className="px-4 py-2 text-sm bg-red-500 text-white w-fit rounded shadow flex gap-2 items-center"
          to="/"
          onClick={() => localStorage.removeItem("smfAccessToken")}
        >
          {" "}
          <GoSignOut className="text-xl" /> Log Out
        </Link>
      </div>
    </section>
  );
}
