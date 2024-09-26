import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function AddAgent({ setView }) {
  const [value, setValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);
  const url = `${import.meta.env.VITE_API_ROOT_URL}/admin/users`;
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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  //handle add agent
  async function handleSubmit(event) {
    setLoader(true);
    event.preventDefault();

    const name = event.target.name.value;
    const designation = event.target.designation.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phone_number.value;
    const location = event.target.location.value;
    const password = event.target.password.value;
    const passwordConfirmation = event.target.password_confirmation.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("location", location);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("bio", value);
    if (image) {
      formData.append("image", image);
    }

    const oaAccessToken = localStorage.getItem("oaAccessToken"); // Retrieve the access token

    try {
      const response = await fetch(url, {
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
        setView(true);
      } else {
        setLoader(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      toast.error("An error occurred while submitting the form.");
    }
  }

  return (
    <section className="lg:flex lg:flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:w-1/2 p-6 shadow rounded"
      >
        <h5 className="text-xl text-primary font-semibold">Add Agent</h5>
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
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          PNG, JPG (Size:500x300px).
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <Input required name="name" variant="standard" label="Name" />
          <Input required name="designation" variant="standard" label="Designation" />
          <Input required name="email" variant="standard" label="Email" />
          <Input
            required
            name="phone_number"
            variant="standard"
            label="Phone"
          />
          <Input required name="location" variant="standard" label="Location" />
          <Input
            required
            name="password"
            variant="standard"
            label="Password"
            type="password"
          />
          <Input
            required
            name="password_confirmation"
            variant="standard"
            label="Confirm Password"
            type="password"
          />
        </div>

        <ReactQuill
          value={value}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          className=""
          placeholder="Write a description about the agent..."
        />
        <Button type="submit" disabled={loader} className="bg-primary w-fit">
          Add Agent
        </Button>
      </form>
    </section>
  );
}
