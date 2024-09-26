import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import { PiPhoneCall } from "react-icons/pi";
import { MdEmail } from "react-icons/md";

export default function Team() {
  const [loader, setLoader] = useState(false);
  const [teams, setTeams] = useState([]);
  const url = `${
    import.meta.env.VITE_API_ROOT_URL
  }/public/agents`;

  useEffect(() => {
    setLoader(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.data);
        setLoader(false);
      });
  }, []);

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Meet Office Team
      </h1>
      {loader ? (
        <Loader />
      ) : (
        <div className="mt-8 md:mt-16 grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teams?.map((a, i) => (
            <div
              key={i}
              className="group flex flex-col items-center p-5 gap-1.5 md:gap-2.5 shadow hover:shadow-lg hover:shadow-primary hover:-translate-y-5 duration-300 ease-linear"
            >
              <img
                src={a?.image}
                alt=""
                className="rounded-full h-[150px] w-[150px]"
              />
              <h5 className="text-xl font-semibold group-hover:text-primary duration-300 ease-linear">
                {a?.name}
              </h5>
              <p className="text-primary group-hover:text-gray-500 font-semibold duration-300 ease-linear">
                {a?.designation}
              </p>
              <p className="flex items-center gap-1">
                <PiPhoneCall className="text-xl" />
                {a?.phone_number}
              </p>
              <p className="flex items-center gap-1">
                <MdEmail className="text-xl" />
                {a?.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
