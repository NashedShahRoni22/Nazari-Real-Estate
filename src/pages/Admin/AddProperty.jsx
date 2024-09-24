import { Button, Input, Select, Option } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdRemoveCircle } from "react-icons/md";

export default function AddProperty() {
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState("active");
  const format = "YYYY/MM/DD";
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_ROOT_URL}/admin/users`;
  const postUrl = `${import.meta.env.VITE_API_ROOT_URL}/properties`;
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
  const [inspectionDates, setInspectionDates] = useState([]);
  // Function to format dates as per the desired format and save in a new array
  const formatAndSaveDates = (dates) => {
    return dates.map((date) => date.format(format));
  };

  // State to store the formatted dates
  const [formattedDates, setFormattedDates] = useState(
    formatAndSaveDates(inspectionDates)
  );

  // Function to update the formatted dates whenever dates change
  const handleDateChange = (newDates) => {
    setInspectionDates(newDates);
    setFormattedDates(formatAndSaveDates(newDates));
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
      }
    };

    fetchAgents();
  }, []);

  //handle add property
  async function handleSubmit(event) {
    setLoader(true);
    event.preventDefault();
    const location = event.target.location.value;
    const price = event.target.price.value;
    const bedrooms = event.target.bedrooms.value;
    const bathrooms = event.target.bathrooms.value;
    const parking = event.target.parking.value;
    const category = event.target.category.value;
    const landsize = event.target.land_size.value;
    const availabledate = event.target.available_date.value;
    const saledate = event.target.sale_date.value;
    
    const formData = new FormData();
    propertyImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    formData.append("inspection_time", JSON.stringify(formattedDates));
    formData.append("agents", JSON.stringify(selectedAgents));
    formData.append("content", value);
    formData.append("status", status);
    formData.append("floor_plan", floorplan);
    formData.append("brochure", brochure);
    formData.append("type", type);
    formData.append("property_type", propertyType);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("parking", parking);
    formData.append("category", category);
    formData.append("land_size", landsize);
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
        setLoader(false);
        toast.success(data.message);
        navigate("/admin/property_list")
      } else {
        setLoader(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
    }
  }

  return (
    <section className="p-5 md:p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:p-6 md:shadow md:rounded"
      >
        <div className="flex justify-between">
          <h5 className="text-xl text-primary font-semibold">Add Property</h5>
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
                  className="absolute top-2 right-2 text-black cursor-pointer text-3xl"
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
        <label
          className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload Floorplan
        </label>
        <input
          onChange={(e) => setFloorplan(e.target.files[0])}
          aria-describedby="file_input_help"
          id="floor_plan"
          type="file"
        />

        <label
          className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload Brochure
        </label>
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
            {selectedAgents.map((agentId) => {
              const agent = agents.find((a) => a.id === agentId);
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
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <Select
            onChange={(value) => setType(value)}
            variant="standard"
            name="type"
            label="Select Type"
          >
            <Option value="buy">Buy</Option>
            <Option value="rent">Rent</Option>
            <Option value="sale">Sale</Option>
          </Select>

          <Select
            onChange={(value) => setPropertyType(value)}
            variant="standard"
            name="property_type"
            label="Property Type"
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
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
          <Input
            required
            name="location"
            variant="standard"
            label="Location"
            type="text"
          />
          <Input
            required
            name="price"
            variant="standard"
            label="Price"
            type="text"
          />
          <Input
            required
            name="bedrooms"
            variant="standard"
            label="Bedrooms"
            type="Number"
          />
          <Input
            required
            name="bathrooms"
            variant="standard"
            label="Bathrooms"
            type="Number"
          />
          <Input
            required
            name="parking"
            variant="standard"
            label="Parking"
            type="Number"
          />

          <Input
            required
            name="category"
            variant="standard"
            label="Category"
            type="text"
          />
          <Input
            required
            name="land_size"
            variant="standard"
            label="Land Size"
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
            type="date"
          />
          <Input
            name="sale_date"
            variant="standard"
            label="Sale Date"
            type="date"
          />
          <div>
            <label htmlFor="" className="text-xs">
              Inspection Dates
            </label>
            <DatePicker
              value={inspectionDates}
              onChange={handleDateChange}
              multiple
              sort
              format={format}
              calendarPosition="bottom-center"
              plugins={[<DatePanel />]}
              style={{
                width: "100%",
                padding: "16px",
                border: "none",
                borderRadius: "0px",
                borderBottom: "1px solid gray",
              }}
              containerStyle={{
                width: "100%",
              }}
            />
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
        <Button type="submit" disabled={loader} className="bg-primary w-fit">
          Add Property
        </Button>
      </form>
    </section>
  );
}
