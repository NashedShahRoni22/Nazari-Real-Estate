import {
  Input,
  Option,
  Select,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SaleRequest() {
  const [loader, setLoader] = useState(false);
  const [regions, setRegions] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  
  const [selectedRegion, setSelectedRegion] = useState("");
  const [agentId, setAgentId] = useState("");

  const [getloader, setGetLoader] = useState(false);
  const [teams, setTeams] = useState([]);
  const agenturl = `${import.meta.env.VITE_API_ROOT_URL}/public/agents`;

  useEffect(() => {
    setGetLoader(true);
    fetch(agenturl)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.data);
        setGetLoader(false);
      });
  }, []);

  const navigate = useNavigate();
  const url = `${
    import.meta.env.VITE_API_ROOT_URL
  }/public/property/sale-request`;

  const australiaStates = [
    {
      state: "New South Wales",
      regions: [
        "Sydney",
        "Blue Mountains",
        "Central Coast",
        "Parramatta",
        "Central West",
        "Hunter Valley",
        "Illawarra",
        "Northern Rivers",
        "South Coast",
        "Murray",
      ],
    },
    {
      state: "Victoria",
      regions: ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
    },
    {
      state: "Queensland",
      regions: ["Brisbane", "Gold Coast", "Cairns", "Townsville"],
    },
    {
      state: "Western Australia",
      regions: ["Perth", "Bunbury", "Mandurah", "Albany"],
    },
    {
      state: "South Australia",
      regions: ["Adelaide", "Mount Gambier", "Whyalla", "Gawler"],
    },
    {
      state: "Tasmania",
      regions: ["Hobart", "Launceston", "Devonport", "Burnie"],
    },
    {
      state: "Northern Territory",
      regions: ["Darwin", "Alice Springs", "Katherine", "Nhulunbuy"],
    },
    {
      state: "Australian Capital Territory",
      regions: ["Canberra", "Queanbeyan"],
    },
  ];

  const handleContact = async (e) => {
    setLoader(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const message = form.message.value;
    const suburb = form.suburb.value;

    const formData = new FormData();
    formData.append("user_id", agentId);
    formData.append("name", name);
    formData.append("country", "Australia");
    formData.append("state", selectedState);
    formData.append("region", "N/A");
    formData.append("email", email);
    formData.append("telephone", phone);
    formData.append("address", address);
    formData.append("comment", message);
    formData.append("suburb", suburb);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success === true) {
        toast.success("Sale request sent!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="mx-5 md:container md:mx-auto flex flex-col my-5 md:my-10 gap-5 md:gap-10">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Request appraisal
      </h1>
      <p className="text-gray-500">
        Simply fill in your details to arrange a confidential, obligation-free
        appraisal of the likely sale price of your property.
      </p>
      <div>
        <form
          onSubmit={handleContact}
          className="flex flex-col gap-8 md:gap-16"
        >
          <div
            className="p-8 shadow"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <p>Property Information</p>
            <div className="my-10 grid md:grid-cols-2 gap-10">
              {/* <div className="relative">
                <select
                  onChange={(e) => {
                    const state = e.target.value;
                    const selected = australiaStates.find(
                      (s) => s.state === state
                    );
                    setSelectedState(state);
                  }}
                  value={selectedState}
                  className="block appearance-none w-full bg-white border border-gray text-gray-700 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                >
                  <option value="" className="text-gray-500">
                    Select State
                  </option>
                  {australiaStates.map((as, i) => (
                    <option key={i} value={as.state}>
                      {as.state}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div> */}

              {/* <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray text-gray-700 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  disabled={regions.length === 0}
                >
                  <option value="" className="text-gray-500">
                    Select Region
                  </option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div> */}

              {/* <div className="relative">
                <select
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray text-gray-700 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  disabled={getloader}
                >
                  <option value="" className="text-gray-500">
                    Select Agent
                  </option>
                  {teams?.map((agent) => (
                    <option key={agent?.id} value={agent?.id}>
                      {agent?.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div> */}
              <Select
                label="Select State"
                value={selectedState}
                onChange={(value) => setSelectedState(value)}
              >
                {australiaStates.map((as, i) => (
                  <Option key={i} value={as.state}>
                    {as.state}
                  </Option>
                ))}
              </Select>
              <Input
                required
                variant="static"
                label="Suburb"
                name="suburb"
                placeholder="Suburb"
              />
            </div>

            <p>Requestor Information</p>
            <div className="grid md:grid-cols-2 gap-10 mt-10">
              <Input
                required
                variant="static"
                label="Name"
                name="name"
                placeholder="Name"
              />
              <Input
                required
                variant="static"
                label="Phone Number"
                name="phone"
                placeholder="Phone Number"
              />
              <Input
                required
                variant="static"
                label="Email"
                name="email"
                placeholder="Email"
              />
              <Input
                required
                variant="static"
                label="Address"
                name="address"
                placeholder="Address"
              />
            </div>

            <div className="mt-10">
              <Textarea
                required
                variant="static"
                label="Message"
                name="message"
                placeholder="Say something..."
              />
            </div>

            <button
              type="submit"
              disabled={loader}
              className="mt-10 px-8 py-2 bg-primary md:hover:scale-105 text-white font-semibold rounded w-fit duration-300 ease-linear flex items-center gap-2"
            >
              Submit Request
              {loader && <Spinner className="h-4 w-4" />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
