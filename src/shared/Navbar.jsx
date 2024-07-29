import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [showChild, setShowChild] = useState({
    state: false,
    id: null,
  });
  useEffect(() => {
    window.addEventListener("scroll", setShowChild({ state: false, id: null }));
    return () => {
      window.removeEventListener(
        "scroll",
        setShowChild({ state: false, id: null })
      );
    };
  }, []);
  const menuItems = [
    {
      name: "Home",
      link: "",
    },
    {
      name: "Buy",
      link: "",
      childs: [
        {
          name: "Residential",
          link: "/property_search",
        },
        {
          name: "Rular",
          link: "/property_search",
        },
        {
          name: "Land",
          link: "/property_search",
        },
        {
          name: "Open Homes",
          link: "/property_search",
        },
      ],
    },
    {
      name: "Comercial",
      link: "",
      childs: [
        {
          name: "For Sale",
          link: "/property_search",
        },
        {
          name: "For Lease",
          link: "/property_search",
        },
      ],
    },
    {
      name: "Sell",
      link: "",
      childs: [
        {
          name: "Recently Sold",
          link: "/property_search",
        },
      ],
    },
    {
      name: "Rent",
      link: "",
      childs: [
        {
          name: "Residential",
          link: "/property_search",
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
    <nav className="relative">
      <section className="py-2.5 mx-2.5 lg:container lg:mx-auto flex justify-between items-center">
        <h1 className="logo text-primary font-bold text-2xl">NRA</h1>
        {/* desktop view  */}
        <div className="hidden lg:flex gap-10">
          {menuItems.map((m, i) => (
            <div key={i} className="relative group">
              <Link className="font-semibold hover:text-primary">{m.name}</Link>
              {m.childs && (
                <div className="hidden group-hover:flex flex-col gap-2.5 absolute top-6 z-50 bg-white rounded shadow-lg min-w-[200px]">
                  {m.childs.map((mc,i) => (
                    <Link key={i} to={mc.link} className="hover:bg-primary hover:text-white px-2.5 py-1.5 font-semibold">
                      {mc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <Link to={'/contacts'} className="hidden lg:block px-4 py-2 bg-primary text-white font-semibold rounded shadow">
            Contact
          </Link>
          {show ? (
            <button className="lg:hidden" onClick={() => setShow(!show)}>
              <MdClose className="text-xl" />
            </button>
          ) : (
            <button className="lg:hidden" onClick={() => setShow(!show)}>
              <FaBars className="text-xl" />
            </button>
          )}
        </div>
      </section>
      {show && (
        <div className="lg:hidden gap-10 absolute top-10 min-w-full min-h-screen bg-white px-2.5 z-50">
          {menuItems.map((m, i) => (
            <div key={i}>
              <Link
                className="text-xl flex justify-between items-center mt-2.5 font-semibold "
                onClick={() =>
                  setShowChild({
                    state: !showChild.state,
                    id: i,
                  })
                }
              >
                {m.name}{" "}
                {m.childs && (
                  <>
                    {showChild.id === i && showChild.state ? (
                      <BiChevronUp />
                    ) : (
                      <BiChevronDown />
                    )}
                  </>
                )}{" "}
              </Link>
              {m.childs && showChild.id === i && showChild.state && (
                <div className="flex flex-col">
                  {m.childs.map((mc) => (
                    <Link className="text-xl hover:bg-primary hover:text-white px-2.5 py-1.5 font-semibold">
                      {mc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
