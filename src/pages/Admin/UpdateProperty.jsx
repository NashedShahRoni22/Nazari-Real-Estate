import { Button, Input, Select, Option } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdRemoveCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Loader from "../../shared/Loader";

export default function UpdateProperty() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [status, setStatus] = useState("active");
  const navigate = useNavigate();
  const agentUrl = `${import.meta.env.VITE_API_ROOT_URL}/admin/users`;
  const postUrl = `${import.meta.env.VITE_API_ROOT_URL}/properties/${id}`;
  const propertyUrl = `${import.meta.env.VITE_API_ROOT_URL}/properties/${id}`;
  const [property, setProperty] = useState({});

  const oaAccessToken = localStorage.getItem("oaAccessToken"); // Retrieve the access token
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);

  const handleSelectAgent = (value) => {
    if (selectedAgents.includes(value)) {
      toast.error("Already selcted!");
    }
    if (!selectedAgents.includes(value)) {
      setSelectedAgents([...selectedAgents, value]);
    }
  };

  const handleRemoveAgent = (id) => {
    setSelectedAgents(selectedAgents.filter((agentId) => agentId !== id));
  };

  const [value, setValue] = useState("");
  const [floorplan, setFloorplan] = useState("");
  const [brochure, setBrochure] = useState("");
  const [type, setType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [mobility, setMobility] = useState(false);
  const [propertyImages, setPropertyImages] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [inspectionTimes, setInspectionTimes] = useState([]);
  const [existedImages, setExistedImages] = useState([]);
  const [existedImagesCount, setExistedImagesCount] = useState(0);
  
  const removeExistedImage = (index) => {
    setExistedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (date && startTime && endTime) {
      const newEntry = { date, startTime, endTime };
      setInspectionTimes([...inspectionTimes, newEntry]);
      // Reset the inputs after adding
      setDate("");
      setStartTime("");
      setEndTime("");
    }
  };

  const handleRemove = (index) => {
    const updatedTimes = inspectionTimes.filter((_, i) => i !== index);
    setInspectionTimes(updatedTimes);
  };

  // Modules for ReactQuill (toolbar options)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video", "code-block"],
      ["clean"],
    ],
  };

  // Formats supported by the Quill editor
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];

  const handleEditorChange = (content) => {
    setValue(content);
  };

  const handlePropertyImageChange = (e) => {
    const fileList = e.target.files;
    const imageList = Array.from(fileList);
    setPropertyImages(imageList);
  };

  // Function to remove an image from the state
  const removeImage = (index) => {
    setPropertyImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  //get agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(agentUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${oaAccessToken}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setAgents(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching agents.");
      } finally {
      }
    };

    fetchAgents();
  }, []);

  //get property
  useEffect(() => {
    const fetchProperty = async () => {
      setLoader(true);
      try {
        const response = await fetch(propertyUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${oaAccessToken}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setProperty(data.data);
          const agentIds = data.data.property_users.map((agent) => agent.id);
          setSelectedAgents(agentIds);
          setType(data.data.type);
          setPropertyType(data.data.property_type);
          setMobility(data.data.mobility);
          setValue(data.data.content);
          setStatus(data.data.status);
          setInspectionTimes(data.data.inspection_time);
          setMobility(data.data.mobility);
          const images = data.data.property_images.map((image) => image.name);
          setExistedImages(images);
          setExistedImagesCount(images.length);
          setLoader(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching agents.");
      } finally {
      }
    };

    fetchProperty();
  }, [id]);

  //handle update property
  async function handleSubmit(event) {
    setPostLoader(true);
    event.preventDefault();
    const location = event.target.location.value;
    const region = event.target.region.value;
    const suburb = event.target.suburb.value;
    const postcode = event.target.postcode.value;
    const title = event.target.title.value;
    const price = event.target.price.value;
    const bedrooms = event.target.bedrooms.value;
    const bathrooms = event.target.bathrooms.value;
    const parking = event.target.parking.value;
    const category = event.target.category.value;
    const landsize = event.target.land_size.value;
    const housesize = event.target.house_size.value;
    const availabledate = event.target.available_date.value;
    const saledate = event.target.sale_date.value;

    const formData = new FormData();
    formData.append("_method", "PATCH");
    propertyImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    if (existedImagesCount !== existedImages.length) {
      formData.append("property_existing_images", JSON.stringify(existedImages));
    }
    formData.append("inspection_time", JSON.stringify(inspectionTimes));
    formData.append("agents", JSON.stringify(selectedAgents));
    formData.append("content", value);
    formData.append("status", status);
    formData.append("floor_plan", floorplan);
    formData.append("brochure", brochure);
    formData.append("type", type);
    formData.append("property_type", propertyType);
    formData.append("mobility", mobility);
    formData.append("location", location);
    formData.append("region", region);
    formData.append("suburb", suburb);
    formData.append("postcode", postcode);
    formData.append("location", location);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("parking", parking);
    formData.append("category", category);
    formData.append("land_size", landsize);
    formData.append("house_size", housesize);
    formData.append("available_date", availabledate);
    formData.append("sale_date", saledate);
    formData.append("status", status);

    try {
      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${oaAccessToken}`, // Include the access token in the headers
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success === true) {
        setPostLoader(false);
        toast.success(data.message);
        navigate("/admin/property_list");
      } else {
        setPostLoader(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setPostLoader(false);
    }
  }

  return (
    <section className="p-5 md:p-10">
      {loader ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:p-6 md:shadow md:rounded"
        >
          <div className="flex justify-between">
            <h5 className="text-xl text-primary font-semibold">
              Update Property
            </h5>
            <div className="w-1/4">
              <Select
                label="Change Status"
                value={status}
                onChange={(value) => setStatus(value)}
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </div>
          </div>
          <label
            className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload Property Images
          </label>
          <input
            accept="image/*"
            multiple
            onChange={handlePropertyImageChange}
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
          {/* Render preview of uploaded images */}
          {propertyImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-5">
              {propertyImages.map((image, index) => (
                <div key={index} className="relative aspect-w-1 aspect-h-1">
                  <IoCloseCircleSharp
                    className="absolute top-2 right-2 text-red-600 cursor-pointer text-3xl"
                    onClick={() => removeImage(index)}
                  />
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded Image ${index + 1}`}
                    className="object-cover rounded h-[200px] md:h-[250px] w-full"
                  />
                </div>
              ))}
            </div>
          )}
          <h5 className="mt-5">Existing Images:</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-2.5">
            {existedImages?.map((image, index) => (
              <div key={index} className="relative aspect-w-1 aspect-h-1">
                <IoCloseCircleSharp
                  className="absolute top-2 right-2 text-red-600 cursor-pointer text-3xl"
                  onClick={() => removeExistedImage(index)}
                />
                <img
                  src={image}
                  alt={`Existing Image ${index + 1}`}
                  className="object-cover rounded h-[200px] md:h-[250px] w-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <label
              className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload Floorplan
            </label>
            {property?.floor_plan !== null && (
              <Link
                to={property?.floor_plan}
                target="_blank"
                className="px-4 py-2 text-sm bg-primary shadow rounded text-white w-fit"
              >
                Floor Plan
              </Link>
            )}
          </div>
          <input
            onChange={(e) => setFloorplan(e.target.files[0])}
            aria-describedby="file_input_help"
            id="floor_plan"
            type="file"
          />

          <div className="flex justify-between items-center">
            <label
              className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload Brochure
            </label>
            {property?.brochure !== null && (
              <Link
                to={property?.brochure}
                target="_blank"
                className="px-4 py-2 text-sm bg-primary shadow rounded text-white w-fit"
              >
                Broucher
              </Link>
            )}
          </div>
          <input
            onChange={(e) => setBrochure(e.target.files[0])}
            aria-describedby="file_input_help"
            id="brochure"
            type="file"
          />

          <h5 className="mt-5 text-primary">Fill up property data</h5>
          <div className="mt-2.5 flex flex-col gap-5 md:flex-row">
            <div className="md:w-1/2">
              <Select
                variant="standard"
                name="type"
                label="Select Agent"
                onChange={handleSelectAgent}
              >
                {agents?.map((agent) => (
                  <Option key={agent.id} value={agent.id}>
                    {agent.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedAgents?.map((agentId) => {
                const agent = agents?.find((a) => a.id === agentId);
                return (
                  <div
                    key={agentId}
                    className="flex px-4 py-2 shadow rounded items-center w-fit gap-2"
                  >
                    {agent?.name}
                    <MdRemoveCircle
                      className="cursor-pointer text-red-600"
                      onClick={() => handleRemoveAgent(agentId)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* <h5 className="mt-5 text-primary">Agents name:</h5>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {property?.property_users?.map((agent) => (
              <div
                key={agent?.id}
                className="flex px-4 py-2 shadow rounded items-center w-fit gap-2"
              >
                {agent?.name}
                <MdRemoveCircle
                  className="cursor-pointer text-red-600"
                  onClick={() => handleRemoveAgent(agent > id)}
                />
              </div>
            ))}
          </div> */}
          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <Select
              onChange={(value) => setType(value)}
              variant="standard"
              name="type"
              label="Select Type"
              value={type}
            >
              <Option value="buy">Buy</Option>
              <Option value="rent">Rent</Option>
            </Select>

            <Select
              onChange={(value) => setPropertyType(value)}
              variant="standard"
              name="property_type"
              label="Property Type"
              value={propertyType}
            >
              <Option value="residential">Residential</Option>
              <Option value="comercial">Comercial</Option>
              <Option value="rular">Rular</Option>
              <Option value="business">Business</Option>
            </Select>

            <Select
              onChange={(value) => setMobility(value)}
              name="mobility"
              variant="standard"
              label="Mobility"
              value={mobility}
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
            <Input
              required
              name="title"
              defaultValue={property?.title}
              variant="standard"
              label="Title"
              type="text"
            />
            <Input
              required
              name="location"
              variant="standard"
              defaultValue={property?.location}
              label="Location"
              type="text"
            />
            <Input
              required
              name="region"
              variant="standard"
              label="Region"
              defaultValue={property?.region}
              type="text"
            />
            <Input
              required
              name="suburb"
              variant="standard"
              label="Suburb"
              defaultValue={property?.suburb}
              type="text"
            />
            <Input
              required
              name="postcode"
              variant="standard"
              label="Postcode"
              defaultValue={property?.postcode}
              type="text"
            />
            <Input
              required
              name="price"
              variant="standard"
              label="Price"
              defaultValue={property?.price}
              type="text"
            />
            <Input
              required
              name="bedrooms"
              variant="standard"
              label="Bedrooms"
              defaultValue={property?.bedrooms}
              type="Number"
            />
            <Input
              required
              name="bathrooms"
              variant="standard"
              label="Bathrooms"
              defaultValue={property?.bathrooms}
              type="Number"
            />
            <Input
              required
              name="parking"
              variant="standard"
              label="Parking"
              defaultValue={property?.parking}
              type="Number"
            />

            <Input
              required
              name="category"
              variant="standard"
              label="Category"
              defaultValue={property?.category}
              type="text"
            />
            <Input
              required
              name="land_size"
              variant="standard"
              label="Land Size"
              defaultValue={property?.land_size}
              type="text"
            />
            <Input
              required
              name="house_size"
              variant="standard"
              label="House Size"
              defaultValue={property?.house_size}
              type="text"
            />
          </div>
          {/* dates inputs */}
          <div className="mt-5 grid md:grid-cols-2 gap-5">
            <Input
              className=""
              name="available_date"
              variant="standard"
              label="Available Date"
              defaultValue={property?.available_date}
              type="date"
            />
            <Input
              name="sale_date"
              variant="standard"
              label="Sale Date"
              defaultValue={property?.sale_date}
              type="date"
            />
          </div>
          <div>
            <div>
              <h5 className="text-xs">Inspections dates</h5>
              <div className="flex gap-2 mt-5">
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="input-standard"
                  label="Date"
                />
                <Input
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  type="time"
                  className="input-standard"
                  label="Start"
                />
                <Input
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  type="time"
                  className="input-standard"
                  label="End"
                />
                <Button
                  disabled={date === "" || startTime === "" || endTime === ""}
                  onClick={handleAdd}
                  className="bg-primary w-[150px]"
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="mt-5">
              {inspectionTimes.length > 0 && (
                <table className="w-full">
                  <thead className="bg-primary border border-primary text-white">
                    <tr>
                      <th className="py-2">Date</th>
                      <th className="py-2">Start Time</th>
                      <th className="py-2">End Time</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectionTimes.map((entry, index) => (
                      <tr key={index} className="border-b">
                        <td className="text-center py-2 border-l">
                          {entry.date}
                        </td>
                        <td className="text-center py-2 border-l">
                          {entry.startTime}
                        </td>
                        <td className="text-center py-2 border-l">
                          {entry.endTime}
                        </td>
                        <td className="text-center py-2 border-l border-r">
                          <button
                            onClick={() => handleRemove(index)}
                            className="text-red-500"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <ReactQuill
            value={value}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
            className=""
            placeholder="Write a description about the property..."
          />
          <Button
            type="submit"
            disabled={postLoader}
            className="bg-primary w-fit"
          >
            Update Property
          </Button>
        </form>
      )}
    </section>
  );
}
