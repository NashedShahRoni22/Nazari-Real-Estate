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
    const handleScroll = () => {
      setShow(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Sell",
      link: "/property_search",
      // childs: [
      //   {
      //     name: "Recently Sold",
      //     link: "/property_search",
      //   },
      // ],
    },
    {
      name: "Rent",
      link: "/property_search",
      // childs: [
      //   {
      //     name: "Residential",
      //     link: "/property_search",
      //   },
      // ],
    },
    {
      name: "About",
      link: "",
      childs: [
        {
          name: "Our Agency",
          link: "/our_agencey",
        },
        {
          name: "Our Team",
          link: "/our_team",
        },
      ],
    },
  ];

  return (
    <nav className="relative">
      <section className="py-2.5 mx-2.5 lg:container lg:mx-auto flex justify-between items-center">
        <Link to={"/"} className="logo text-primary font-bold text-2xl">
          NRA
        </Link>
        {/* desktop view  */}
        <div className="hidden lg:flex gap-10">
          {menuItems.map((m, i) => (
            <div key={i} className="relative group">
              <Link to={m.link} className="font-semibold hover:text-primary">{m.name}</Link>
              {m.childs && (
                <div className="hidden group-hover:flex flex-col gap-2.5 absolute top-6 z-50 bg-white rounded shadow-lg min-w-[200px]">
                  {m.childs.map((mc, i) => (
                    <Link
                      key={i}
                      to={mc.link}
                      className="hover:bg-primary hover:text-white px-2.5 py-1.5 font-semibold"
                    >
                      {mc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <Link
            to={"/contact"}
            className="hidden lg:block px-4 py-2 bg-primary text-white font-semibold rounded shadow"
          >
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
              {m.childs ? (
                <>
                  <Link
                    className="text-xl flex justify-between items-center mt-2.5 font-semibold "
                    onClick={() => {
                      setShowChild({
                        state: !showChild.state,
                        id: i,
                      });
                    }}
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
                      {m.childs.map((mc, i) => (
                        <Link
                          onClick={() => setShow(false)}
                          key={i}
                          to={mc.link}
                          className="text-xl hover:bg-primary hover:text-white px-2.5 py-1.5 font-semibold"
                        >
                          {mc.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  className="text-xl flex justify-between items-center mt-2.5 font-semibold "
                  onClick={() => setShow(false)}
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
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
