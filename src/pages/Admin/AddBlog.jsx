import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";

export default function AddBlog() {
  const [value, setValue] = useState(""); 

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

  // Log the value to the console whenever the content changes
  const handleEditorChange = (content) => {
    setValue(content);
  };

  return (
    <section className="lg:flex lg:flex-col justify-center items-center">
      <form
        action=""
        className="flex flex-col gap-4 lg:w-1/2 p-6 shadow rounded"
      >
        <h5 className="text-xl text-primary font-semibold">Add Blog</h5>
        <label
          className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload Agent Image
        </label>
        <input
          //   className="block p-1.5 w-full text-sm text-gray-900 border border-gray rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          PNG, JPG (Size:600x400px).
        </p>

        <Input variant="standard" label="Title" />
        <ReactQuill
          value={value}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          className=""
          placeholder="Write blog briefly"
        />
      </form>
    </section>
  );
}
