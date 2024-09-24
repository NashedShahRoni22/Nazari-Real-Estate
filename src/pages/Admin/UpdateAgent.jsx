import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";

export default function UpdateAgent() {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("active");
  const [loader, setLoader] = useState(false);
  const [getLoader, setGetLoader] = useState(false);
  const [image, setImage] = useState(null);
  const [agentData, setAgentData] = useState({});
console.log(agentData);

  const navigate = useNavigate();
  const oaAccessToken = localStorage.getItem("oaAccessToken");
  const getUrl = `${import.meta.env.VITE_API_ROOT_URL}/admin/users/${id}`;
  const updateUrl = `${import.meta.env.VITE_API_ROOT_URL}/admin/users/${id}`;

  // Fetch agent data on mount
  useEffect(() => {
    setGetLoader(true);
    const fetchAgentData = async () => {
      try {
        const response = await fetch(getUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${oaAccessToken}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setAgentData(data.data);
          setStatus(data.data.status);
          setValue(data.data.bio);
          setImage(data.data.image);
          setGetLoader(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching agent data:", error);
        toast.error("An error occurred while fetching agent data.");
      }
    };

    fetchAgentData();
  }, [getUrl, oaAccessToken]);

  if (getLoader) {
    return <Loader />; // Optional loading indicator
  }

  const handleEditorChange = (content) => {
    setValue(content);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  async function handleSubmit(event) {
    setLoader(true);
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phone_number.value;
    const location = event.target.location.value;
    const password = event.target.password.value;
    const passwordConfirmation = event.target.password_confirmation.value;

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("location", location);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("bio", value);
    formData.append("status", status);
    if (image && typeof image === "object") {
      formData.append("image", image);
    }

    try {
      const response = await fetch(updateUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${oaAccessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoader(false);
    }
  }

  return (
    <section className="lg:flex items-center justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-6 shadow rounded lg:w-1/2"
      >
        <div className="flex justify-between">
          <h5 className="text-xl text-primary font-semibold">Update Agent</h5>
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
          Upload Agent Image
        </label>
        <input
          onChange={handleImageChange}
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
        />
        {agentData.image && (
          <img
            src={agentData.image}
            alt="Agent"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          PNG, JPG (Size: 500x300px).
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <Input
            name="name"
            variant="standard"
            label="Name"
            defaultValue={agentData.name}
          />
          <Input
            name="email"
            variant="standard"
            label="Email"
            defaultValue={agentData.email}
          />
          <Input
            name="phone_number"
            variant="standard"
            label="Phone"
            defaultValue={agentData.phone_number}
          />
          <Input
            name="location"
            variant="standard"
            label="Location"
            defaultValue={agentData.location}
          />

          <Input
            name="password"
            variant="standard"
            label="Password"
            type="password"
          />
          <Input
            name="password_confirmation"
            variant="standard"
            label="Confirm Password"
            type="password"
          />
        </div>

        <ReactQuill
          value={value}
          onChange={handleEditorChange}
          modules={{
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
          }}
          formats={[
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
          ]}
          className=""
          placeholder="Write a description about the agent..."
        />
        <Button type="submit" disabled={loader} className="bg-primary w-fit">
          Update Agent
        </Button>
      </form>
    </section>
  );
}
