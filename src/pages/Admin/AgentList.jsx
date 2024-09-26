import { Card } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Loader from "../../shared/Loader";
import { Link } from "react-router-dom";

export default function AgentList() {
  const url = `${import.meta.env.VITE_API_ROOT_URL}/admin/users`;
  const [agents, setAgents] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      const oaAccessToken = localStorage.getItem("oaAccessToken"); // Retrieve the access token

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${oaAccessToken}`, // Include the access token in the headers
          },
        });

        const data = await response.json();
        if (data.success) {
          setAgents(data.data); // Assuming the agents are in data.data
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching agents.");
      } finally {
        setLoader(false);
      }
    };

    fetchAgents();
  }, []);

  if (loader) {
    return <Loader />; // Optional loading indicator
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Agents List</h2>
      <div className="grid md:grid-cols-2 gap-2.5 md:gap-5 lg:grid-cols-4 mt-10">
        {agents?.map((agent) => (
          <Card key={agent.id} className="p-4 relative">
            <div className="flex justify-center">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mt-2">{agent.name}</h3>
              <h4 className="text-md text-gray-600 uppercase">{agent.designation}</h4>
              <div className="mt-2 flex flex-col items-center">
                <p className="flex items-center">
                  <MdEmail className="mr-2 text-blue-500" />
                  {agent.email}
                </p>
                <p className="flex items-center">
                  <MdPhone className="mr-2 text-green-500" />
                  {agent.phone_number}
                </p>
                <p className="flex items-center">
                  <MdLocationOn className="mr-2 text-red-500" />
                  {agent.location}
                </p>
              </div>
            </div>
            <Link
              to={`/admin/agnet_update/${agent.id}`}
              className="absolute right-2 top-2"
            >
              <FaEdit className="text-primary text-xl" />
            </Link>
            <div>
              {agent.status === "active" ? (
                <p className="bg-green-600 text-white px-2 py-1 shadow rounded w-fit absolute top-2 left-2">
                  Active
                </p>
              ) : (
                <p className="bg-red-600 text-white px-2 py-1 shadow rounded w-fit absolute top-2 left-2">
                  Inactive
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
