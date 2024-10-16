import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import { toast } from "react-toastify";
import { Card, Typography, Button } from "@material-tailwind/react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function BlogList() {
  const url = `${import.meta.env.VITE_API_ROOT_URL}/blogs`;
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const oaAccessToken = localStorage.getItem("oaAccessToken"); // Retrieve the access token

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
          setBlogs(data.data); // Assuming the agents are in data.data
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
    return <Loader />;
  }
  const deleteBlog = async (id) => {
    const deleteurl = `${import.meta.env.VITE_API_ROOT_URL}/blogs/${id}`;
    try {
      const response = await fetch(deleteurl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${oaAccessToken}`, // Include the access token in the headers
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting blogs.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Blog List: {blogs?.length}</h2>
      <div className="my-5 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {blogs.map((b) => (
          <div className="shadow rounded relative">
            <img src={b?.image} alt="" className="rounded-t h-[250px] w-full" />
            <div className="p-4">
              <p className="flex items-center gap-1">
                <IoMdTime className="text-xl text-primary" />
                {b?.updated_at.slice(0, 10)}
              </p>
              <p className="text-xl font-semibold my-1.5">{b?.title}</p>
              <div
                dangerouslySetInnerHTML={{ __html: b?.content?.slice(0, 60) }}
              />
            </div>
            <div className="absolute right-2 top-2 flex gap-2 items-center">
              <button
                onClick={() => deleteBlog(b?.id)}
                className="h-8 w-8 rounded bg-white shadow flex justify-center items-center"
              >
                <MdDelete className="text-primary text-2xl" />
              </button>
              <Link
                to={`/admin/blog_update/${b.id}`}
                className="h-8 w-8 rounded bg-white shadow flex justify-center items-center"
              >
                <FaEdit className="text-primary text-xl" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
