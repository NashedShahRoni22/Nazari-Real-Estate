import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import { Card, Typography } from "@material-tailwind/react";

export default function SaleRequestAdmin() {
  const url = `${import.meta.env.VITE_API_ROOT_URL}/sale-request/list`;
  const [contacts, setContacts] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
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
          setContacts(data.data); // Assuming the agents are in data.data
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

    fetchAppointments();
  }, []);

  if (loader) {
    return <Loader />; // Optional loading indicator
  }
  const TABLE_HEAD = ["Date","State", "Suburb", "User Name", "User Email", "User Phone", "User Address"];
  return (
    <div className="p-5 md:p-10">
      <h2 className="text-xl font-semibold">Sell request: {contacts?.length}</h2>
      <Card className="h-full w-full overflow-scroll mt-5">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts?.map((a, index) => {
            const isLast = index === contacts?.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal uppercase"
                  >
                    {a?.created_at?.slice(0, 10)}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {a?.state}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {a?.suburb}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {a?.name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {a?.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {a?.telephone}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {a?.address}
                  </Typography>
                </td>
                {/* <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {a?.user?.name}
                  </Typography>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
  );
}
