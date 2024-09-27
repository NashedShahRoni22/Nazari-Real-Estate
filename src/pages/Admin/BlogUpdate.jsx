import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function BlogUpdate() {
  const [blogs, setBlogs] = useState();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const oaAccessToken = localStorage.getItem("oaAccessToken"); // Retrieve the access token
  const url = `${import.meta.env.VITE_API_ROOT_URL}/blogs/${id}`;

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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  //handle add agent
  async function handleSubmit(event) {
    setLoader(true);
    event.preventDefault();
    const title = event.target.title.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", value);

    if (image) {
      formData.append("image", image);
    }
    formData.append("_method", "PATCH");
    // formData.append("published", "true");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${oaAccessToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success === true) {
        setLoader(false);
        toast.success(data.message);
        navigate("/admin/blogs");
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
  // Log the value to the console whenever the content changes
  const handleEditorChange = (content) => {
    setValue(content);
  };

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
          setBlogs(data.data);
          setValue(data.data.content); // Assuming the agents are in data.data
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

  return (
    <section className="lg:flex lg:flex-col justify-center items-center mt-5">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-4 lg:w-1/2 p-6 shadow rounded"
      >
        <h5 className="text-xl text-primary font-semibold">Update Blog</h5>
        <label
          className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload Blog Image
        </label>
        <input
          //   className="block p-1.5 w-full text-sm text-gray-900 border border-gray rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          onChange={handleImageChange}
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          required
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          PNG, JPG (Size:600x400px).
        </p>

        <img
          src={blogs?.image}
          alt="blog"
          srcset=""
          className="mt-2 w-32 h-32 object-cover rounded"
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          PNG, JPG (Size: 500x300px).
        </p>

        <Input
          variant="standard"
          name="title"
          label="Title"
          required
          defaultValue={blogs?.title}
        />
        <ReactQuill
          value={value}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          className=""
          placeholder="Write blog briefly"
        />
        <Button type="submit" disabled={loader} className="bg-primary w-fit">
          Update Blog
        </Button>
      </form>
    </section>
  );
}
