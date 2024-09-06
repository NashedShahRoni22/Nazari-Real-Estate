import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import Loader from "../../shared/Loader";

export default function Team() {
  const [loader, setLoader] = useState(false);
  const [team, setTeam] = useState([]);

  // Access the environment variables
  const apiRoot = import.meta.env.VITE_API_ROOT;
  const token = import.meta.env.VITE_APP_TOKEN;
  const agents = [
    {
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      designation: "Senior Agent",
      phone: "123-456-7890",
      email: "john.doe@example.com",
    },
    {
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      designation: "Junior Agent",
      phone: "098-765-4321",
      email: "jane.smith@example.com",
    },
    {
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Michael Johnson",
      designation: "Lead Agent",
      phone: "555-123-4567",
      email: "michael.johnson@example.com",
    },
    {
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Emily Davis",
      designation: "Field Agent",
      phone: "444-987-6543",
      email: "emily.davis@example.com",
    },
    {
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Chris Lee",
      designation: "Assistant Agent",
      phone: "333-876-5432",
      email: "chris.lee@example.com",
    },
    {
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Sara Wilson",
      designation: "Regional Agent",
      phone: "222-765-4321",
      email: "sara.wilson@example.com",
    },
    {
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "David Martinez",
      designation: "Consultant Agent",
      phone: "111-654-3210",
      email: "david.martinez@example.com",
    },
    {
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Linda Brown",
      designation: "Supervising Agent",
      phone: "777-543-2109",
      email: "linda.brown@example.com",
    },
  ];

  const fetchTeam = async () => {
    setLoader(true);
    const url = `${apiRoot}/head-office-team-members`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setTeam(response?.data?.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Meet Our Head Office Team
      </h1>
      {loader ? (
        <Loader />
      ) : (
        <div className="mt-8 md:mt-16 grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((a, i) => (
            <div
              key={i}
              className="group flex flex-col items-center p-5 gap-1.5 md:gap-2.5 shadow hover:shadow-lg hover:shadow-primary hover:-translate-y-5 duration-300 ease-linear"
            >
              <img
                src={a?.attributes?.photo}
                alt=""
                className="rounded-full h-[150px] w-[150px]"
              />
              <h5 className="text-xl font-semibold group-hover:text-primary duration-300 ease-linear">
                {a?.attributes?.name}
              </h5>
              <p className="text-primary group-hover:text-gray-500 font-semibold duration-300 ease-linear">
                {a?.attributes?.job_title}
              </p>
              {/* <p className="flex items-center gap-1">
              <PiPhoneCall className="text-xl" />
              {a.phone}
            </p>
            <p className="flex items-center gap-1">
              <MdEmail className="text-xl" />
              {a.email}
            </p> */}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
